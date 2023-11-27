import mongoose, { Document } from "mongoose";
interface IReview extends Document {
    review?: string,
    course_id: mongoose.Types.ObjectId,
    student_id: mongoose.Types.ObjectId,
    rating: number
}
const reviewSchema = new mongoose.Schema<IReview>({
    review: { type: String, required: false, default: "none" },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    rating: { type: Number, required: true }

}, { timestamps: true }
);


const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;
