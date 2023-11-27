import mongoose, { Document } from "mongoose";
interface ICourse {

    course_id: mongoose.Types.ObjectId,
    isAccepted?: boolean
}
interface ICart extends Document {
    student_id: mongoose.Types.ObjectId,
    course: ICourse[],
    isDisbled: boolean,
    status: boolean
}
const cartSchema = new mongoose.Schema<ICart>({
    student_id:
    {
        type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false
    },
    course:
        [
            {
                course_id:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course"
                },
                isAccepted:
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
    },

    status: { type: Boolean, default: false },
}, { timestamps: true })
const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart