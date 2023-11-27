import mongoose, { Document } from "mongoose";

interface ISubmission extends Document {
    set_course_id: mongoose.Types.ObjectId,
    student_id: mongoose.Types.ObjectId,
    assignment_id: mongoose.Types.ObjectId,
    assignmentURL: string,
    score: number,
    checked: boolean
}
const assignmentSubmissionSchema = new mongoose.Schema<ISubmission>({
    set_course_id:
    {
        type: mongoose.Schema.Types.ObjectId,
    },
    student_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    assignment_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
    },
    assignmentURL:
    {
        type: String
    },
    score:
    {
        type: Number,
    },
    checked:
    {
        type: Boolean,
        default: false
    }

}
)

const assignmentSubmission = mongoose.model<ISubmission>("assignmentSubmission", assignmentSubmissionSchema);
export default assignmentSubmission;

