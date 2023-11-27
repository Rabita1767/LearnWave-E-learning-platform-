import { useParams } from "react-router-dom";
import { useState } from "react";
import { Modal } from "flowbite-react";
import SideBar from "../molecules/sideBar";
import TextField from "../atoms/textField";
import Button from "../atoms/button";
import { quizService } from "../../api/quizService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuiz: React.FC = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const { sectionId, courseId } = useParams();
    const [questionCount, setQuestionCount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState("");
    const handleAddQuestion = (e) => {
        e.preventDefault();
        setQuestionCount((prevCount) => prevCount + 1);
        setQuestions((prevQuestion) => [...prevQuestion, { question: "", options: ["", "", "", ""], answer: "" }])
    }
    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    }
    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestion = [...questions];
        newQuestion[questionIndex].options[optionIndex] = { value: value };
        setQuestions(newQuestion);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '' || questions.some(question => question.question.trim() === '' || question.options.some(option => option.value.trim() === '') || question.answer.trim() === '')) {
            alert('Please fill in all required fields.');
            return;
        }
        const data =
        {
            course_id: courseId,
            section_id: sectionId,
            title: title,
            questions: questions
        }
        console.log(data);
        const addQuiz = async () => {
            try {
                const response = await quizService.addQuiz(data);
                toast(response.data.message);
                if (response.data.success) {
                    navigate(`/addCourse/${courseId}`);
                }
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        addQuiz();
    }
    return (
        <>
            <div className="flex flex-row h-screen w-screen">
                <SideBar />
                <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[80px] overflow-x-hidden">
                    <div className="h-[70%] w-[90%] border border-2 ml-[70px] flex flex-col space-x-4 px-10 pt-6 pb-8">
                        <div className="text-center pt-[30px] pb-[30px]">
                            <TextField children="Add a Quiz for your lesson" className="text-[34px] font-[700] text-[#0C0531]" />
                        </div>


                        <div className="text-center pb-[30px] mb-[40px]">
                            <div>
                                <Button children="Create" className="h-[50px] w-[300px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" onClick={() => setOpenModal(true)} />
                                <Modal show={openModal} size="7xl" onClose={() => setOpenModal(false)}>
                                    <Modal.Header className="bg-[#6A6B6C] opacity-5 shadow-md p-4">
                                        {/* <div className="mx-[460px] p-2">
                        <p className="text-center text-[30px] font-[500] text-[#0C0531]">Create Your Quiz</p>
                    </div> */}
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={handleSubmit}>
                                            <div className="px-[340px] py-[20px] space-y-[30px]">

                                                <div>
                                                    <Button onClick={handleAddQuestion} children="Add Question" className="h-[60px] w-[380px] mx-[55px] p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-[24px] font-[400] hover:bg-indigo-800" />
                                                </div>
                                                <div>
                                                    <input type="text" value={title} className="h-[50px] w-[500px] p-[10px] border rounded border-indigo-600 opacity-50" placeholder="Enter Quiz Title" onChange={(e) => setTitle(e.target.value)} />
                                                </div>
                                                {questions.map((question, questionIndex) => (
                                                    <div key={questionIndex}>
                                                        <div>
                                                            <label className="text-[#6255A5] text-[23px] font-[400] w-[500px]" htmlFor={`Question ${questionIndex + 1}`}>{`Enter your question ${questionIndex + 1}`}</label>
                                                            <input type="text" value={question.question} className="h-[50px] w-[380px] w-[500px] p-[20px] border rounded border-indigo-600 opacity-50 mb-4 mt-2" onChange={(e) => handleQuestionChange(questionIndex, "question", e.target.value)} />
                                                        </div>
                                                        {question.options.map((option, optionIndex) => (
                                                            <div key={optionIndex}>
                                                                <label className="text-[22px] font-[400] text-[#0C0531]" htmlFor={`Option ${optionIndex + 1}`}>{`Option ${optionIndex + 1}`}</label>
                                                                <input type="text" value={option.value} onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)} className="h-[50px] w-[500px] mb-4 mt-2 p-[20px] border rounded border-indigo-600 opacity-50" />
                                                            </div>
                                                        ))}
                                                        <label className="text-[#6255A5] text-[23px] font-[400]" htmlFor={`Answer ${questionIndex + 1}`}>{`Answer ${questionIndex + 1}`}</label>
                                                        <input type="text" value={question.answer} className="h-[50px] w-[500px] p-[10px] border rounded border-indigo-600 opacity-50" onChange={(e) => handleQuestionChange(questionIndex, "answer", e.target.value)} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <Button className="h-[50px] w-[130px] p-2 mt-4  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-[20px] font-[400] hover:bg-indigo-800" type="submit" children="Add Quiz" />
                                            </div>
                                        </form>
                                    </Modal.Body>

                                </Modal >
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

export default AddQuiz