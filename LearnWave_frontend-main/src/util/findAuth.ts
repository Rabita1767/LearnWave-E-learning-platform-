import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import instrucModel from "../interfaces/instructor";
import studentModel from "../interfaces/student";
import adminModel from "../interfaces/admin";
import authModel from "../interfaces/auth";
interface CustomRequest extends Request {
    userId: ObjectId;
}
class FindAuth {
    public async findInstructor(req: CustomRequest) {
        return await instrucModel.findById({ _id: req.userId });
    }
    public async findAdmin(req: CustomRequest) {
        return await adminModel.findById({ _id: req.userId });
    }
    public async findAuth(req: CustomRequest) {
        return await authModel.findOne({ $or: [{ student_id: req.userId }, { instructor_id: req.userId }] });
    }
    public async findStudent(req: CustomRequest) {
        return await studentModel.findById({ _id: req.userId });
    }


}
export default new FindAuth;