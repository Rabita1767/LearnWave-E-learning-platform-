import mongoose, { Document } from "mongoose";
interface IQuestion {
    _id?: mongoose.Types.ObjectId;
    question: string;
    options: IOption[],
    answer: string

}
interface IOption {
    _id?: mongoose.Types.ObjectId;
    value: string
}
interface IQuiz extends Document {

    set_course_id: mongoose.Schema.Types.ObjectId,
    set_section_id: mongoose.Types.ObjectId,
    title: string,
    isDeleted: boolean,
    questions: IQuestion[]
}
const quizSchema = new mongoose.Schema<IQuiz>({


    set_course_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    set_section_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },

    title:
    {
        type: String,
        required: true,
    },
    isDeleted:
    {
        type: Boolean,
        default: false
    },
    questions:
        [
            {
                question:
                {
                    type: String,
                },
                options:
                    [
                        {
                            value:
                            {
                                type: String
                            },
                            // _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: false },

                        }
                    ],
                answer:
                {
                    type: String,
                }

            }
        ]

}
)

const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);
export default Quiz;

