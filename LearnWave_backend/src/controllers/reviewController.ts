import mongoose, { Document } from "mongoose";
import { Request, Response } from "express";
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
import reviewModel from "../models/review";
import getAll from "../util/get";
import CustomRequest from "../util/interface";
interface IReview {
    rating?: string,
    review?: string
}
class Review {
    public async getAllReview(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id } = req.body;
            const findAllReview = await getAll.getAllReviewCourse(req, course_id);
            if (findAllReview.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Review found successfully!", findAllReview);
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "No reviews for this course yet!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async addReview(req: CustomRequest, res: Response): Promise<void> {
        try {
            let totalRating = 0;
            let flag = false;
            const { course_id, review, rating } = req.body;
            console.log(course_id);
            const findCourse = await getAll.getOneCourse(course_id);
            const findStudent = await studentModel.findById({ _id: req.userId });
            const findReview = await getAll.getOneReview(req, course_id, req.userId);
            if (!findReview) {
                findStudent.enrolled_courses.map((enroll) => {
                    if (enroll.course_id.toString() == course_id.toString()) {
                        flag = true;
                    }
                })
                if (flag) {
                    const createReview = new reviewModel({
                        student_id: req.userId,
                        course_id: course_id,
                        rating: rating,
                        review: review
                    })

                    await createReview.save();
                    const getAllReview = await getAll.getAllReviewCourse(req, course_id);
                    console.log(findCourse);
                    console.log(findStudent);
                    console.log(createReview._id);
                    findStudent.reviews.push(createReview._id);
                    await findStudent.save();
                    console.log(getAllReview);
                    if (getAllReview.length > 0) {
                        getAllReview.map((review) => {
                            totalRating = (totalRating + review.rating) / getAllReview.length;
                        })
                        findCourse.rating = totalRating;
                        findCourse.reviews.push(createReview._id);
                        console.log(findCourse);
                        console.log(totalRating);
                        await findCourse.save();
                    }
                    return sendResponse(res, HTTP_STATUS.OK, "Rating has been added!", createReview);
                }
                return sendResponse(res, HTTP_STATUS.CONFLICT, "You cant give a review because you are not enrolled to this courses!");
            }
            findReview.review = review;
            findReview.rating = rating;
            await findReview.save();
            const getAllReview = await getAll.getAllReviewCourse(req, course_id);
            if (getAllReview.length > 0) {
                getAllReview.map((review) => {
                    totalRating = (totalRating + review.rating) / getAllReview.length;
                })
                findCourse.rating = totalRating;
                await findCourse.save();
            }
            return sendResponse(res, HTTP_STATUS.OK, "Review has been updated!", findReview);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "")
        }
    }
    public async updateReview(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { review, rating, course_id, review_id } = req.body;
            const findReview = await reviewModel.findById({ _id: review_id });
            const obj: IReview = {};
            if (review) {
                obj.review = review;
            }
            if (rating) {
                obj.rating = rating;
            }
            if (findReview) {
                const updateReview = await reviewModel.updateOne({ _id: review_id }, { $set: obj });
                console.log(updateReview);
                return sendResponse(res, HTTP_STATUS.OK, "Review has been updated", updateReview);
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Review not found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async deleteReview(req: CustomRequest, res: Response): Promise<void> {
        try {
            let totalRating = 0;
            const { review_id } = req.body;
            const findReview = await getAll.getReview(req, review_id);
            const findAllReview = await getAll.getAllReviewCourse(req, findReview.course_id);
            const findCourse = await getAll.getOneCourse(findReview.course_id);
            if (findReview) {
                totalRating = findCourse.rating;
                totalRating = (totalRating - findReview.rating) / findAllReview.length;
                findCourse.rating = totalRating;
                await reviewModel.deleteOne({ _id: review_id });
                const findStudent = await getAll.getStudentInfo(req.userId);
                const index = findStudent.reviews.findIndex((reviewId) => reviewId.toString() == review_id.toString());
                findStudent.reviews.splice(index, 1);
                await findStudent.save();
                const revIndex = findCourse.reviews.findIndex((review) => review.toString() == review_id.toString());
                findCourse.reviews.splice(revIndex, 1);
                await findCourse.save();
                return sendResponse(res, HTTP_STATUS.OK, "Review has been deleted!");
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Review not found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

}
export default new Review;