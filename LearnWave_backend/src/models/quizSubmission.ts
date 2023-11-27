import mongoose, { Document } from "mongoose";
interface IAnswer {
    set_question_id: mongoose.Types.ObjectId,
    answer: IOption[],
}
interface IOption {
    set_answer_id: mongoose.Types.ObjectId,
    value: string,
}
interface IQSubmission extends Document {
    student_id: mongoose.Types.ObjectId,
    course_id: mongoose.Types.ObjectId,
    quiz_id: mongoose.Types.ObjectId,
    ansList: IAnswer[],
    totalMarks: number,
    checked: boolean
}
const quiztSubmissionSchema = new mongoose.Schema<IQSubmission>({
    student_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    course_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    quiz_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    ansList:
        [
            {
                set_question_id:
                {
                    type: mongoose.Schema.Types.ObjectId,

                },
                answer:
                    [
                        {
                            set_answer_id:
                            {
                                type: mongoose.Schema.Types.ObjectId
                            },
                            value:
                            {
                                type: String
                            }
                        }
                    ]
            }
        ],
    totalMarks:
    {
        type: Number
    },
    checked:
    {
        type: Boolean,
        default: false
    }

}
)

const quizSubmission = mongoose.model<IQSubmission>("quizSubmission", quiztSubmissionSchema);
export default quizSubmission;

