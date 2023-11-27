import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assignmentService } from "../api/assignmentService";
import { quizService } from "../api/quizService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataEntity } from "../interfaces/assignment";
import { reviewService } from "../api/reviewService";
import { useState } from "react";

const useReviewHook = () => {
    const [loading, setLoading] = useState(false);
    const add = async (data) => {
        setLoading(true);
        try {
            const response = await reviewService.addReview(data);
            console.log(response.data);
            if (response.data) {
                setLoading(false);
            }

        } catch (error) {

        }
    }

    return { add, loading };


}
export default useReviewHook;