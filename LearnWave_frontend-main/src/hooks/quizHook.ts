import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { quizService } from "../api/quizService";
import { toast } from 'react-toastify';
import { DataEntity } from "../interfaces/quiz";
import 'react-toastify/dist/ReactToastify.css';

const useQuizHook = () => {
    const navigate = useNavigate();
    const [quizDelete, setQuizDelete] = useState(false);
    interface ISection {
        loading: boolean,
        data: DataEntity[],
        errorMsg: string
    }
    const [subQuiz, setSubSection] = useState<ISection>({
        loading: false,
        data: [] as DataEntity[],
        errorMsg: ""
    })
    const deleteQuestion = async (data: any, courseId: any) => {
        try {
            const response = await quizService.deleteQuiz(data);
            console.log(response.data);
            if (response.data.success) {
                toast(response.data.message);
                // navigate(`/subsection/${courseId}/${data.quiz_id}`);
            }
            else {
                toast(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!Try again deleting");
        }
    }
    const deleteFullQuiz = async (data: any) => {
        try {
            const response = await quizService.deleteQuizFull(data)
            console.log(response.data);
            if (response.data.success) {
                setQuizDelete(true);
                toast(response.data.message);
            }
            toast(response.data.success);

        } catch (error) {
            console.log(error);
            toast.error("Could not deleted!");
        }
    }
    const getAllQuiz = async (data: any) => {
        setSubSection({ ...subQuiz, loading: true })
        try {
            const response = await quizService.getAllQuiz(data);
            console.log(response.data);
            if (response.data.success) {
                setSubSection({ ...subQuiz, loading: false, data: response.data.data });
            }
        } catch (error) {
            console.log(error);
            // toast.error(`Could not fetch data.Something went wrong!`);
        }
    }

    return { deleteQuestion, deleteFullQuiz, quizDelete, getAllQuiz, subQuiz }
}
export default useQuizHook;