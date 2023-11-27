import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import sendResponse from "../util/common";
import HTTP_STATUS from "../constants/statusCode";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import studentModel from "../models/student";
import tokenModel from "../models/userToken";
import authModel from "../models/auth";
import cartModel from "../models/cart";
import notificationModel from "../models/notification";
import studentVerificationModel from "../models/studentVerification";
import { validationResult } from "express-validator";
import utilFunc from "../util/generateToken";
import mongoose from "mongoose";
import { Document, Types } from "mongoose";
import findAuth from "../util/findAuth";
import get from "../util/get";
interface CustomRequest extends Request {
    userId: ObjectId;
}
class Student {
    public async auth(req: Request, res: Response): Promise<void> {
        try {
            const { fname, lname, userName, email, password, confirmPassword, phoneNumber } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Signup failed!", validation);
            }
            const emailExist = await studentModel.findOne({ email: email });
            if (emailExist) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Email is already registered");
            }
            if (password != confirmPassword) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Passwords dont match!");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
            const student = await new studentModel({
                fname: fname, lname: lname, userName: userName, name: `${fname} ${lname}`, email: email, password: hashedPassword, confirmPassword: hashedConfirmPassword, phoneNumber: phoneNumber
            })
            await student.save();
            console.log(student._id, student.name, student.email);
            console.log(student)
            if (student) {
                const studentInstance = new Student();
                studentInstance.sendVerificationMail(student._id, res);
            }
        } catch (error) {
            console.log(error);
            sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }

    }
    public async sendVerificationMail(_id: mongoose.Types.ObjectId, res: Response): Promise<void> {
        try {
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rabitaamin015@gmail.com',
                    pass: 'incb efmr anwq oibk'
                }
            });
            var mailOptions = {
                from: 'rabitaamin015@gmail.com',
                to: 'begummaksuda016@gmail.com',
                subject: 'Verify your account',
                html: `<p>Hello!<br> You requested for a verification otp, kindly use this 
                <b>${otp} </b>to verify your account.It will expire is 1 hour.`
            };
            const hashedOtp = await bcrypt.hash(otp, 10);
            const verificationAuth = await new studentVerificationModel({
                userId: _id,
                otp: hashedOtp,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            })
            await verificationAuth.save();
            const findStudent = await studentModel.findById({ _id: verificationAuth.userId });
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to your account!", findStudent);
                }
            });
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async verifyMail(req: Request, res: Response): Promise<void> {
        try {
            const { id, otp, email } = req.body;
            const findRecord = await studentVerificationModel.findOne({ userId: id });
            if (!findRecord) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in!");
            }
            if (findRecord.expiresAt && findRecord.expiresAt.getTime() < Date.now()) {
                return sendResponse(res, HTTP_STATUS.EXPECTATION_FAILED, "Code has expired!");
            }
            const checkOTP = await bcrypt.compare(otp, findRecord.otp)
            if (checkOTP) {
                await studentVerificationModel.deleteOne({ userId: id });
                await studentModel.findByIdAndUpdate(id, { verified: true });
                const findUser = await studentModel.findById({ _id: id });
                const { refreshToken, accessToken } = await utilFunc.generateToken(findUser);
                const findAuth = await authModel.findOne({ email: email })
                if (!findAuth) {
                    const savedAuth = new authModel({
                        fname: findUser.fname,
                        lname: findUser.lname,
                        name: findUser.name,
                        userName: findUser.userName,
                        email: findUser.email,
                        phoneNumber: findUser.phoneNumber,
                        student_id: findUser._id
                    })
                    savedAuth.role.push(findUser.role);
                    await savedAuth.save();
                    if (!savedAuth) {
                        await studentModel.deleteOne({ _id: id });
                        return sendResponse(res, HTTP_STATUS.CONFLICT, "Some Error Occured.Please request for otp again!");
                    }
                    return sendResponse(res, HTTP_STATUS.OK, "Your account has been verified", { result: findUser, Access_token: accessToken, Refresh_Token: refreshToken });
                }
                findAuth.role.push(findUser.role);
                await findAuth.save();
                return sendResponse(res, HTTP_STATUS.OK, "Your account has been verified", { result: findUser, Access_token: accessToken, Refresh_Token: refreshToken });
            }
            await studentModel.deleteOne({ _id: id });
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Please enter the correct code!");
        } catch (error) {
            const { id } = req.body;
            console.log(error);
            await studentModel.deleteOne({ _id: id });
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Login failed!", validation);
            }
            const findUser = await studentModel.findOne({ email: email });
            if (!findUser) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please Sign Up First!");
            }
            if (findUser.isDeleted) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Please creat an account first!Your previous one has been disabled");
            }
            if (!findUser.verified) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Please verify your account first!");
            }
            const checkPassword = await bcrypt.compare(password, findUser.password);
            if (!checkPassword) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Wrong Credentials!");
            }
            const findAuth = await authModel.findOne({ setId: findUser._id });
            const findStudent = await get.findOneStudent(findUser._id)
            const { refreshToken, accessToken } = await utilFunc.generateToken(findUser);
            return sendResponse(res, HTTP_STATUS.OK, "Successfully logged in!", { result: findStudent, Refresh_token: refreshToken, Access_token: accessToken });

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async viewProfile(req: CustomRequest, res: Response): Promise<void> {
        try {
            const findAuth = await authModel.findById({ setId: req.userId });
            if (!findAuth) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign in!")
            }
            return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", findAuth);


        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

    async viewSubscriptionNotification(req: CustomRequest, res: Response): Promise<void> {
        try {
            const isLoggedIn = findAuth.findStudent(req);
            if (!isLoggedIn) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in!");
            }
            const findAllNotification = await notificationModel.find({ $and: [{ receiver: req.userId }, { forAdmin: false }, { read: false }] });
            if (findAllNotification.length == 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No notifications were found!");
            }

            return sendResponse(res, HTTP_STATUS.OK, "Notification fetched Successfully!", findAllNotification);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }


}
export default new Student;

