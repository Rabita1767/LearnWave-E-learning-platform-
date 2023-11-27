import mongoose, { Document } from "mongoose";
interface ISubSection extends Document {
    set_course_id: mongoose.Types.ObjectId,
    set_section_id: mongoose.Types.ObjectId,
    video: string,
    video_title: string,
    videoUrl: string,
    resource: string,
    quiz: mongoose.Types.ObjectId,
    assignment: mongoose.Types.ObjectId,
    isDisabled: boolean,
    videoCompleted: boolean
}
const subSectionSchema = new mongoose.Schema<ISubSection>({
    set_course_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    set_section_id:
    {
        type: mongoose.Schema.Types.ObjectId,
    },
    video:
    {
        type: String
    },
    video_title:
    {
        type: String
    },
    videoUrl:
    {
        type: String
    },
    resource:
    {
        type: String
    },
    quiz:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
    },
    assignment:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
    },
    isDisabled:
    {
        type: Boolean,
        default: false
    },
    videoCompleted:
    {
        type: Boolean,
        default: false
    }

}, { timestamps: true }
)

const SubSection = mongoose.model<ISubSection>("SubSection", subSectionSchema);
export default SubSection;
