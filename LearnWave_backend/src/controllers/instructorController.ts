import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import sendResponse from "../util/common";
import HTTP_STATUS from "../constants/statusCode";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import instructorModel from "../models/instructor";
import tokenModel from "../models/userToken";
import adminModel from "../models/admin";
import authModel from "../models/auth";
import courseModel from "../models/course";
import sectionModel from "../models/section";
import subSectionModel from "../models/subSection";
import studentVerificationModel from "../models/studentVerification";
import notificationModel from "../models/notification";
import quizModel from "../models/quiz";
import assignmentModel from "../models/assignment";
import assignmentSubModel from "../models/assignmentSubmission"
import findAuth from "../util/findAuth";
import getAll from "../util/get";
import { validationResult } from "express-validator";
import utilFunc from "../util/generateToken";
import mongoose from "mongoose";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { S3Client, GetObjectCommand, } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { Document, Types } from "mongoose";
import { title } from "process";
dotenv.config();
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const s3 = new S3Client({
    credentials:
    {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey

    },
    region: bucketRegion,
})
interface S3UploadParams {
    Bucket: string;
    Key: string;
    Body: Buffer;
}
interface CustomRequest extends Request {
    userId: ObjectId;
    file: any;
}
class Instructor {
    public async auth(req: Request, res: Response): Promise<void> {
        try {
            const { fname, lname, userName, email, password, confirmPassword, phoneNumber } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Signup failed!", validation);
            }
            const emailExist = await instructorModel.findOne({ email: email });
            if (emailExist) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Email is already registered");
            }
            if (password != confirmPassword) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Passwords dont match!");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
            const instructor = new instructorModel({
                fname: fname, lname: lname, userName: userName, name: `${fname} ${lname}`, email: email, password: hashedPassword, confirmPassword: hashedConfirmPassword, phoneNumber: phoneNumber
            })
            await instructor.save();
            console.log(instructor._id, instructor.name, instructor.email);
            console.log(instructor)
            if (instructor) {
                const instructorInstance = new Instructor();
                instructorInstance.sendVerificationMail(instructor._id, res);
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
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to your account!", { userId: _id });
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
                await instructorModel.deleteOne({ _id: id })
                return sendResponse(res, HTTP_STATUS.EXPECTATION_FAILED, "Code has expired!");
            }
            const checkOTP = await bcrypt.compare(otp, findRecord.otp)
            if (checkOTP) {
                await studentVerificationModel.deleteOne({ userId: id });
                await instructorModel.findByIdAndUpdate(id, { verified: true });
                const findUser = await instructorModel.findById({ _id: id });
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
                        instructor_id: findUser._id
                    })
                    console.log(savedAuth)
                    savedAuth.role.push(findUser.role);
                    await savedAuth.save();
                    if (!savedAuth) {
                        await instructorModel.deleteOne({ _id: id });
                        return sendResponse(res, HTTP_STATUS.CONFLICT, "Some Error Occured.Please request for otp again!");
                    }
                    return sendResponse(res, HTTP_STATUS.OK, "Your account has been verified", { result: findUser, Access_token: accessToken, Refresh_Token: refreshToken });
                }

                return sendResponse(res, HTTP_STATUS.OK, "Your account has been verified", { result: findUser, Access_token: accessToken, Refresh_Token: refreshToken });
            }
            await instructorModel.deleteOne({ _id: id });
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Please enter the correct code!");
        } catch (error) {
            const { id } = req.body;
            console.log(error);
            await instructorModel.deleteOne({ _id: id });
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Signup failed!", validation);
            }
            const findUser = await instructorModel.findOne({ email: email });
            if (!findUser) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please Sign Up First!");
            }
            if (!findUser.verified) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Please verify your account first!");
            }
            const checkPassword = await bcrypt.compare(password, findUser.password);
            if (!checkPassword) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Wrong Credentials!");
            }
            const findAuth = await authModel.findOne({ setId: findUser._id });
            const { refreshToken, accessToken } = await utilFunc.generateToken(findUser);
            return sendResponse(res, HTTP_STATUS.OK, "Successfully logged in!", { result: findUser, Refresh_token: refreshToken, Access_token: accessToken });

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

    public async uploadVideo(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { section_id, title, course_id } = req.body;
            console.log(req.file);
            const params: S3UploadParams =
            {
                Bucket: bucketName,
                Key: crypto.randomBytes(32).toString("hex"),
                Body: req.file.buffer
            }
            const command = new PutObjectCommand(params);
            await s3.send(command);
            const sectionExist = await sectionModel.findById({ _id: section_id })
            if (!sectionExist) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Section doesn't exist!");
            }
            const saveVideo = new subSectionModel({
                set_course_id: course_id,
                set_section_id: section_id,
                video_title: title,
                videoUrl: "https://bucket-rabita.s3.eu-west-3.amazonaws.com/" + params.Key,
            })
            await saveVideo.save();
            sectionExist.subSection.push(saveVideo._id);
            await sectionExist.save();
            return sendResponse(res, HTTP_STATUS.OK, "Successfully uploaded!", saveVideo);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async uploadAssignment(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id, assignment_id } = req.body;
            console.log(req.file);
            const params: S3UploadParams =
            {
                Bucket: bucketName,
                Key: crypto.randomBytes(32).toString("hex"),
                Body: req.file.buffer
            }
            const command = new PutObjectCommand(params);
            await s3.send(command);
            const saveAssignment = new assignmentSubModel({
                set_course_id: course_id,
                assignment_id: assignment_id,
                student_id: req.userId,
                assignmentURL: "https://bucket-rabita.s3.eu-west-3.amazonaws.com/" + params.Key,
            })
            await saveAssignment.save();
            return sendResponse(res, HTTP_STATUS.OK, "Successfully uploaded!", saveAssignment);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    // public async getVideo(req: Request, res: Response): Promise<void> {
    //     try {
    //         const getVideo = await subSectionModel.find({});
    //         getVideo.map(async (x) => {
    //             const getObjectParams =
    //             {
    //                 Bucket: bucketName,
    //                 Key: x.video

    //             }
    //             const command = new GetObjectCommand(getObjectParams);
    //             const url = await getSignedUrl(s3, command);
    //             x.videoUrl = url;
    //             await x.save();
    //             console.log(x.videoUrl);
    //         })
    //         return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", getVideo);

    //     } catch (error) {
    //         console.log(error);
    //         return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
    //     }
    // }
    // public async getVideo(req: Request, res: Response): Promise<void> {
    //     try {
    //         const getVideo = await subSectionModel.find({});
    //         getVideo.map(async (x) => {
    //             // const getObjectParams =
    //             // {
    //             //     Bucket: bucketName,
    //             //     Key: x.video

    //             // }
    //             // const command = new GetObjectCommand(getObjectParams);
    //             // const url = await getSignedUrl(s3, command);
    //             const url = "https://bucket-rabita.s3.eu-west-3.amazonaws.com/" + x.video;
    //             console.log(url);
    //             x.videoUrl = url;
    //             await x.save();
    //             console.log(x.videoUrl);
    //         })
    //         return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", getVideo);

    //     } catch (error) {
    //         console.log(error);
    //         return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
    //     }
    // }
    public async getVideo(req: Request, res: Response): Promise<void> {
        try {
            const { subsection_id } = req.body;
            const getVideo = await subSectionModel.findById({ _id: subsection_id });
            console.log(getVideo.videoUrl);
            return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", getVideo);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async addCourse(req: CustomRequest, res: Response): Promise<void> {
        try {

            const { title, description, category } = req.body;
            // const validation = validationResult(req).array();
            // if (validation.length > 0) {
            //     return sendResponse(res, HTTP_STATUS.CONFLICT, "Admin couldn't be added!", validation);
            // }
            console.log(req.file);
            const imagePath = req.file.path;
            console.log(imagePath);
            console.log(req.body)
            const saveCourse = new courseModel({
                image: imagePath,
                title: title,
                description: description,
                category: category,
                instructor: req.userId,
                message: "Please accept the course"
            })
            await saveCourse.save();
            if (!saveCourse) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Couldn't add course.Something went wrong!");
            }
            // var transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: 'rabitaamin015@gmail.com',
            //         pass: 'incb efmr anwq oibk'
            //     }
            // });
            // var mailOptions = {
            //     from: 'rabitaamin015@gmail.com',
            //     to: 'begummaksuda016@gmail.com',
            //     subject: 'Course Acceptence Request',
            //     html: `<p>Hello!<br>A new course creation request has been received. Please verify! Visit
            //     <a href="http://localhost:5174/admin">link</a></p>`
            // };
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to admins account!");
            //     }
            // });
            const addedCourse = await courseModel.findById({ _id: saveCourse._id });
            return sendResponse(res, HTTP_STATUS.OK, "Course has been added successfully!", addedCourse);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async sendCourseAddrequest(req: CustomRequest, res: Response): Promise<void> {
        try {
            let count = 0;
            const { course_id } = req.body
            const findSection = await sectionModel.find({ set_course_id: course_id });
            console.log(findSection);
            findSection.map((item) => {
                if (!item.isDisabled && item.subSection.length === 0) {
                    count++;
                }
            })
            console.log(`count is ${count}`);
            if (count > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Subscription request can't be sent.Please add contents to all your lessons!");
            }
            const findCourse = await courseModel.findById({ _id: course_id });
            findCourse.subscription = true;
            await findCourse.save();
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
                subject: 'Course Acceptence Request',
                html: `<p>Hello!<br>A new course creation request has been received. Please verify! Visit
                <a href="http://localhost:5174/admin">link</a></p>`
            };
            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    const getAdmin = await adminModel.find({});
                    const getAdminArray = getAdmin.filter((x) => x._id);

                    const createNotification = new notificationModel({
                        sender: req.userId,
                        receiver: getAdminArray,
                        courseID: course_id,
                        message: "Please add the course",
                        forAdmin: true,
                        notificationType: "acceptCourseAdd"
                    })
                    await createNotification.save();
                    return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to admins account!");
                }
            });

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

    public async getCourseNotification(req: CustomRequest, res: Response): Promise<void> {
        try {
            let flag = false;
            const isLoggedIn = findAuth.findInstructor(req);
            if (!isLoggedIn) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or login first!");
            }
            const findNotification = await notificationModel.find({ $and: [{ receiver: req.userId }, { forAdmin: false }, { read: false }] });
            if (findNotification.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Notification fetched successfully!", findNotification)
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No new notification");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");

        }
    }
    public async addSection(req: CustomRequest, res: Response): Promise<void> {
        try {

            const { course_id, title } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Section couldn't be added!", validation);
            }
            const existCourse = await courseModel.findById({ _id: course_id });
            if (!existCourse) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "No such course exist!");
            }
            const createSection = new sectionModel({
                set_course_id: course_id,
                title: title
            })
            await createSection.save();
            if (createSection) {
                existCourse.section.push(createSection._id);
                await existCourse.save();
                const createdSection = await sectionModel.findById({ _id: createSection._id });
                return sendResponse(res, HTTP_STATUS.OK, "Section has been added successfully!", createdSection);
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Something went wrong!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

    public async addAssignment(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { section_id, title, question, course_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Admin couldn't be added!", validation);
            }
            const findSection = await sectionModel.findById({ _id: section_id });
            if (!findSection) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Section is not found!");
            }
            const createAssignment = new assignmentModel({
                set_course_id: course_id,
                set_section_id: section_id,
                title: title,
                question: question
            })
            await createAssignment.save();
            if (createAssignment) {
                const createSubSection = new subSectionModel({
                    set_course_id: course_id,
                    set_section_id: section_id,
                    assignment: createAssignment._id
                })
                await createSubSection.save();
                findSection.subSection.push(createSubSection._id);
                await findSection.save();
                return sendResponse(res, HTTP_STATUS.OK, "Assignment added successfully", createAssignment);
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Something went wrong!");


        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getSubsectionById(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id, section_id } = req.body;
            const findAll = await subSectionModel.find({ $and: [{ set_course_id: course_id }, { set_section_id: section_id }] })
                .populate("quiz assignment");
            if (findAll.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", findAll);
            }
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getAllVideo(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id, section_id } = req.body;
            const findVideo = await subSectionModel.find({
                $and: [
                    { set_course_id: course_id },
                    { set_section_id: section_id },
                    { isDisabled: false },
                    { videoUrl: { $exists: true } }
                ]
            });
            // if (findVideo.length > 0) {
            //     return sendResponse(res, HTTP_STATUS.OK, "Video found", findVideo);
            // }
            // return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Video haven't been created");
            return sendResponse(res, HTTP_STATUS.OK, "Video found", findVideo);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async deleteVideo(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { subsection_id } = req.body;
            const findVideo = await subSectionModel.findById({ _id: subsection_id });
            if (findVideo) {
                findVideo.isDisabled = true;
                await findVideo.save();
                return sendResponse(res, HTTP_STATUS.OK, "Video deleted");
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Video not found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getInstructorById(req: CustomRequest, res: Response) {
        const findInstructor = await instructorModel.findById({ _id: req.userId });
        return sendResponse(res, HTTP_STATUS.OK, "Found", findInstructor);
    }

}
export default new Instructor;

