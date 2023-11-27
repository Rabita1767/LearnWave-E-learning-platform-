import mongoose, { Document } from "mongoose";
interface ISection extends Document {
    set_course_id: mongoose.Types.ObjectId,
    title: string;
    subSection: mongoose.Types.ObjectId[],
    isDisabled: boolean
}
const sectionSchema = new mongoose.Schema<ISection>({
    set_course_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    subSection:
    {
        type: [mongoose.Schema.Types.ObjectId],
    },
    // video:
    // {
    //     type: [String],
    //     default: []
    // },
    // quiz: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: "Quiz",
    // },
    // assignment: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: "Assignment",
    // },
    isDisabled:
    {
        type: Boolean,
        default: false
    }

}, { timestamps: true }
)

const Section = mongoose.model<ISection>("Section", sectionSchema);
export default Section;
