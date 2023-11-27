import mongoose, { Document } from "mongoose";
import { Request, Response } from "express";
import CustomRequest from "../util/interface"
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
import wishlistModel from "../models/wishlist";
import findAuth from "../util/findAuth";
interface ICourse {
    course_id: mongoose.Types.ObjectId,
    movedToCart?: boolean
}
class Wishlist {
    public async addToWishlist(req: CustomRequest, res: Response): Promise<void> {
        try {
            const isLoggedIn = findAuth.findStudent(req);
            if (!isLoggedIn) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in!");
            }
            const { course } = req.body;
            const [{ course_id }] = course;
            const existCourse = await studentModel.findById({ _id: req.userId });
            const findWishlist = await wishlistModel.findOne({ student_id: req.userId });
            if (findWishlist) {
                const wishlist_Course_array = findWishlist.course.filter((courseID) => courseID.course_id);
                console.log(wishlist_Course_array);
                if (course_id.includes(wishlist_Course_array).length > 0) {
                    return sendResponse(res, HTTP_STATUS.CONFLICT, "Can't add course.Course already exist in the wishlist");
                }
                const newCourseObject: ICourse = {
                    course_id: course_id,
                };
                findWishlist.course.push(newCourseObject);
                await findWishlist.save();
                return sendResponse(res, HTTP_STATUS.OK, "Successfully added course", findWishlist);
            }
            const createWishlist = new wishlistModel({
                student_id: req.userId,
                course: course
            })
            await createWishlist.save();
            existCourse.wishlist_id = createWishlist._id;
            await existCourse.save();
            return sendResponse(res, HTTP_STATUS.OK, "Added course successfully!", createWishlist);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async removeFromWishlist(req: CustomRequest, res: Response): Promise<void> {
        try {
            const isLoggedIn = findAuth.findStudent(req);
            if (!isLoggedIn) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Please sign up or log in!");
            }
            const { course } = req.body;
            const [{ course_id }] = course;
            const findWishlist = await wishlistModel.findOne({ student_id: req.userId });
            if (!findWishlist) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please create a wishlist first!");
            }
            const course_array = findWishlist.course.filter((courseId) => courseId.course_id);
            if (course_id.includes(course_array).length == 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Your wishlist is empty!");
            }
            const findIndex = findWishlist.course.findIndex((courseID) => courseID.course_id == course_id)
            findWishlist.course.splice(findIndex, 1);
            await findWishlist.save();
            return sendResponse(res, HTTP_STATUS.OK, "Successfully Removed the course from your wishlist");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }




    public async viewWishlist(req: CustomRequest, res: Response): Promise<void> {
        try {
            const isLoggedIn = findAuth.findAuth(req);
            if (!isLoggedIn) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in first!");
            }
            const findWishlist = await wishlistModel.findOne({ student_id: req.userId })
                .populate("course_id");
            if (!findWishlist) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please create a cart first!");
            }
            return sendResponse(res, HTTP_STATUS.OK, "Cart found successfully!", findWishlist);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

}
export default new Wishlist;