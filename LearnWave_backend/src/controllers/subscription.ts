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
import studentModel from "../models/student";
import adminModel from "../models/admin";
import courseModel from "../models/course";
import sectionModel from "../models/section";
import notificationModel from "../models/notification";
import cartModel from "../models/cart";
import transactionModel from "../models/transaction";
import wishlistModel from "../models/wishlist";
import findAuth from "../util/findAuth";
import getAll from "../util/get";
interface CustomRequest extends Request {
    userId: ObjectId;
    file: any;
}
interface Icourse {
    save(): unknown;
    course_id: mongoose.Types.ObjectId,
    isAccepted?: boolean
}

class Subscription {
    public async sendSubcriptionRequest(req: CustomRequest, res: Response): Promise<void> {
        try {
            const viewCart = await cartModel.findOne({ student_id: req.userId });
            const findStudent = await studentModel.findById({ _id: req.userId });
            if (!viewCart) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Cant send subscription request with an empty cart!");
            }
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
                subject: 'Subscription request',
                html: `<p>Hello!<br>A new course subscription request has been received. Please verify! Visit
                <a href="http://localhost:5174/admin">link</a></p>`
            };
            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    const findAdmin = await adminModel.find({});
                    const createNotification = new notificationModel({
                        sender: req.userId,
                        receiver: findAdmin,
                        cartID: viewCart._id,
                        message: `Please review the course subscription request of ${findStudent.name}`,
                        forAdmin: true,
                        notificationType: "acceptSubscription"
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
    // public async confirmSubscription(req: CustomRequest, res: Response): Promise<void> {
    //     try {
    //         let flag = false;
    //         let ok = false;
    //         const isLoggedIn = findAuth.findAdmin(req);
    //         if (!isLoggedIn) {
    //             return sendResponse(res, HTTP_STATUS.NOT_FOUND, "please sign up or log in!");
    //         }
    //         const { cart_id } = req.body;
    //         const findCart = await cartModel.findById({ _id: cart_id });
    //         const course_Array = findCart.course.map((course) => course.course_id);
    //         const courseArray = course_Array.map((courseID) => courseID.toString())
    //         const findStudent = await studentModel.findById({ _id: findCart.student_id });
    //         const enrolled_array = findStudent.enrolled_courses.map((enrolled) => enrolled.course_id);
    //         const enrolledArray = enrolled_array.map((array) => array.toString());
    //         courseArray.map(element => {
    //             if (enrolledArray.includes(element)) {
    //                 flag = true;
    //             }
    //         });
    //         if (!flag) {
    //             findCart.course.map(async (course) => {
    //                 course.isAccepted = true;
    //                 const newObj = {
    //                     course_id: course.course_id,
    //                 }
    //                 findStudent.enrolled_courses.push(newObj);
    //                 await findStudent.save();
    //             })
    //             const accepted = findCart.course.filter((course_list) => course_list.isAccepted)
    //             console.log(`${findCart}`);
    //             findCart.course.map(async (enrolled) => {
    //                 console.log(enrolled.course_id);
    //                 const findCourse = await courseModel.findById(enrolled.course_id).catch(error => {
    //                     console.error(`Error finding course: ${error}`);
    //                 });
    //                 console.log(findCourse);
    //                 if (findCourse) {
    //                     findCourse.enrollment.push(findCart.student_id);
    //                     ok = true;
    //                     await findCourse.save();
    //                 }
    //             })

    //             var transporter = nodemailer.createTransport({
    //                 service: 'gmail',
    //                 auth: {
    //                     user: 'rabitaamin015@gmail.com',
    //                     pass: 'incb efmr anwq oibk'
    //                 }
    //             });
    //             var mailOptions = {
    //                 from: 'rabitaamin015@gmail.com',
    //                 to: 'begummaksuda016@gmail.com',
    //                 subject: 'Subscription status',
    //                 html: `<p>Hello!<br>A new course subscription response has been received. Please check! Visit
    //                 <a href="http://localhost:5174/student">link</a></p>`
    //             };
    //             transporter.sendMail(mailOptions, async (error, info) => {
    //                 if (error) {
    //                     console.log(error);
    //                 } else {
    //                     const findAdmin = await adminModel.find({});
    //                     const createNotification = new notificationModel({
    //                         sender: req.userId,
    //                         receiver: findStudent._id,
    //                         cartID: findCart._id,
    //                         message: "Course Subscription status",
    //                         forAdmin: false
    //                     })
    //                     await createNotification.save();
    //                     findCart.course = [];
    //                     await findCart.save();
    //                     return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to students account!");
    //                 }
    //             });
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
    //     }
    // }
    public async confirmSubscription(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { cart_id, course_id, student_id } = req.body;
            const findCart = await cartModel.findById({ _id: cart_id });
            const findCourse = await courseModel.findById({ _id: course_id });
            const findStudent = await studentModel.findById({ _id: student_id });
            let flag = false;
            findCart.course.map((courseID) => {
                if (courseID.course_id.toString() == course_id) {
                    flag = true;
                    courseID.isAccepted = true;
                }
            })
            if (flag) {
                const newObj = {
                    course_id: course_id
                }
                findStudent.enrolled_courses.push(newObj);
                findCourse.enrollment.push(findCart.student_id);
                const createTransaction = new transactionModel({
                    student_id: findCart.student_id,
                    cart_id: cart_id,
                    course_id: course_id,
                    isAccepted: true
                })
                await createTransaction.save();
                const index = findCart.course.findIndex((course) => course.course_id.toString() == course_id.toString());
                findCart.course.splice(index, 1);
                await findCart.save();
                await findStudent.save();
                await findCourse.save();
            }
            if (findCart.course.length == 0) {
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
                    html: `<p>Hello!<br>A new course subscription response has been received. Please check! Visit
                    <a href="http://localhost:5174/student">link</a></p>`
                };
                transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        const createNotification = new notificationModel({
                            sender: req.userId,
                            receiver: findStudent._id,
                            cartID: findCart._id,
                            message: "Course Subscription has been accepted",
                            forAdmin: false
                        })
                        await createNotification.save();
                        return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to students account!");
                    }
                });
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    // public async rejectSubscription(req: CustomRequest, res: Response): Promise<void> {
    //     try {
    //         const isLoggedIn = findAuth.findAdmin(req);
    //         if (!isLoggedIn) {
    //             return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in!");
    //         }
    //         let flag = false;
    //         const { cart_id } = req.body;
    //         const findCart = await cartModel.findById({ _id: cart_id });
    //         const findStudent = await studentModel.findById({ _id: findCart.student_id });
    //         findCart.course.map((course) => {
    //             course.isAccepted = false;
    //             flag = true;
    //         })
    //         if (flag) {
    //             await findCart.save();
    //         }
    //         var transporter = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 user: 'rabitaamin015@gmail.com',
    //                 pass: 'incb efmr anwq oibk'
    //             }
    //         });
    //         var mailOptions = {
    //             from: 'rabitaamin015@gmail.com',
    //             to: 'begummaksuda016@gmail.com',
    //             subject: 'Subscription status',
    //             html: `<p>Hello!<br>A new course subscription response has been received. Please check! Visit
    //             <a href="http://localhost:5174/student">link</a></p>`
    //         };
    //         transporter.sendMail(mailOptions, async (error, info) => {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 const createNotification = new notificationModel({
    //                     sender: req.userId,
    //                     receiver: findStudent._id,
    //                     cartID: findCart._id,
    //                     message: "Course Subscription status",
    //                     forAdmin: false
    //                 })
    //                 await createNotification.save();
    //                 return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to students account!");
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
    //     }
    // }
    public async rejectSubscription(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { cart_id, course_id, student_id } = req.body;
            const findCart = await cartModel.findById({ _id: cart_id });
            const findCourse = await courseModel.findById({ _id: course_id });
            const findStudent = await studentModel.findById({ _id: student_id });
            let flag = false;
            findCart.course.map((courseID) => {
                if (courseID.course_id.toString() == course_id) {
                    flag = true;
                    courseID.isAccepted = false;
                }
            })
            if (flag) {
                const createTransaction = new transactionModel({
                    student_id: findCart.student_id,
                    cart_id: cart_id,
                    course_id: course_id,
                    isAccepted: false
                })
                await createTransaction.save();
                const index = findCart.course.findIndex((course) => course.course_id.toString() == course_id.toString());
                findCart.course.splice(index, 1);
                await findCart.save();
            }
            if (findCart.course.length == 0) {
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
                    html: `<p>Hello!<br>A new course subscription response has been received. Please check! Visit
                    <a href="http://localhost:5174/student">link</a></p>`
                };
                transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        const createNotification = new notificationModel({
                            sender: req.userId,
                            receiver: findStudent._id,
                            cartID: findCart._id,
                            message: "Course subscription has been rejected",
                            forAdmin: false
                        })
                        await createNotification.save();
                        return sendResponse(res, HTTP_STATUS.OK, "Email has been sent to students account!");
                    }
                });
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    async clearNotification(req: CustomRequest, res: Response) {
        try {
            const { notification_id } = req.body;
            const deleteNotification = await notificationModel.deleteOne({ _id: notification_id });
            if (deleteNotification.acknowledged) {
                return sendResponse(res, HTTP_STATUS.OK, "Notification has been deleted!");
            }
            return sendResponse(res, HTTP_STATUS.NOT_ACCEPTABLE, "Something went wrong!");


        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

}
export default new Subscription;