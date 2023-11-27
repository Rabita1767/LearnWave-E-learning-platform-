import { useState } from "react";
import { useParams } from "react-router-dom";
import { Modal } from 'flowbite-react';
import { quizService } from "../../api/quizService";
import Button from "../atoms/button";
const QuizModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const { courseId, sectionId } = useParams();
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
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        addQuiz();
    }

    return (
        <>
            <Button text="Quiz" onClick={() => setOpenModal(true)} className="h-[50px] w-[380px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" />
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
        </>
    );
}
export default QuizModal;