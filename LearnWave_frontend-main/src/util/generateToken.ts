import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import sendResponse from "./common";
import tokenModel from "../interfaces/userToken";
import HTTP_STATUS from "../lib/constants/statusCode";
import dotenv from "dotenv";
dotenv.config();
class utilFunc {
    public async generateToken(Userexist: any): Promise<{ accessToken: string, refreshToken: string }> {
        try {
            const accessToken = jwt.sign({ email: Userexist.email, id: Userexist._id, role: Userexist.role, superAdmin: Userexist.superAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
            const refreshToken = jwt.sign({ email: Userexist.email, id: Userexist._id, role: Userexist.role, superAdmin: Userexist.superAdmin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
            const findToken = await tokenModel.findOne({ userId: Userexist._id })
            console.log(findToken)
            if (findToken) {
                await tokenModel.deleteOne({ userId: Userexist._id });
            }
            const newToken = new tokenModel({
                userId: Userexist._id,
                token: refreshToken
            })
            await newToken.save();
            return { accessToken, refreshToken };
        } catch (error) {
            console.log('Error in generateToken:', error);
            return error;
        }
    }
    async verifyRefreshToken(refreshToken, res: Response): Promise<{ userInfo: any } | void> {
        try {
            const findRefreshToken = await tokenModel.findOne({ token: refreshToken })
            if (!findRefreshToken) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Invalid Refresh token!");
            }
            let userInfo = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            // req.userId = userInfo.userId;
            // req.token = userInfo.token;
            return { userInfo };
        } catch (error) {
            console.log(error);

        }
    }

}
export default new utilFunc;