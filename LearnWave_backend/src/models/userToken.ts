import mongoose, { Document } from "mongoose";
interface Itoken extends Document {
    userId: mongoose.Types.ObjectId,
    token: string,
    createdAt: Date
}
const userTokenSchema = new mongoose.Schema<Itoken>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token:
    {
        type: String,
        required: true,
    },
    createdAt:
    {
        type: Date,
        default: Date.now,
        expires: 30 * 86400
    }

})

const userToken = mongoose.model<Itoken>("userToken", userTokenSchema);
export default userToken;