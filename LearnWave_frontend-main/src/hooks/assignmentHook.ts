import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assignmentService } from "../api/assignmentService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { quizService } from "../api/quizService";
import { DataEntity } from "../interfaces/assignment";

const useAssignmentHook = () => {
    const [deleteAssignmentState, setDeleteAssignment] = useState(false);
    const [updateAssignment, setUpdateAssignment] = useState(false);
    interface ISection {
        loading: boolean,
        data: DataEntity[],
        errorMsg: string
    }
    const [subAssignment, setSubSection] = useState<ISection>({
        loading: false,
        data: [] as DataEntity[],
        errorMsg: ""
    })
    const deleteAssignment = async (data) => {
        try {
            const response = await assignmentService.deleteAssignment(data);
            console.log(response.data);
            if (response.data.success) {
                toast(response.data.message);
                setDeleteAssignment(true);
            }
            else {
                toast(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Couldn't delete assignment!");
        }
    }
    const update = async (data) => {
        try {
            const response = await assignmentService.editAssignment(data);
            if (response.data.success) {
                setUpdateAssignment(true);
                toast(response.data.message);
            }
            else {
                toast(response.data.message);
            }
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllAssignment = async (data: any) => {
        setSubSection({ ...subAssignment, loading: true })
        try {
            const response = await assignmentService.getAllAssignment(data);
            console.log(response.data);
            if (response.data.success) {
                setSubSection({ ...subAssignment, loading: false, data: response.data.data });
            }
        } catch (error) {
            console.log(error);
            // toast.error(`Could not fetch data.Something went wrong!`);
        }
    }

    return { deleteAssignment, deleteAssignmentState, update, updateAssignment, getAllAssignment, subAssignment };
}
export default useAssignmentHook;