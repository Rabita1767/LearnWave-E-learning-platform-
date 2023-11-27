"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentVerificationSchema = new mongoose_1.default.Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
});
const StudentVerification = mongoose_1.default.model("StudentVerification", studentVerificationSchema);
// module.exports = Student;
exports.default = StudentVerification;
//# sourceMappingURL=studentVerification.js.map