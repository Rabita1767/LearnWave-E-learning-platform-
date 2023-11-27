import mongoose, { Document } from "mongoose";
// interface ICourse {

//     course_id: mongoose.Types.ObjectId,
//     isAccepted?: boolean
// }
interface ITransaction extends Document {
    // student_id: mongoose.Types.ObjectId,
    // cart_id: mongoose.Types.ObjectId,
    // course: ICourse[],
    // status: boolean
    student_id: mongoose.Types.ObjectId,
    cart_id: mongoose.Types.ObjectId,
    course_id: mongoose.Types.ObjectId,
    isAccepted: boolean
}
const transactionSchema = new mongoose.Schema<ITransaction>({
    // student_id:
    // {
    //     type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false
    // },
    // cart_id:
    // {
    //     type: mongoose.Schema.Types.ObjectId
    // },
    // course:
    //     [
    //         {
    //             course_id:
    //             {
    //                 type: mongoose.Schema.Types.ObjectId,
    //                 ref: "Course"
    //             },
    //             isAccepted:
    //             {
    //                 type: Boolean,
    //                 default: false
    //             }
    //         }

    //     ],
    // status: { type: Boolean, default: false },
    student_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    cart_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    course_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    isAccepted:
    {
        type: Boolean
    }

}, { timestamps: true })
const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);
export default Transaction