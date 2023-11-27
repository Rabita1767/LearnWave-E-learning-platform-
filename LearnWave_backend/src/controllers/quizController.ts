import { Request, Response } from "express";
import CustomRequest from "../util/interface";
import sendResponse from "../util/common";
import { validationResult } from "express-validator";
import HTTP_STATUS from "../constants/statusCode";
import findAuth from "../util/findAuth";
import sectionModel from "../models/section";
import subSectionModel from "../models/subSection";
import quizModel from "../models/quiz";
import quizSubModel from "../models/quizSubmission";
import getAll from "../util/get";
import mongoose from "mongoose";
class Quiz {
    // public async addQuiz(req: CustomRequest, res: Response): Promise<void> {
    //     try {
    //         const isLoggedIn = findAuth.findInstructor(req);
    //         if (!isLoggedIn) {
    //             return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in!");
    //         }
    //         const { title, questions, section_id, course_id, quiz_id } = req.body;
    //         const [{ question, options, answer }] = questions;
    //         const findSection = await sectionModel.findById({ _id: section_id });
    //         if (!findSection) {
    //             return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No such section exist!");
    //         }
    //         const findQuiz = await quizModel.findById({ _id: quiz_id });
    //         if (!findQuiz) {
    //             const createQuiz = new quizModel({
    //                 set_course_id: course_id,
    //                 set_section_id: section_id,
    //                 title: title,
    //                 questions: questions
    //             })
    //             await createQuiz.save();
    //             if (createQuiz) {
    //                 const createSubsection = new subSectionModel({
    //                     set_section_id: section_id,
    //                     quiz: createQuiz._id
    //                 })
    //                 await createSubsection.save();
    //                 findSection.subSection.push(createSubsection._id);
    //                 await findSection.save();
    //                 return sendResponse(res, HTTP_STATUS.OK, "Quiz has been created", createQuiz);
    //             }
    //             return sendResponse(res, HTTP_STATUS.CONFLICT, "Quiz couldn't be created.Something went wrong!");
    //         }
    //         const newObj =
    //         {
    //             question: question,
    //             options: options,
    //             answer: answer
    //         }
    //         findQuiz.questions.push(newObj);
    //         await findQuiz.save();
    //         return sendResponse(res, HTTP_STATUS.OK, "New questions have been added!", findQuiz);

