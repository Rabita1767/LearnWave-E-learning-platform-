import mongoose, { Document } from "mongoose";
interface IAssignment extends Document {
    set_course_id: mongoose.Types.ObjectId
    set_section_id: mongoose.Types.ObjectId,
    title: string,
    question: string,
    answer?: string,
    isDisbled: boolean
}
const assignmentSchema = new mongoose.Schema<IAssignment>({
    set_course_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    set_section_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    },
    title:
    {
        type: String,
        required: true,
    },
    question:
    {
        type: String,
        required: true,
        default: "none"
    },
    answer:
    {
        type: String,
    },
    isDisbled:
    {
        type: Boolean,
        default: false
    }

}
)

const Assignment = mongoose.model<IAssignment>("Assignment", assignmentSchema);
export default Assignment;

