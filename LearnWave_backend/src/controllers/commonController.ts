import { Request, Response } from "express";
import sendResponse from "../util/common";
import CustomRequest from "../util/interface"
import HTTP_STATUS from "../constants/statusCode";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import studentModel from "../models/student";
import instructorModel from "../models/instructor";
import tokenModel from "../models/userToken";
import authModel from "../models/auth";
import courseModel from "../models/course";
import findAuth from "../util/findAuth";
import studentVerificationModel from "../models/studentVerification";
import { validationResult } from "express-validator";
import utilFunc from "../util/generateToken";
import mongoose from "mongoose";
import { Document, Types } from "mongoose";
interface IProfile {
    fname?: string,
    lname?: string,
    userName?: string,
    email?: string,
    phoneNumber?: string
}
class Common {

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
    public async editProfile(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { fname, lname, userName, email, phoneNumber } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Cart couldn't be created!", validation);
            }
            const isLoggedIn = findAuth.findAuth(req);
            if (!isLoggedIn) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in first!");
            }
            const getAuthData = await authModel.findOne({ $or: [{ student_id: req.userId }, { instructor_id: req.userId }] });
            if (!getAuthData) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Something went wrong!Couldn't found data!");
            }
            const updateFields: IProfile = {};
            if (fname) {
                updateFields.fname = fname;
            }
            if (lname) {
                updateFields.lname = lname;
            }
            if (userName) {
                updateFields.userName = userName;
            }
            if (email) {
                updateFields.email = email;
            }
            if (phoneNumber) {
                updateFields.phoneNumber = phoneNumber
            }
            const findStudent = await authModel.findOne({ student_id: req.userId });
            const findInstructor = await authModel.findOne({ instructor_id: req.userId });
            if (findStudent) {
                const setStudentData = await authModel.updateOne({ student_id: req.userId }, { $set: updateFields });
                await studentModel.updateOne({ _id: req.userId }, { $set: updateFields });
                return sendResponse(res, HTTP_STATUS.OK, "Your profile has been updated", setStudentData);
            }
            else if (findInstructor) {
                const setInstructorData = await authModel.updateOne({ student_id: req.userId }, { $set: updateFields });
                await instructorModel.updateOne({ _id: req.userId }, { $set: updateFields });
                return sendResponse(res, HTTP_STATUS.OK, "Your profile has been updated", setInstructorData);
            }
            else if (findAuth && findInstructor) {
                const findBothData = await authModel.updateOne({ student_id: req.userId }, { $set: updateFields });
                await studentModel.updateOne({ _id: req.userId }, { $set: updateFields });
                await instructorModel.updateOne({ _id: req.userId }, { $set: updateFields });
                return sendResponse(res, HTTP_STATUS.OK, "Your profile has been updated", findBothData);
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Something went wrong!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getAllCourse(req: Request, res: Response): Promise<void> {
        try {
            const findAllCourse = await courseModel.find({})
                .populate("section");
            if (findAllCourse.length > 0) {
                let acceptedCourse = [];
                findAllCourse.filter((course) => {
                    if (course.isApproved && !course.isDisabled) {
                        acceptedCourse.push(course);
                    }

                })

                return sendResponse(res, HTTP_STATUS.OK, "Course fetched successfully!", acceptedCourse);

            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No course available!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

}
export default new Common;

