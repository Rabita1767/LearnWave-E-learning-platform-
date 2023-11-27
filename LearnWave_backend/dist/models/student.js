"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false,
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    enrolled_courses: {
        type: [mongoose_1.default.Types.ObjectId],
        ref: "Courses",
    },
    course_progress: {
        type: Number,
        default: 0,
    },
    wishlist: {
        type: [String],
        default: []
    },
    reviews: {
        type: [mongoose_1.default.Types.ObjectId],
    },
    favourite: {
        type: [mongoose_1.default.Types.ObjectId],
    },
    role: {
        type: Number,
        required: false,
        default: 2
    },
    superAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    failedLoginAttempt: {
        type: Number,
        default: 0,
        required: false
    },
    resetPassword: {
        type: Boolean || null,
        required: false,
        default: false,
    },
    resetPasswordToken: {
        type: String,
        required: false,
        default: null,
    },
    resetPasswordExpire: {
        type: Date || null,
        required: false,
        default: null
    },
    balance: { type: Number, required: true, default: 0, min: 0, max: 10000 },
    timestamp: { type: Date }
}, { timestamps: true });
const Student = mongoose_1.default.model("Student", studentSchema);
// module.exports = Student;
exports.default = Student;
//# sourceMappingURL=student.js.map