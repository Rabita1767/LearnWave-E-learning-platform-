import mongoose, { Document } from "mongoose";
interface IEnrolled_course {
    course_id: mongoose.Types.ObjectId,
    progress?: number,
    total?: number,
    progress_bar?: number,
    isCompleted?: boolean
}
interface IStudent extends Document {
    fname: string;
    lname: string;
    name?: string,
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: number;
    role?: number;
    verified: boolean,
    isDeleted: boolean,
    enrolled_courses: IEnrolled_course[],
    failedLoginAttempt?: number;
    resetPassword?: boolean | null;
    resetPasswordToken?: string | null;
    resetPasswordExpire?: Date | null;
    reviews?: mongoose.Types.ObjectId[];
    order?: mongoose.Types.ObjectId[];
    cart_id: mongoose.Types.ObjectId,
    wishlist_id: mongoose.Types.ObjectId,
    timestamp?: Date;
}
const studentSchema = new mongoose.Schema<IStudent>({
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
    phoneNumber:
    {
        type: Number,
        required: true
    },
    role:
    {
        type: Number,
        required: false,
        default: 2
    },
    verified: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    enrolled_courses:
        [
            {
                course_id:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course"
                },
                progress:
                {
                    type: Number,
                    default: 0
                },
                total:
                {
                    type: Number,

                },
                progress_bar:
                {
                    type: Number,
                    default: 0
                },
                isCompleted:
                {
                    type: Boolean,
                    default: false
                }
            }
        ],
    reviews:
    {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: "Review",
        default: []
    },
    order:
    {
        type: [mongoose.Types.ObjectId],
        ref: "Subscription",
        required: false,
        default: [],
    },
    failedLoginAttempt:
    {
        type: Number,
        default: 0,
        required: false,
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
    cart_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    wishlist_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    timestamp: { type: Date }

}, { timestamps: true }
)

const Student = mongoose.model<IStudent>("Student", studentSchema);
export default Student;

