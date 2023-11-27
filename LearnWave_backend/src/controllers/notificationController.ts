import mongoose, { Document } from "mongoose";
import { Request, Response } from "express";
import CustomRequest from "../util/interface";
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
class Notification {
    public async getSubscriptionNotification(req: CustomRequest, res: Response): Promise<void> {
        try {
            const findSubscriptionNotification = await notificationModel.find({ $and: [{ read: false }, { forAdmin: true }, { notificationType: "acceptSubscription" }] });
            if (findSubscriptionNotification.length > 0) {
                return sendResponse(res, HTTP_STATUS.OK, "Notification fetched Successfully", findSubscriptionNotification);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No notification found");

        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
}
export default new Notification;