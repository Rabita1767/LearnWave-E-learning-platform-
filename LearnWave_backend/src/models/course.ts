import mongoose, { Document } from "mongoose";
interface ICourse extends Document {
    image: string,
    title: string;
    description: string;
    category: string,
    course_image: string,
    instructor: mongoose.Types.ObjectId;
    isApproved: boolean,
    isDisabled: boolean,
    section: mongoose.Types.ObjectId[],
    enrollment: mongoose.Types.ObjectId[];
    subscription: boolean,
    tag: string,
    progress: number,
    rating: number,
    reviews: mongoose.Types.ObjectId[];
}
const courseSchema = new mongoose.Schema<ICourse>({
    image:
    {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:
    {
        type: String,
        required: true,
    },
    course_image:
    {
        type: String
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: true
    },
    isApproved:
    {
        type: Boolean,
        default: false
    },
    isDisabled:
    {
        type: Boolean,
        default: false
    },
    section:
    {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Section",
        default: []
    },
    enrollment: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Student",
        required: true
    },
    tag:
    {
        type: String,
        required: true,
        default: "none"
    },
    progress:
    {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
    },
    subscription:
    {
        type: Boolean,
        default: false
    },
    reviews:
    {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Review",
        required: true
    }

}, { timestamps: true }
)

const Course = mongoose.model<ICourse>("Course", courseSchema);
// module.exports = Student;
export default Course;
