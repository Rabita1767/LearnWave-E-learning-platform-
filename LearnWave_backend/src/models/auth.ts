import mongoose, { Document } from "mongoose";
interface IAuth extends Document {
    fname: string;
    lname: string;
    name?: string,
    userName: string;
    email: string;
    phoneNumber: number;
    role?: number[];
    student_id: mongoose.Types.ObjectId;
    instructor_id: mongoose.Types.ObjectId,
    isDeletedStudent: boolean,
    isDeletedInstructor: boolean,
    token: string,
    tokenCreatedAt: Date,
}
const authSchema = new mongoose.Schema<IAuth>({
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
        required: false
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber:
    {
        type: Number,
        required: true
    },
    role:
    {
        type: [Number],
        required: false,
    },
    student_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    instructor_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor"
    },
    isDeletedInstructor: {
        type: Boolean,
        default: false,
    },
    isDeletedStudent: {
        type: Boolean,
        default: false,
    },
    token:
    {
        type: String,

    },
    tokenCreatedAt:
    {
        type: Date,
        default: Date.now,
        expires: 30 * 86400
    }

}, { timestamps: true }
)

const Auth = mongoose.model<IAuth>("Auth", authSchema);

export default Auth;
