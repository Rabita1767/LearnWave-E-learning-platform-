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
import findAuth from "../util/findAuth";
interface CustomRequest extends Request {
    userId: ObjectId;
    file: any;
}
class Cart {
    public async addToCart(req: CustomRequest, res: Response): Promise<void> {
        try {
            const isLoggedIn = findAuth.findStudent(req);
            if (!isLoggedIn) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in!");
            }
            const { course } = req.body;
            const [{ course_id }] = course;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Cart couldn't be created!", validation);
            }
            const existCourse = await studentModel.findById({ _id: req.userId });
            const enroll_Course = existCourse.enrolled_courses.map((enroll) => enroll.course_id);
            const courseArray = enroll_Course.map((enroll) => enroll.toString());
            const findCart = await cartModel.findOne({ student_id: req.userId });
            if (findCart) {
                const cart_Course = findCart.course.map((courseID) => courseID.course_id);
                const cart_Course_array = cart_Course.map((course) => course.toString());
                console.log(cart_Course_array);
                console.log(course_id)
                console.log(cart_Course_array.includes(course_id));
                if (cart_Course_array.includes(course_id)) {
                    return sendResponse(res, HTTP_STATUS.CONFLICT, "Can't add course.Course already exist in the cart");
                }
                // const existCourse = await studentModel.findById({ _id: req.userId });
                // const courseArray = existCourse.enrolled_courses.filter((enroll) => enroll.course_id);
                if (courseArray.includes(course_id)) {
                    return sendResponse(res, HTTP_STATUS.CONFLICT, "You are already enrolled in this course!");
                }
                if (courseArray.length > 5) {
                    return sendResponse(res, HTTP_STATUS.CONFLICT, "Can't add more course you are already enrolled in 5 courses!");
                }
                const createObject = {
                    course_id: course_id
                }
                findCart.course.push(createObject);
                await findCart.save();
                return sendResponse(res, HTTP_STATUS.OK, "Successfully added course", findCart);
            }
            if (courseArray.includes(course_id)) {
                console.log(courseArray);
                return sendResponse(res, HTTP_STATUS.CONFLICT, "You are already enrolled in this Course!");
            }
            const createCart = new cartModel({
                student_id: req.userId,
                course: course
            })
            await createCart.save();
            existCourse.cart_id = createCart._id;
            await existCourse.save();
            return sendResponse(res, HTTP_STATUS.OK, "Added item successfully!", createCart);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async removeFromCart(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course } = req.body;
            const [{ course_id }] = course;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Cart couldn't be created!", validation);
            }
            const findCart = await cartModel.findOne({ student_id: req.userId });
            if (!findCart) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please create a cart");
            }
            const courseArray = findCart.course.map((courseId) => courseId.course_id);
            const course_array = courseArray.map((cart) => cart.toString());
            if (courseArray.length > 0) {
                if (!course_array.includes(course_id)) {
                    return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Item doesn't exist!");
                }
                const findIndex = findCart.course.findIndex((courseID) => courseID.course_id.toString() == course_id.toString())
                findCart.course.splice(findIndex, 1);
                await findCart.save();
                return sendResponse(res, HTTP_STATUS.OK, "Successfully Removed the course");
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Your cart is empty!");

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
            const findCart = await cartModel.findOne({ student_id: req.userId })
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

}
export default new Cart;