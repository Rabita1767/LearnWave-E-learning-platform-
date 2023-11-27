import mongoose, { Document } from "mongoose";
interface Iinstructor extends Document {
    fname: string;
    lname: string;
    name?: string,
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    verified: boolean,
    phoneNumber: number;
    role?: number;
    failedLoginAttempt?: number;
    resetPassword?: boolean | null;
    resetPasswordToken?: string | null;
    resetPasswordExpire?: Date | null;
    timestamp?: Date;
}
const instructorSchema = new mongoose.Schema<Iinstructor>({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    name:
    {
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
    confirmPassword:
    {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
    },
    phoneNumber:
    {
        type: Number,
        required: true
    },
    role:
    {
        type: Number,
        required: false,
        default: 3
    },
    failedLoginAttempt:
    {
        type: Number,
        default: 0,
        required: false
    },
    resetPassword:
    {
        type: Boolean || null,
        required: false,
        default: false,
    },
    resetPasswordToken:
    {
        type: String,
        required: false,
        default: null,
    },
    resetPasswordExpire:
    {
        type: Date || null,
        required: false,
        default: null
    },
    timestamp: { type: Date }

}, { timestamps: true }
)

const Instructor = mongoose.model<Iinstructor>("Instructor", instructorSchema);
// module.exports = Student;
export default Instructor;
