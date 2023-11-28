import { useParams } from "react-router-dom";
import { quizService } from "../../api/quizService";
import { Data, QuizData, QuestionsEntity, OptionsEntity } from "../../interfaces/quiz";
import { useState, useEffect } from "react";
import Button from "../atoms/button";
import { SubmissionQuiz, QData } from "../../interfaces/quiz";
import { useSelector } from "react-redux";
import { Modal } from 'flowbite-react';
import { useNavigate } from "react-router-dom";
interface IData {
    loading: boolean,
    data: Data,
    errorMsg: string
}
interface IQData {
    Qloading: boolean,
    Qdata: QuizData,
    errorMsg: string
}
const QuizMid = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const userRole = useSelector((state) => state.auth.role);
    const { quizId, courseId } = useParams();
    const [state, setState] = useState<IData>({
        loading: false,
        data: {} as Data,
        errorMsg: ""
    })
    const [quizState, setQuizState] = useState<IQData>({
        Qloading: false,
        Qdata: {} as QuizData,
        errorMsg: ""
    })
    const [flag, setFlag] = useState(false);
    const [checked, setChecked] = useState(false);
    interface ISubmission {
        loading: boolean,
        data: QData
    }
    const [submission, setSubmission] = useState<ISubmission>({
        loading: false,
        data: {} as QData,
    })
    const data =
    {
        quiz_id: quizId,
        course_id: courseId
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await quizService.fetchSubmission(data);
                if (response.data.success) {
                    setState({ ...state, loading: false, data: response.data.data });
                    setFlag(true);
                }
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
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
    const handleSubmitQuiz = () => {
        console.log("submit");
        const data =
        {
            course_id: courseId,
            quiz_id: quizId
        }
        console.log(data);
        const fetchData = async () => {
            setSubmission({ ...submission, loading: true })
            try {
                const response = await quizService.submitQuizGetMarks(data);
                console.log(response.data);
                if (response.data.success) {
                    setSubmission({ ...submission, loading: false, data: response.data.data });
                    setOpenModal(true)
                    console.log(response.data.data);
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }
    const handleChange = (q_id: string, o_id: string, o_value: string) => {
        console.log("clicked");
        setChecked(true);
        console.log(o_id)
        console.log(q_id)
        console.log(o_value)
        const answerData =
        {
            course_id: courseId,
            quiz_id: quizId,
            question_id: q_id,
            ansList:
                [
                    {
                        set_question_id: q_id,
                        answer:
                            [
                                {
                                    set_answer_id: o_id,
                                    value: o_value
                                }
                            ]
                    }
                ]
        }
        const setAnswer = async () => {
            try {
                const response = await quizService.submitAnswer(answerData);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        if (checked) {
            setAnswer();
        }

    }
    console.log(checked);
    console.log(quizId);
    console.log(flag);
    console.log(quizState.Qdata.questions);
    const handleModal = () => {
        setOpenModal(false);
        navigate("/");
    }
    return (
        <>
            {/* <div className={!flag ? "hidden" : "mx-[100px]"}> */}
            <div className={`flex justify-center ${!flag ? "hidden" : "mx-[100px] text-[28px] font-[500]"}`}>
                <>Already submitted the quiz</>
            </div>
            <div className={flag ? "hidden" : "w-[80%] mx-auto border-2 border-gray-500 border-opacity-40 rounded-lg pt-8"}>
                <h1 className="pl-8 text-center mx-auto w-full"><p className="text-[30px]">Quiz</p></h1>
                {quizState.Qdata.questions?.map((item) => (
                    <div className="w-[98%] mx-auto border-2 border-gray-500 border-opacity-40 rounded-lg mt-4 pl-4 pt-4">
                        <p className="font-[500] text-[22px]">{item.question}</p>
                        {item.options?.map((op) => (
                            <div className="p-2">
                                <input type="radio" id="option1" name="quizOptions" onChange={() => handleChange(item._id, op._id, op.value)}></input>
                                <label htmlFor="option2" className="ml-2">{op.value}</label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            <p className="text-[20px]">You have got :  {submission.data.totalMarks}</p>

                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleModal} className="h-[50px] w-[300px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight">
                                {"Done"}
                            </Button>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {userRole !== 1 && (
                <div className="ml-[640px] pb-[20px]">
                    <Button children="Submit" className={!flag ? "h-[50px] w-[300px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" : "hidden"} onClick={handleSubmitQuiz} />
                </div>
            )}
        </>
    )
}

export default QuizMid;