import mongoose, { Document } from "mongoose";
import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import CustomRequest from "../util/interface";
import bcrypt from "bcrypt";
import sendResponse from "../util/common";
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import HTTP_STATUS from "../constants/statusCode";
import assignmentSubModel from "../models/assignmentSubmission";
import assignmentModel from "../models/assignment";
import findAuth from "../util/findAuth";
import getAll from "../util/get";
class Assignment {
    public async submitAssignment(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { assignment_id, answer, section_id, course_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Assignment couldn't be submitted!", validation);
            }
            const isLoggedIn = findAuth.findStudent(req);
            if (!isLoggedIn) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in!");
            }
            const findSubmit = await assignmentSubModel.findOne({ $and: [{ student_id: req.userId }, { assignment_id: assignment_id }] });
            if (findSubmit) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Assignment has been submitted by you previously!")
            }
            const submitAssignment = new assignmentSubModel({
                set_course_id: course_id,
                set_section_id: section_id,
                student_id: req.userId,
                assignment_id: assignment_id,
                answer: answer
            })
            await submitAssignment.save();
            return sendResponse(res, HTTP_STATUS.OK, "Assignment submitted successfully", submitAssignment);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getAllSubmittedAssignment(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { assignment_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Couldn't get the assignment!", validation);
            }
            const findAssignment = await assignmentSubModel.find({ assignment_id: assignment_id });
            if (findAssignment.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Data found successfully!", findAssignment);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No assignments were submitted!");


        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getOneAssignment(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { student_id, assignment_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Validation error!Something went wrong!!", validation);
            }
            const findAssignment = await assignmentSubModel.findOne({ $and: [{ student_id: student_id }, { assignment_id: assignment_id }] });
            if (findAssignment) {
                return sendResponse(res, HTTP_STATUS.OK, "Assignment fetched successfully!", findAssignment);
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Something went wrong!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async checkAssignment(req: CustomRequest, res: Response): Promise<void> {
        try {
            const isLoggedIn = findAuth.findInstructor(req);
            if (!isLoggedIn) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in!");
            }
            const { score, student_id, assignment_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Assignment couldn't be checked!", validation);
            }
            const findAssignment = await getAll.getOneAssignment(req, student_id, assignment_id);
            console.log(findAssignment);
            if (findAssignment) {
                findAssignment.score = score;
                findAssignment.checked = true;
                await findAssignment.save();
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
                    html: `<p>Hello!<br>Your assignment has been checked!Please check your marks Visit
                    <a href="http://localhost:5174/student">link</a></p>`
                };
                transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        return sendResponse(res, HTTP_STATUS.OK, "Assignment has been checked.Email has been sent to students account!", findAssignment);
                    }
                });

            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Assignment not found!Sometging went wrong");
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getAssignmentScore(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { assignment_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Score couldn't be added!", validation);
            }
            const findScore = await getAll.getOneAssignment(req, req.userId, assignment_id);
            if (findScore) {
                if (findScore.checked) {
                    return sendResponse(res, HTTP_STATUS.OK, "Successfully fetched score", findScore);
                }
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Assignment has not been checked yet!");
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Couldn't fetched data.Something went wrong!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async deleteAssignment(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id, assignment_id } = req.body;
            const findAssignment = await assignmentModel.findOne({ $and: [{ _id: assignment_id }, { set_course_id: course_id }] });
            if (!findAssignment.isDisbled) {
                findAssignment.isDisbled = true;
                await findAssignment.save();
                return sendResponse(res, HTTP_STATUS.OK, "Assignment has been deleted");
            }
            else {
                return sendResponse(res, HTTP_STATUS.OK, "You have deleted it previously!")
            }


        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async editAssignment(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { assignment_id, title, question } = req.body;
            interface IFields {
                title?: string,
                question?: string
            }
            const fields: IFields = {};
            if (title) {
                fields.title = title;
            }
            if (question) {
                fields.question = question;
            }
            const updateAssignment = await assignmentModel.findOneAndUpdate({ _id: assignment_id }, { $set: fields });
            if (updateAssignment) {

                return sendResponse(res, HTTP_STATUS.OK, "Updated successfully", updateAssignment);
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Couldn't update");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getAllAssignment(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id, section_id } = req.body;
            const findAssignment = await assignmentModel.find({ $and: [{ set_course_id: course_id }, { set_section_id: section_id }, { isDisbled: false }] });
            if (findAssignment.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Assignment found", findAssignment);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Assignment haven't been created");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

}
export default new Assignment;