import mongoose, { Document } from "mongoose";
interface ICourse {
    course_id: mongoose.Types.ObjectId,
    movedToCart?: boolean
}
interface IWishlist extends Document {
    student_id: mongoose.Types.ObjectId,
    // course_id: mongoose.Types.ObjectId[],
    course: ICourse[],
    isDisbled: boolean
}
const wishlistSchema = new mongoose.Schema<IWishlist>({
    student_id:
    {
        type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false
    },
    // course_id:
    // {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: "Course"
    // },
    course:
        [
            {
                course_id:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course"
                },
                movedToCart:
                {
                    type: Boolean,
                    default: false
                }
            }

        ],
    isDisbled:
    {
        type: Boolean,
        default: false
    }

}, { timestamps: true })
const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
export default Wishlist