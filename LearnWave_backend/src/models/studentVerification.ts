import mongoose, { Document } from "mongoose";
interface IStudent extends Document {
    userId: mongoose.Types.ObjectId;
    otp: string,
    createdAt: Date;
    expiresAt: Date;
}
const studentVerificationSchema = new mongoose.Schema<IStudent>({
    userId: mongoose.Schema.Types.ObjectId,
    otp: String,
    createdAt: Date,
    expiresAt: Date,

})

const StudentVerification = mongoose.model<IStudent>("StudentVerification", studentVerificationSchema);
export default StudentVerification;
