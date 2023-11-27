import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import mongoose, { Document } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import sendResponse from "../util/common";
import HTTP_STATUS from "../constants/statusCode";
import studentModel from "../models/student";
import dotenv from "dotenv";
dotenv.config();
interface IPayload extends JwtPayload {
    id: mongoose.Types.ObjectId,
    email: string,
    role: number,
    superAdmin: boolean
}
interface CustomRequest extends Request {
    userId: ObjectId;
    file: any;
    role: number;
    userRole: number
}
class authentication {
    auth(req: CustomRequest, res: Response, next) {
        try {
            let accessToken = req.headers.authorization;
            console.log(`token ${accessToken}`)
            if (accessToken) {
                accessToken = accessToken.split(" ")[1];
                let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as IPayload;
                req.userId = user.id;
                console.log(`hello ${req.userId}`);
                if (user) {
                    next()
                }
                else {
                    throw new Error();
                }
            }
            else {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized access");
            }
        } catch (error) {
            console.log(error);
            if (error instanceof jwt.JsonWebTokenError) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Token Invalid");
            }
            if (error instanceof jwt.TokenExpiredError) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Please Log in again!");
            }
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    isRole(req: CustomRequest, res: Response, next) {
        try {
            let accessToken = req.headers.authorization;
            console.log(accessToken);
            if (accessToken) {
                accessToken = accessToken.split(" ")[1];
                const decodedToken = jwt.decode(accessToken) as JwtPayload;
                if (decodedToken) {
                    req.userId = decodedToken.id;
                    req.userRole = decodedToken.role;

                    console.log(`now ${req.userRole}`)
                    if (req.userRole == 1) {
                        next();
                    }
                    else {
                        return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized Access");
                    }

                } else {
                    return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Invalid token");
                }
            } else {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized Users");
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    isStudent(req: CustomRequest, res: Response, next) {
        try {
            let accessToken = req.headers.authorization;
            console.log(accessToken);
            if (accessToken) {
                accessToken = accessToken.split(" ")[1];
                const decodedToken = jwt.decode(accessToken) as JwtPayload;
                if (decodedToken) {
                    req.userId = decodedToken.id;
                    req.userRole = decodedToken.role;

                    console.log(`now ${req.userRole}`)
                    if (req.userRole == 2) {
                        next();
                    }
                    else {
                        return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized Access");
                    }

                } else {
                    return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Invalid token");
                }
            } else {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized Users");
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    isInstructor(req: CustomRequest, res: Response, next) {
        try {
            let accessToken = req.headers.authorization;
            console.log(accessToken);
            if (accessToken) {
                accessToken = accessToken.split(" ")[1];
                const decodedToken = jwt.decode(accessToken) as JwtPayload;
                if (decodedToken) {
                    req.userId = decodedToken.id;
                    req.userRole = decodedToken.role;

                    console.log(`now ${req.userRole}`)
                    if (req.userRole == 3) {
                        next();
                    }
                    else {
                        return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized Access");
                    }

                } else {
                    return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Invalid token");
                }
            } else {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized Users");
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    isCommon(req: CustomRequest, res: Response, next) {
        try {
            let accessToken = req.headers.authorization;
            console.log(accessToken);
            if (accessToken) {
                accessToken = accessToken.split(" ")[1];
                const decodedToken = jwt.decode(accessToken) as JwtPayload;
                if (decodedToken) {
                    req.userId = decodedToken.id;
                    req.userRole = decodedToken.role;

                    console.log(`now ${req.userRole}`)
                    if (req.userRole == 2 || req.userRole == 3) {
                        next();
                    }
                    else {
                        return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized Access");
                    }

                } else {
                    return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Invalid token");
                }
            } else {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized Users");
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

    public async findStudent(req: CustomRequest, res: Response, next) {
        try {
            const isLoggedIn = await studentModel.findById({ _id: req.userId });
            if (!isLoggedIn) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Please sign up or log in!");
            }
            else {
                next();
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }

}
export default new authentication;