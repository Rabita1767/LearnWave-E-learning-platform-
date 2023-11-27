import mongoose, { Document } from "mongoose";
interface ISubcription extends Document {
    cart_id: mongoose.Types.ObjectId,
    student_id?: mongoose.Types.ObjectId,
    course_id: mongoose.Types.ObjectId[],
    status: boolean
}
const subscriptionSchema = new mongoose.Schema<ISubcription>({
    cart_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    },
    student_id:
    {
        type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false
    },
    course_id:
    {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Course"
    },

    status: { type: Boolean, default: false },
}, { timestamps: true })
const Subscription = mongoose.model<ISubcription>("Subscription", subscriptionSchema);
export default Subscription