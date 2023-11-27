import mongoose, { Document } from "mongoose";
enum StatusEnum {
    Value1 = "acceptCourseAdd",
    Value2 = "acceptSubscription",
}
interface INotification extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId[];
    courseID?: mongoose.Types.ObjectId;
    cartID?: mongoose.Types.ObjectId;
    message: string;
    forAdmin: boolean,
    notificationType: StatusEnum,
    read: boolean,
    isAccepted: boolean;
    createdAt: Date;
}
const notificationSchema = new mongoose.Schema<INotification>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    receiver: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
    },
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
    },
    message: {
        type: String,
        required: true,
    },
    forAdmin:
    {
        type: Boolean,
        default: false
    },
    notificationType:
    {
        type: String,
        enum: [StatusEnum.Value1, StatusEnum.Value2]
    },
    read:
    {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Notification = mongoose.model<INotification>("Notification", notificationSchema);
export default Notification;
