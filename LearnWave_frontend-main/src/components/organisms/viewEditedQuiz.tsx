import { useParams } from "react-router-dom"
import { quizService } from "../../api/quizService";
import { Data, QuizData } from "../../interfaces/quiz";
import { useState, useEffect } from "react";
interface IQData {
    Qloading: boolean,
    Qdata: QuizData,
    errorMsg: string
}
const ViewEditedQuiz: React.FC = () => {
    const { courseId, quizId } = useParams();
    const [quizState, setQuizState] = useState<IQData>({
        Qloading: false,
        Qdata: {} as QuizData,
        errorMsg: ""
    })

    const Qdata =
    {
        quiz_id: quizId
    }
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await quizService.fetchQuiz(Qdata);
                if (response.data.success) {
                    setQuizState({ ...quizState, Qloading: false, Qdata: response.data.data });
                }
                console.log(response.data);

            } catch (error) {

            }
        }
        fetchQuizData();


    }, [])
    return (
        <>
            <div className="w-[80%] mx-auto border-2 border-gray-500 border-opacity-40 rounded-lg pt-8">
                <h1 className="pl-8 text-center mx-auto w-full"><p className="text-[30px]">Quiz</p></h1>
                {quizState.Qdata.questions?.map((item) => (
                    <div className="w-[98%] mx-auto border-2 border-gray-500 border-opacity-40 rounded-lg mt-4 pl-4 pt-4">
                        <p className="font-[500] text-[22px]">{item.question}</p>
                        {item.options?.map((op) => (
                            <div className="p-2">
                                <input type="radio" id="option1" name="quizOptions"></input>
                                <label htmlFor="option2" className="ml-2">{op.value}</label>
                            </div>
                        ))}
                        <p className="font-[500] text-[22px]">{item.answer}</p>
                    </div>
                ))}
            </div>

        </>
    )
}

export default ViewEditedQuiz