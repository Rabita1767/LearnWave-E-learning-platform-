import { Request, Response } from "express";
import sendResponse from "../util/common";
import CustomRequest from "../util/interface"
import HTTP_STATUS from "../constants/statusCode";
import get from "../util/get";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import studentModel from "../models/student";
import instructorModel from "../models/instructor";
import tokenModel from "../models/userToken";
import authModel from "../models/auth";
import courseModel from "../models/course";
import sectionModel from "../models/section";
import subSectionModel from "../models/subSection";
import findAuth from "../util/findAuth";
import studentVerificationModel from "../models/studentVerification";
import { validationResult } from "express-validator";
import utilFunc from "../util/generateToken";
import mongoose from "mongoose";
import { Document, Types } from "mongoose";
import getAll from "../util/get";
class Course {
    public async getEnrolledCourses(req: CustomRequest, res: Response) {
        try {
            const findStudent = await get.getStudentInfo(req.userId);
            if (!findStudent) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Student data not found!");
            }
            const enrolledCourses = await findStudent.enrolled_courses.map((course) => course.course_id);
            const findCourses = await courseModel.find({ _id: { $in: enrolledCourses } })
                .populate("section");
            if (findCourses.length == 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "You are not enrolled in any courses yet!");
            }
            return sendResponse(res, HTTP_STATUS.OK, "Successfully fetched data!", findCourses);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getNotEnrolledCourses(req: CustomRequest, res: Response) {
        try {
            const findStudent = await get.getStudentInfo(req.userId);
            if (!findStudent) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Student data not found!");
            }
            const enrolledCourses = await findStudent.enrolled_courses.map((course) => course.course_id);
            const findCourses = await courseModel.find({ $and: [{ _id: { $nin: enrolledCourses } }, { isApproved: true }, { isDisabled: false }] });
            return sendResponse(res, HTTP_STATUS.OK, "Successfully fetched data!", findCourses);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getAllSection(req: CustomRequest, res: Response): Promise<void> {
        const { course_id } = req.body;
        console.log(course_id);
        const findAllSections = await sectionModel.find({ $and: [{ set_course_id: course_id }, { isDisabled: false }] })
            .sort({ createdAt: -1 });
        if (findAllSections.length > 0) {
            return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully", findAllSections);
        }
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "This course doesn't contain any section", findAllSections);
    }
    public async getAllSectionData(req: CustomRequest, res: Response): Promise<void> {
        const { course_id } = req.body;
        console.log(course_id);
        const findAllSections = await sectionModel.find({ $and: [{ set_course_id: course_id }, { isDisabled: false }] });
        if (findAllSections.length > 0) {
            return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully", findAllSections);
        }
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "This course doesn't contain any section", findAllSections);
    }
    public async getAllSubSection(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { section_id } = req.body;
            const findSubSections = await get.getAllSubSection(section_id);
            if (findSubSections.length == 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "This section doesn't contain any content!");
            }
            return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", findSubSections);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getCourseByInstructor(req: CustomRequest, res: Response) {
        try {
            const findCourse = await courseModel.find({ instructor: req.userId });
            if (findCourse.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", findCourse)
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "You haven't added any courses yet!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

    public async progressCounter(req: CustomRequest, res: Response): Promise<void> {
        try {
            let contentLength = 0;
            const { course_id } = req.body;
            const findSection = await sectionModel.find({ set_course_id: course_id });
            findSection.map((section) => {
                contentLength = contentLength + section.subSection.length
            })
            console.log(contentLength);
            const progress = await studentModel.findOneAndUpdate(
                {
                    _id: req.userId,
                    "enrolled_courses.course_id": course_id
                },
                {
                    $set: { "enrolled_courses.$.total": contentLength }
                },
                {
                    new: true
                }
            );
            const findStudent = await studentModel.findById({ _id: req.userId });
            findStudent.enrolled_courses.map((course) => {
                console.log(course.total)
                if (course.total > 0) {
                    course.progress_bar = (course.progress / course.total) * 100;
                }

                else {
                    course.progress_bar = 0;
                }
                if (course.progress_bar === 100) {
                    course.isCompleted = true;
                }
            })
            await findStudent.save();
            console.log(progress);
            return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", progress);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async markAsCompleted(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id, subsection_id } = req.body;
            let contentLength = 0;
            const increaseProgress = await studentModel.findOneAndUpdate(
                {
                    _id: req.userId,
                    "enrolled_courses.course_id": course_id
                },
                {
                    $inc: { "enrolled_courses.$.progress": 1 }
                },
                {
                    new: true
                }
            );
            if (increaseProgress) {
                const findSubSection = await subSectionModel.findOne({ $and: [{ set_course_id: course_id }, { _id: subsection_id }] });
                findSubSection.videoCompleted = true;
                await findSubSection.save();
                const findSection = await sectionModel.find({ set_course_id: course_id });
                findSection.map((section) => {
                    contentLength = contentLength + section.subSection.length
                })
                console.log(contentLength);
                const progress = await studentModel.findOneAndUpdate(
                    {
                        _id: req.userId,
                        "enrolled_courses.course_id": course_id
                    },
                    {
                        $set: { "enrolled_courses.$.total": contentLength }
                    },
                    {
                        new: true
                    }
                );
                const findStudent = await studentModel.findById({ _id: req.userId });
                findStudent.enrolled_courses.map((course) => {
                    console.log(course.total)
                    if (course.total > 0) {
                        course.progress_bar = (course.progress / course.total) * 100;
                    }

                    else {
                        course.progress_bar = 0;
                    }
                    if (course.progress_bar === 100) {
                        course.isCompleted = true;
                    }
                })
                await findStudent.save();
                console.log(progress);
                return sendResponse(res, HTTP_STATUS.OK, "Data fetched successfully!", findStudent);

            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Content not been completed yet!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

    public async getStudentEnrolled(req: CustomRequest, res: Response): Promise<void> {
        try {
            const findStudent = await studentModel.findById({ _id: req.userId })
                .populate("enrolled_courses.course_id")
                ;
            if (findStudent) {
                return sendResponse(res, HTTP_STATUS.OK, "Data found successfully", findStudent);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No data found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async findSubsection(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id, subsection_id } = req.body;
            const findSubSection = await subSectionModel.findOne({ $and: [{ set_course_id: course_id }, { _id: subsection_id }] });
            if (findSubSection) {
                return sendResponse(res, HTTP_STATUS.OK, "Data fetched", { videoCompleted: findSubSection.videoCompleted });
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Subsection not found!");

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
                return sendResponse(res, HTTP_STATUS.OK, "Course found", findCourse);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Course not found!");

        } catch (error) {
            console.log(error)
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getCoursesByInstructor(req: CustomRequest, res: Response): Promise<void> {
        try {
            const findCourse = await courseModel.find({
                $and: [{ instructor: req.userId }, { isDisabled: false }]

            }).sort({ createdAt: -1 })
            if (findCourse.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Data fetched", findCourse);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "You haven't created any course yet!");

        } catch (error) {
            console.log(error)
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async editCourse(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id, title, description, category } = req.body;
            const { image } = req.file;
            const field: {
                image?: string;
                title?: string;
                description?: string;
                category?: string;
            } = {};
            console.log(req.file.path)

            if (req.file) {
                const imagePath = req.file.path;
                field.image = imagePath;
                console.log(field.image);
            }
            if (title) {
                field.title = title;
            }
            if (description) {
                field.description = description;
            }
            if (category) {
                field.category = category;
            }
            console.log(field);
            const updatedCourse = await courseModel.findOneAndUpdate({ _id: course_id }, { $set: field }, { new: true });
            if (updatedCourse) {
                return sendResponse(res, HTTP_STATUS.OK, "Course has been updated successfully!", updatedCourse)
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Couse couldn not be updated!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async editSection(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { section_id, title } = req.body;
            const field: {

                title?: string;

            } = {};



            if (title) {
                field.title = title;
            }

            const updatedSection = await sectionModel.findOneAndUpdate({ _id: section_id }, { $set: field }, { new: true });
            if (updatedSection) {
                return sendResponse(res, HTTP_STATUS.OK, "Section has been updated successfully!", updatedSection);
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Section could not be updated!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async deleteCourse(req: CustomRequest, res: Response): Promise<void> {
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
            if (!findCourse.isApproved) {
                return sendResponse(res, HTTP_STATUS.OK, "Course can not be deleted as its not been published yet")
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

            return sendResponse(res, HTTP_STATUS.OK, "Course has been disabled!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async deleteSection(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { section_id } = req.body;
            const findSection = await sectionModel.findById({ _id: section_id });
            if (findSection) {
                findSection.isDisabled = true;
                await findSection.save();
                return sendResponse(res, HTTP_STATUS.OK, "Section has been disabled!");
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Sections not found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getAllCourse(req: CustomRequest, res: Response): Promise<void> {
        try {
            const allCourse = await courseModel.find({ isDisabled: false });
            return sendResponse(res, HTTP_STATUS.OK, "Data found", allCourse);

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }


}
export default new Course;

