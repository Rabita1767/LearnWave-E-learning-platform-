import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import { ObjectId } from 'mongodb';
interface CustomRequest extends Request {
    userId: ObjectId;
    file: any;
    role: number,
    userRole: number
}
export default CustomRequest;