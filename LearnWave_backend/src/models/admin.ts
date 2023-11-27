import mongoose, { Document } from "mongoose";
interface IAdmin extends Document {
    fname: string;
    lname: string;
    name?: string,
    userName: string;
    email: string;
    password: string,
    phoneNumber: number;
    role?: number;
    isSuper: boolean;
    timestamp?: Date;
}
const adminSchema = new mongoose.Schema<IAdmin>({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password:
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
        default: 1
    },
    isSuper:
    {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }
)

const Admin = mongoose.model<IAdmin>("Admin ", adminSchema);

export default Admin;
