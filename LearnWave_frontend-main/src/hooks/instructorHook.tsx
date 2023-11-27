import { useState, useEffect } from "react";
import { courseService } from "../api/courseService";
import { instructorService } from "../api/instructorService";
import { DataEntity, CData } from "../interfaces/course";
import { Quiz, Assignment } from "../interfaces/subSection";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useInstructorHook = () => {
    interface IState {
        loading: boolean,
        data: DataEntity[],
        errorMsg: string
    }
    const [state, setState] = useState<IState>({
        loading: false,
        data: [] as DataEntity[],
        errorMsg: ""
    })
    interface ISection {
        loading: boolean,
        data: DataEntity[],
        errorMsg: string
    }
    const [subSections, setSubSection] = useState<ISection>({
        loading: false,
        data: [] as DataEntity[],
        errorMsg: ""
    })
    interface DataEntity {
        _id: string,
        quiz?: Quiz,
        assignment?: Assignment,
        videoUrl: string,
        video_title: string,
    }
    const [getOne, setGetOne] = useState({
        loading: false,
        data: {} as CData,
        errorMsg: ""
    })


    const [flag, setFlag] = useState(false);
    const [editFlag, setEditFlag] = useState(false);
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [videoDeleteFlag, setDeleteVideoFlag] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setState({ ...state, loading: true })
            try {
                const response = await courseService.getCoursesByInstructor();
                if (response.data.success) {
                    console.log(response.data.data);
                    setState({ ...state, loading: false, data: response.data.data })
                }
                console.log(response.data);

            } catch (error) {
                console.log(error);
                setState({ ...state, loading: false, errorMsg: "Something Went Wrong!" })
            }
        }
        fetchData();

    }, [deleteFlag])
    const [updateState, setUpdateState] = useState({
        loading: false,
        data: {} as CData,
    })
    const updateData = async (formData: undefined) => {
        setUpdateState({ ...updateState, loading: true })
        try {
            const response = await courseService.editCourse(formData);
            if (response.data.success) {
                setUpdateState({ ...updateState, loading: false, data: response.data.data })
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

    const addData = async (body: any) => {
        try {

            const response = await instructorService.addSection(body);
            if (response.data.success) {
                setFlag(true);
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

    const editSection = async (body: any) => {
        try {
            const response = await courseService.editSection(body);
            console.log(response.data);
            if (response.data.success) {
                setEditFlag(true);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getAllSubsection = async (data: any) => {
        setSubSection({ ...subSections, loading: true })
        try {
            const response = await instructorService.getAllVideoData(data);
            console.log(response.data);
            if (response.data.success) {
                setSubSection({ ...subSections, loading: false, data: response.data.data });
            }
        } catch (error) {
            console.log(error);
            // toast.error(`Could not fetch data.Something went wrong!`);
        }
    }
    const deleteCourse = async (data: any) => {
        try {
            const response = await courseService.deleteCourse(data);
            console.log(response.data);
            if (response.data.success) {
                toast(response.data.message);
                setDeleteFlag(true);
            }
        } catch (error) {
            console.log(error);
            toast.error("Course couldn't be deleted");
        }
    }
    const deleteVideo = async (data) => {
        try {
            const response = await instructorService.deleteVideo(data);
            console.log(response.data);
            if (response.data.success) {
                setDeleteVideoFlag(true);
                toast(response.data.success);
            }

        } catch (error) {
            console.log(error);
        }
    }








    return { state, updateData, addData, flag, editFlag, updateState, setFlag, setEditFlag, editSection, subSections, getAllSubsection, deleteCourse, deleteFlag, deleteVideo, videoDeleteFlag };

}
export default useInstructorHook;