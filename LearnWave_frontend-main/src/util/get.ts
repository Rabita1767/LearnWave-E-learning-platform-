import { Request, Response } from "express";
import CustomRequest from "./interface";
import assignmentSubModel from "../interfaces/assignmentSubmission";
import quizModel from "../interfaces/quiz";
import quizSubModel from "../interfaces/quizSubmission";
import reviewModel from "../interfaces/review";
import courseModel from "../interfaces/course";
import studentModel from "../interfaces/student";
import instructorModel from "../interfaces/instructor";
import cartModel from "../interfaces/cart";
import authModel from "../interfaces/auth";
import HTTP_STATUS from "../lib/constants/statusCode";
import sendResponse from "./common";
class GetAll {
    public async getOneAssignment(req: CustomRequest, student_id, assignment_id) {
        try {
            const findAssignment = await assignmentSubModel.findOne({ $and: [{ student_id: student_id }, { assignment_id: assignment_id }] });
            return findAssignment;

        } catch (error) {
            console.log(error);
        }
    }
    public async getOneQuiz(req: CustomRequest, quiz_id) {
        try {
            const findQuiz = await quizModel.findById({ _id: quiz_id });
            return findQuiz;
        } catch (error) {
            console.log(error);
        }
    }
    public async getOneQuizSubmission(req: CustomRequest, student_id, course_id, quiz_id) {
        try {
            const findSubmission = await quizSubModel.findOne({ $and: [{ student_id: req.userId }, { course_id: course_id }, { quiz_id: quiz_id }] });
            return findSubmission;
        } catch (error) {
            console.log(error);
        }
    }
    public async getOneReview(req: CustomRequest, course_id, student_id) {
        try {
            const findReview = await reviewModel.findOne({ $and: [{ course_id: course_id }, { student_id: student_id }] });
            return findReview;
        } catch (error) {
            console.log(error);
        }
    }
    public async getAllReviewCourse(req: CustomRequest, course_id) {
        try {
            const findAllReview = await reviewModel.find({ course_id: course_id });
            return findAllReview;

        } catch (error) {
            console.log(error);
        }
    }
    public async getOneCourse(course_id) {
        try {
            const findCourse = await courseModel.findById({ _id: course_id });
            return findCourse;
        } catch (error) {
            console.log(error);
        }
    }
    public async getReview(req: CustomRequest, review_id) {
        try {
            const findReview = await reviewModel.findById({ _id: review_id });
            return findReview;
        } catch (error) {
            console.log(error);
        }
    }
    public async getStudentInfo(req: CustomRequest, student_id) {
        try {
            const findStudent = await studentModel.findById({ _id: student_id });
            return findStudent;
        } catch (error) {
            console.log(error);
        }
    }
    public async getCart(req: CustomRequest, cart_id) {
        try {
            const findCart = await cartModel.findById({ _id: cart_id });
            return findCart;

        } catch (error) {
            console.log(error);
        }
    }
    public async findAllAuth() {
        try {
            const findAllAuth = await authModel.find({});
            return findAllAuth;
        } catch (error) {
            console.log(error);
        }
    }
    public async findAllStudent() {
        try {
            const findAllStudent = await studentModel.find({});
            return findAllStudent;
        } catch (error) {
            console.log(error);
        }
    }
    public async findAllTeacher() {
        try {
            const findAllTeacher = await instructorModel.find({});
            return findAllTeacher;
        } catch (error) {
            console.log(error);
        }
    }
    public async findOneStudent(student_id) {
        try {
            const findOneStudent = await studentModel.findById({ _id: student_id });
            return findOneStudent;

        } catch (error) {
            console.log(error);
        }
    }
    public async findOneTeacher(instructor_id) {
        try {
            const findOneTeacher = await instructorModel.findById({ _id: instructor_id });
            return findOneTeacher;

        } catch (error) {
            console.log(error);
        }
    }

}
export default new GetAll;