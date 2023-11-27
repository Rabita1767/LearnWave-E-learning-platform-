"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __importDefault(require("../util/common"));
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const student_1 = __importDefault(require("../models/student"));
const studentVerification_1 = __importDefault(require("../models/studentVerification"));
class Student {
    async auth(req, res) {
        try {
            const { fname, lname, userName, email, password, confirmPassword, phoneNumber } = req.body;
            const emailExist = await student_1.default.findOne({ email: email });
            if (emailExist) {
                return (0, common_1.default)(res, statusCode_1.default.CONFLICT, "Email is already registered");
            }
            if (password != confirmPassword) {
                return (0, common_1.default)(res, statusCode_1.default.CONFLICT, "Passwords dont match!");
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const hashedConfirmPassword = await bcrypt_1.default.hash(confirmPassword, 10);
            const student = await new student_1.default({
                fname: fname, lname: lname, userName: userName, name: `${fname} ${lname}`, email: email, password: hashedPassword, confirmPassword: hashedConfirmPassword, phoneNumber: phoneNumber
            });
            await student.save();
            console.log(student._id, student.name, student.email);
            if (student) {
                this.sendVerificationMail(student._id, res);
            }
        }
        catch (error) {
            console.log(error);
            (0, common_1.default)(res, statusCode_1.default.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
    async sendVerificationMail(_id, res) {
        try {
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
            var transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rabitaamin015@gmail.com',
                    pass: 'incb efmr anwq oibk'
                }
            });
            var mailOptions = {
                from: 'rabitaamin015@gmail.com',
                to: 'begummaksuda016@gmail.com',
                subject: 'Verify your account',
                html: `<p>Hello!$<br> You requested for a verification otp, kindly use this 
                <b>${otp} </b>to verify your account.It will expire is 1 hour.`
            };
            const hashedOtp = await bcrypt_1.default.hash(otp, 10);
            const verificationAuth = await new studentVerification_1.default({
                userId: _id,
                otp: hashedOtp,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            });
            await verificationAuth.save();
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    return (0, common_1.default)(res, statusCode_1.default.OK, "Email has been sent to your account!", { userId: _id });
                }
            });
        }
        catch (error) {
            console.log(error);
            (0, common_1.default)(res, statusCode_1.default.INTERNAL_SERVER_ERROR, "Internal Server Error!");
        }
    }
}
exports.default = Student;
//# sourceMappingURL=studentController.js.map