    //     } catch (error) {
    //         console.log(error);
    //         return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
    //     }
    // }
    public async addQuiz(req: CustomRequest, res: Response): Promise<void> {
        try {

            const { title, questions, section_id, course_id, quiz_id } = req.body;
            const [{ question, options, answer }] = questions;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Quiz couldn't be added!", validation);
            }
            const findSection = await sectionModel.findById({ _id: section_id });
            if (!findSection) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No such section exist!");
            }
            const createQuiz = new quizModel({
                set_course_id: course_id,
                set_section_id: section_id,
                title: title,
                questions: questions
            })
            await createQuiz.save();
            if (createQuiz) {
                const createSubsection = new subSectionModel({
                    set_course_id: course_id,
                    set_section_id: section_id,
                    quiz: createQuiz._id
                })
                await createSubsection.save();
                console.log(createSubsection._id)
                findSection.subSection.push(createSubsection._id);
                await findSection.save();
                return sendResponse(res, HTTP_STATUS.OK, "Quiz has been created", createQuiz);
            }
            return sendResponse(res, HTTP_STATUS.CONFLICT, "Quiz couldn't be created.Something went wrong!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    // public async addQuiz(req: CustomRequest, res: Response): Promise<void> {
    //     try {

    //         const { title, questions, section_id, course_id, quiz_id } = req.body;
    //         const [{ question, options, answer }] = questions;
    //         const id = new mongoose.mongo.ObjectId();
    //         const validation = validationResult(req).array();
    //         if (validation.length > 0) {
    //             return sendResponse(res, HTTP_STATUS.CONFLICT, "Quiz couldn't be added!", validation);
    //         }
    //         const findSection = await sectionModel.findById({ _id: section_id });
    //         if (!findSection) {
    //             return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No such section exist!");
    //         }
    //         const findQuiz = await quizModel.findOne({ generated_quiz_id: id });
    //         if (findQuiz) {
    //             findQuiz.questions.push(questions);
    //             await findQuiz.save();
    //             return sendResponse(res, HTTP_STATUS.OK, "Question has been added!");
    //         }
    //         const createQuiz = new quizModel({
    //             generated_quiz_id: id,
    //             set_course_id: course_id,
    //             set_section_id: section_id,
    //             title: title,
    //             questions: questions
    //         })
    //         await createQuiz.save();
    //         if (createQuiz) {
    //             const createSubsection = new subSectionModel({
    //                 set_course_id: course_id,
    //                 set_section_id: section_id,
    //                 quiz: createQuiz._id
    //             })
    //             await createSubsection.save();
    //             console.log(createSubsection._id)
    //             findSection.subSection.push(createSubsection._id);
    //             await findSection.save();
    //             return sendResponse(res, HTTP_STATUS.OK, "Quiz has been created", createQuiz);
    //         }
    //         return sendResponse(res, HTTP_STATUS.CONFLICT, "Quiz couldn't be created.Something went wrong!");

    //     } catch (error) {
    //         console.log(error);
    //         return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
    //     }
    // }

    public async getOneQuiz(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { quiz_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Quiz couldn't be fetched!", validation);
            }
            const findQuiz = await getAll.getOneQuiz(req, quiz_id);
            if (findQuiz) {
                return sendResponse(res, HTTP_STATUS.OK, "Quiz found!", findQuiz);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Quiz doesn't exist!");
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async answerQuiz(req: CustomRequest, res: Response): Promise<void> {
        try {
            let flag = false;
            const { course_id, quiz_id, ansList, question_id } = req.body;
            const [{ set_question_id, answer }] = ansList;
            const [{ value, set_answer_id }] = answer;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Quiz answer couldn't be fetched!", validation);
            }
            const findQuiz = await getAll.getOneQuiz(req, quiz_id);
            console.log(findQuiz);
            const findSubmission = await getAll.getOneQuizSubmission(req.userId, course_id, quiz_id);
            if (findQuiz) {
                if (!findSubmission) {
                    const createSubmission = new quizSubModel({
                        student_id: req.userId,
                        course_id: course_id,
                        quiz_id: quiz_id,
                        ansList: ansList
                    });
                    await createSubmission.save();
                    return sendResponse(res, HTTP_STATUS.OK, "Answer submitted", createSubmission);
                }
                const submittedAnswer = findSubmission.ansList.filter((question) => question.set_question_id == question_id);
                console.log(`rabita:${submittedAnswer}`);
                if (submittedAnswer.length > 0) {
                    flag = true;
                }
                if (flag) {
                    const updateAnswer = await quizSubModel.updateOne(
                        { "ansList.set_question_id": question_id },
                        { $set: { "ansList.$.answer": answer } }
                    );
                    return sendResponse(res, HTTP_STATUS.OK, "Answer has been updated", findSubmission);
                }
                findSubmission.ansList.push({ set_question_id, answer });
                await findSubmission.save();
                return sendResponse(res, HTTP_STATUS.OK, "Answer has been submitted", findSubmission);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Quiz does not exist!");
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async submitQuizGetMarks(req: CustomRequest, res: Response): Promise<void> {
        try {
            let flag = false;
            let marks = 0;
            const { course_id, quiz_id } = req.body;
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Quiz couldn't be submitted!", validation);
            }
            const findSubmission = await getAll.getOneQuizSubmission(req.userId, course_id, quiz_id);
            const findQuiz = await getAll.getOneQuiz(req, quiz_id);
            findQuiz.questions.map((quiz) => {
                findSubmission.ansList.map((submit) => {
                    if (submit.set_question_id.toString() == quiz._id.toString()) {
                        console.log("submit.set_question_id:", submit.set_question_id);
                        console.log("quiz._id:", quiz._id);
                        flag = true;
                        console.log(flag);
                    }
                })
            })
            if (flag) {
                // findQuiz.questions.map((option) => option.options.map((subAnswer => {
                //     findSubmission.ansList.map((submit) => submit.answer.map((ans) => {
                //         if (ans.set_answer_id.toString() == subAnswer._id.toString()) {
                //             marks++;
                //             console.log(marks);
                //         }
                //     }))
                // })))
                findQuiz.questions.map((option) => {
                    option.options.map((subAnswer) => {
                        if (option.answer === subAnswer.value) {
                            findSubmission.ansList.map((submit) => submit.answer.map((ans) => {
                                if (ans.set_answer_id.toString() == subAnswer._id.toString()) {
                                    marks++;
                                    console.log(marks);
                                }
                            }))
                        }
                    })
                })
                console.log(marks)
                findSubmission.totalMarks = marks;
                findSubmission.checked = true;
                await findSubmission.save();
                return sendResponse(res, HTTP_STATUS.OK, "Submitted", findSubmission);
            }

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    // public async submissionExist(req: CustomRequest, res: Response) {
    //     try {
    //         const { quiz_id, course_id } = req.body;
    //         console.log(quiz_id);
    //         console.log(course_id);
    //         console.log(req.userId);
    //         const findSubmission = await getAll.getOneQuizSubmission(req.userId, course_id, quiz_id);
    //         console.log(findSubmission);
    //         if (findSubmission) {
    //             if (findSubmission.checked) {
    //                 return sendResponse(res, HTTP_STATUS.OK, "Already submitted the quiz", findSubmission);
    //             }
    //             return sendResponse(res, HTTP_STATUS.OK, "You haven't submitted the quiz yet!");
    //         }
    //         return sendResponse(res, HTTP_STATUS.NOT_FOUND, "You haven't attended the quiz yet!");
    //     } catch (error) {
    //         console.log(error);
    //         return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
    //     }
    // }
    public async submissionExist(req: CustomRequest, res: Response) {
        try {
            const { quiz_id, course_id } = req.body;
            console.log(quiz_id);
            console.log(course_id);
            console.log(req.userId);
            const findSubmission = await getAll.getOneQuizSubmission(req.userId, course_id, quiz_id);
            console.log(findSubmission);
            if (findSubmission) {
                if (findSubmission.checked) {
                    return sendResponse(res, HTTP_STATUS.OK, "Already submitted the quiz", findSubmission);
                }
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "You haven't submitted the quiz yet!");
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "You haven't attended the quiz yet!");
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    // public async editQuiz(req: CustomRequest, res: Response): Promise<void> {
    //     try {
    //         const { question_id, question, answer, quiz_id } = req.body;
    //         interface Fields {
    //             question?: string,
    //             answer?: string,
    //         }
    //         const fields: Fields = {};

    //         if (question) {
    //             fields.question = question;
    //         }
    //         if (answer) {
    //             fields.answer = answer;
    //         }
    //         const findQuiz = await quizModel.findById({ _id: quiz_id });
    //         if (findQuiz) {
    //             const findQuestionAndUpdate = await quizModel.findOneAndUpdate(
    //                 { "_id": quiz_id, "questions._id": question_id },
    //                 { $set: fields },
    //                 { new: true }
    //             );
    //             if (findQuestionAndUpdate) {
    //                 return sendResponse(res, HTTP_STATUS.OK, "Data updated successfully!");
    //             }
    //             return sendResponse(res, HTTP_STATUS.NOT_ACCEPTABLE, "Cpouldn't update data");
    //         }
    //         const update = await quizModel.findOneAndUpdate({ _id: question_id }, { $set: fields }, { new: true });

    //         if (update) {
    //             return sendResponse(res, HTTP_STATUS.OK, "Quiz updated successfully", update);
    //         } else {
    //             return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Quiz not found");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
    //     }
    // }
    // public async editQuiz(req: CustomRequest, res: Response): Promise<void> {
    //     try {
    //         const { questions, quiz_id } = req.body;
    //         const [{ question_id, question, answer, options }] = questions;
    //         const [{ option_id, option }] = options
    //         console.log(option_id);
    //         const updatedFields = req.body[0];
    //         const findQuestion = await quizModel.findOne({ _id: quiz_id });
    //         console.log(findQuestion);
    //         let flag = false;
    //         findQuestion.questions.map((item) => {
    //             if (item._id.toString() === question_id) {
    //                 console.log(item._id)
    //                 item.question = question

    //                 item.options.map((op) => {
    //                     if (op._id.toString() == option_id) {
    //                         op.value = option
    //                     }
    //                     if (op._id.toString() === answer.toString()) {
    //                         item.answer = op.value
    //                     }
    //                 })
    //                 flag = true;
    //             }
    //         })
    //         if (flag) {
    //             await findQuestion.save();
    //             console.log(findQuestion);
    //             return sendResponse(res, HTTP_STATUS.OK, "Updated Successfully", findQuestion);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
    //     }
    // }

    public async editQuiz(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { questions, quiz_id } = req.body;
            const [{ question_id, question, answer, options }] = questions;
            const [{ option_id, option }] = options;

            const findQuestion = await quizModel.findOne({ _id: quiz_id });
            if (!findQuestion) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Quiz not found");
            }

            let flag = false;
            findQuestion.questions.map((item) => {
                if (item._id.toString() === question_id) {
                    console.log(item._id);


                    if (question) {
                        item.question = question;
                    }

                    if (options && options.length > 0) {
                        item.options.map((op) => {
                            if (op._id.toString() === option_id) {

                                if (option) {
                                    op.value = option;
                                }
                            }
                            if (answer && op._id.toString() === answer.toString()) {
                                item.answer = op.value;
                            }
                        });
                    }
                    flag = true;
                }
            });

            if (flag) {
                await findQuestion.save();
                console.log(findQuestion);
                return sendResponse(res, HTTP_STATUS.OK, "Updated Successfully", findQuestion);
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async deleteQuestion(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { quiz_id, questions } = req.body;
            const [{ question_id }] = questions;
            let flag = false;
            const findQuiz = await quizModel.findById({ _id: quiz_id });
            if (findQuiz) {
                const index = findQuiz.questions.findIndex((item) => item._id.toString() === question_id.toString());
                console.log(index);
                findQuiz.questions.splice(index, 1);
                flag = true;
            }
            if (flag) {
                if (findQuiz.questions.length <= 0) {
                    findQuiz.isDeleted = true;
                    await findQuiz.save();
                    return sendResponse(res, HTTP_STATUS.OK, "The Quiz has been deleted!");
                }
                await findQuiz.save();
                return sendResponse(res, HTTP_STATUS.OK, "Question has been deleted successfully", findQuiz);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Quiz not found!");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async deleteQuiz(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { quiz_id, course_id } = req.body;
            const findQuiz = await quizModel.findOne({ $and: [{ set_course_id: course_id }, { _id: quiz_id }] });
            if (!findQuiz.isDeleted) {
                findQuiz.isDeleted = true;
                await findQuiz.save();
                return sendResponse(res, HTTP_STATUS.OK, "Quiz has been deleted");
            }
            else {
                return sendResponse(res, HTTP_STATUS.OK, "This quiz was previously diabled by you!");
            }

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    public async getAllQuiz(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { course_id, section_id } = req.body;
            const findQuiz = await quizModel.find({ $and: [{ set_course_id: course_id }, { set_section_id: section_id }, { isDeleted: false }] });
            if (findQuiz.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Quiz found", findQuiz);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Quiz haven't been created");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }


}
export default new Quiz;