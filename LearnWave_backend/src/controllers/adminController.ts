import mongoose, { Document } from "mongoose";
import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt";
import sendResponse from "../util/common";
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import utilFunc from "../util/generateToken"
import HTTP_STATUS from "../constants/statusCode";
import authModel from "../models/auth";
import adminModel from "../models/admin";
import courseModel from "../models/course";
import sectionModel from "../models/section";
import notificationModel from "../models/notification";
import transactionModel from "../models/transaction";
import studentModel from "../models/student";
import instructorModel from "../models/instructor";
import findAuth from "../util/findAuth";
import cartModel from "../models/cart";
import wishlistModel from "../models/wishlist";
import getAll from "../util/get";
interface CustomRequest extends Request {
    userId: ObjectId;
    file: any;
}
interface IUpdate {
    fname?: string,
    lname?: string,
    userName?: string,
    phoneNumber?: number,
    email?: string
}
class Admin {
    public async auth(req: Request, res: Response): Promise<void> {
        try {
            const { fname, lname, userName, email, password, phoneNumber, role, isSuper } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const createAdmin = new adminModel({
                fname: fname,
                lname: lname,
                userName: userName,
                email: email,
                password: hashedPassword,
                phoneNumber: phoneNumber,
                role: role,
                isSuper: isSuper,
            })
            await createAdmin.save();
            return sendResponse(res, HTTP_STATUS.OK, "Data added successfully!");


        } catch (error) {
            console.log(error);
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
            const findUser = await adminModel.findOne({ email: email });
            if (!findUser) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please Sign Up First!");
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
    public async addAdmin(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { fname, lname, userName, email, password, phoneNumber, role, isSuper } = req.body;
            console.log(req.userId);
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Admin couldn't be added!", validation);
            }
            const findUser = await adminModel.findById({ _id: req.userId });
            if (!findUser) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign in!");
            }
            const findExistingEmail = await adminModel.findOne({ email: email });
            if (findExistingEmail) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Cant add as an admin.Email already registered!");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const createAdmin = new adminModel({
                fname: fname,
                lname: lname,
                userName: userName,
                email: email,
                password: hashedPassword,
                phoneNumber: phoneNumber,
                role: role,
                isSuper: isSuper,
            })
            await createAdmin.save();
            if (!createAdmin) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Couldn't add admin.Something went wrong!");
            }
            return sendResponse(res, HTTP_STATUS.OK, "Successfully added admin");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getAdminNotification(req: CustomRequest, res: Response): Promise<void> {
        try {

            let flag = false;
            const allNotification = await notificationModel.find({ $and: [{ read: false }, { forAdmin: true }, { notificationType: "acceptCourseAdd" }] });
            // const getNotification = allNotification.filter((notification) => notification.read);
            if (allNotification.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Notification fetched successfully!", allNotification);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No notifications are there!");


        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async acceptCourse(req: CustomRequest, res: Response): Promise<void> {
        try {

            const { course_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Process couldn't be performed!", validation);
            }
            const findNotification = await notificationModel.findOne({ $and: [{ courseID: course_id }, { read: false }, { forAdmin: true }] });
            const findCourse = await courseModel.findById({ _id: course_id });
            // if (!findNotification) {
            //     return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No notification was found!");
            // }


            const updateResult = await notificationModel.updateMany(
                { courseID: course_id, read: false, forAdmin: true },
                { $set: { read: true, isAccepted: true } }
            );
            // findNotification.isAccepted = true;
            // findNotification.read = true;
            // await findNotification.save();

            findCourse.isApproved = true;
            await findCourse.save();
            const createNotification = new notificationModel({
                sender: req.userId,
                receiver: findNotification.sender,
                courseID: findNotification.courseID,
                message: "Your Course has been accepted!",
                isAccepted: true
            })
            await createNotification.save();
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
                subject: 'Course Acceptence Response',
                html: `<p>Hello!<br>There's an update about you course!It has been accepted</p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to student account!!");
                }
            });
            return sendResponse(res, HTTP_STATUS.OK, "Course has been accepted");
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async rejectCourse(req: CustomRequest, res: Response): Promise<void> {
        try {

            const { course_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Admin couldn't be added!", validation);
            }
            // const findNotifcation = await notificationModel.findOne({ courseID: course_id });
            const findNotification = await notificationModel.findOne({ $and: [{ courseID: course_id }, { read: false }, { forAdmin: true }] });
            const findCourse = await courseModel.findById({ _id: course_id });
            // if (!findNotification) {
            //     return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Nonotification was found!");
            // }
            // findNotification.read = true;
            // await findNotification.save();
            const updateResult = await notificationModel.updateMany(
                { courseID: course_id, read: false, forAdmin: true },
                { $set: { read: true } }
            );
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
                subject: 'Course Acceptence Response',
                html: `<p>Hello!<br>There's an update about you course!It has been rejected</p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to student account!!");
                }
            });
            return sendResponse(res, HTTP_STATUS.OK, "Course has been rejected");
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async viewTransactionOfUser(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { student_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Admin couldn't be added!", validation);
            }
            const findTransaction = await transactionModel.find({ student_id: student_id });
            if (findTransaction.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", findTransaction);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No trasaction record found!");
        } catch (error) {

        }
    }
    public async viewAllTransaction(req: CustomRequest, res: Response): Promise<void> {
        try {

            const findAllTransaction = await transactionModel.find({});
            if (findAllTransaction.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", findAllTransaction);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No trasaction record found!");
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async viewAllUserData(req: CustomRequest, res: Response): Promise<void> {
        try {
            const findAllUser = await authModel.find({});
            if (findAllUser.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", findAllUser);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No record found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async viewAllStudent(req: CustomRequest, res: Response): Promise<void> {
        try {
            const findAllStudent = await getAll.findAllStudent();
            if (findAllStudent.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", findAllStudent);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No record found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async viewAllTeacher(req: CustomRequest, res: Response): Promise<void> {
        try {
            const findAllTeacher = await getAll.findAllTeacher();
            if (findAllTeacher.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", findAllTeacher);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No record found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async editStudentData(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { student_id, fname, lname, userName, email, phoneNumber } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Data could not be edited", validation);
            }
            const findStudent = await getAll.findOneStudent(student_id);
            const updateField: IUpdate = {};
            if (findStudent) {
                if (fname) {
                    updateField.fname = fname;
                }
                if (lname) {
                    updateField.lname = lname;
                }
                if (userName) {
                    updateField.userName = userName;
                }
                if (email) {
                    updateField.email = email;
                }
                if (phoneNumber) {
                    updateField.phoneNumber = phoneNumber
                }
                await studentModel.updateOne({ _id: student_id }, { $set: updateField });
                await authModel.updateOne({ student_id: student_id }, { $set: updateField });
                return sendResponse(res, HTTP_STATUS.OK, "Data has been updated", findStudent);

            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Student data not found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async editTeacherData(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { instructor_id, fname, lname, userName, email, phoneNumber } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Data could not be edited", validation);
            }
            console.log(instructor_id);
            const findTeacher = await getAll.findOneTeacher(instructor_id);
            const updateField: IUpdate = {};
            if (findTeacher) {
                if (fname) {
                    updateField.fname = fname;
                }
                if (lname) {
                    updateField.lname = lname;
                }
                if (userName) {
                    updateField.userName = userName;
                }
                if (email) {
                    updateField.email = email;
                }
                if (phoneNumber) {
                    updateField.phoneNumber = phoneNumber
                }
                await instructorModel.updateOne({ _id: instructor_id }, { $set: updateField });
                await authModel.updateOne({ instructor_id: instructor_id }, { $set: updateField });
                return sendResponse(res, HTTP_STATUS.OK, "Data has been updated", findTeacher);

            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Instructor data not found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async deleteStudent(req: CustomRequest, res: Response): Promise<void> {
        try {
            let flag = false;
            const { student_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Data could not be edited", validation);
            }
            const findStudent = await getAll.findOneStudent(student_id);
            const findAuth = await authModel.findOne({ student_id: student_id });
            findStudent.isDeleted = true;
            findAuth.isDeletedStudent = true;
            const enrolled_course_id = findStudent.enrolled_courses.map((courseId) => courseId.course_id);
            const matchedCourses = await courseModel.find({ _id: { $in: enrolled_course_id } });
            matchedCourses.map(async (courses) => {
                const index = courses.enrollment.findIndex((studentId) => studentId.toString() == student_id)
                courses.enrollment.splice(index, 1);
                await courses.save();
                // flag = true;
            })
            const findCart = await cartModel.findOne({ student_id: student_id });
            const findWishlist = await wishlistModel.findOne({ student_id: student_id });
            if (findCart) {
                findCart.isDisbled = true;
                await findCart.save();
            }
            if (findWishlist) {
                findWishlist.isDisbled = true;
                await findWishlist.save();
            }
            await findStudent.save();
            await findAuth.save();
            return sendResponse(res, HTTP_STATUS.OK, "User has been deleted!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async deleteCourseAdmin(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Data could not be edited", validation);
            }
            const findCourse = await getAll.getOneCourse(course_id);
            if (!findCourse) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Course doesn't exist!");
            }
            if (findCourse.isDisabled) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Course has been disabled!");
            }
            findCourse.isDisabled = true;
            await findCourse.save();
            // const findEnrolledStudent = await studentModel.find({ course_id: { $in: " enrolled_courses.course_id" } });
            const findEnrolledStudent = await studentModel.find({ "enrolled_courses.course_id": course_id });
            findEnrolledStudent.map(async (student) => {
                const index = student.enrolled_courses.findIndex((course) => course.course_id.toString() == course_id);
                student.enrolled_courses.splice(index, 1);
                await student.save();
            })
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
                subject: 'Subscription status',
                html: `<p>Hello!<br>A your course ${findCourse.title} has been disabled by our admin. Please check!</p>`
            };
            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to instructors account!");
                }
            });
            return sendResponse(res, HTTP_STATUS.OK, "Course has been disabled!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async viewCart(req: CustomRequest, res: Response): Promise<void> {
        try {
            // const isLoggedIn = findAuth.findAuth(req);
            // if (!isLoggedIn) {
            //     return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in first!");
            // }
            const { student_id } = req.body;
            const findCart = await cartModel.findOne({ student_id: student_id })
                .populate("course.course_id");

            if (!findCart) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please create a cart first!");
            }
            return sendResponse(res, HTTP_STATUS.OK, "Cart found successfully!", findCart);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getInstructor(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { instructor_id } = req.body;
            const findInstructor = await instructorModel.findById({ _id: instructor_id });
            if (findInstructor) {
                return sendResponse(res, HTTP_STATUS.OK, "Found", findInstructor);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Not found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getCourseById(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id } = req.body;
            const findCourse = await courseModel.findById({ _id: course_id });
            if (findCourse) {
                return sendResponse(res, HTTP_STATUS.OK, "Course found!", findCourse);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Not found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }


}
export default new Admin;