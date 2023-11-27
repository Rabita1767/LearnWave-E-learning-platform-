import { useParams } from 'react-router-dom';
import { adminService } from '../../api/adminService';
import { Data } from '../../interfaces/instructor';
import { useState, useEffect } from "react";
import { CData } from '../../interfaces/course';
import { useNavigate } from 'react-router-dom';
const ViewInstructor: React.FC = () => {
    const { instructorId, courseId } = useParams();
    const navigate = useNavigate();
    console.log(instructorId)
    interface IState {
        loading: boolean,
        data: Data
    }
    const [state, setState] = useState<IState>({
        loading: false,
        data: {} as Data,
    })
    interface ICourse {
        loading: boolean,
        data: CData
    }
    const [course, setCourse] = useState<ICourse>({
        loading: false,
        data: {} as CData,
    })
    useEffect(() => {
        const data =
        {
            instructor_id: instructorId
        }
        setState({ ...state, loading: true })
        const fetchData = async () => {
            try {
                const response = await adminService.getInstructor(data);
                console.log(response.data);
                if (response.data.success) {
                    setState({ ...state, loading: false, data: response.data.data });
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, [])

    useEffect(() => {
        const data =
        {
            course_id: courseId
        }
        setCourse({ ...course, loading: true })
        const fetchData = async () => {
            try {
                const response = await adminService.getCourseById(data);
                console.log(response.data);
                if (response.data.success) {
                    setCourse({ ...course, loading: false, data: response.data.data });
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, [])
    const handleAccept = () => {
        console.log("accept");
        const data =
        {
            course_id: courseId
        }
        const fetchData = async () => {
            try {
                const response = await adminService.acceptCourse(data);
                console.log(response.data);
                if (response.data.success) {
                    navigate("/admin");
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }
    const handleReject = () => {
        console.log("reject");
        const data =
        {
            course_id: courseId
        }
        const fetchData = async () => {
            try {
                const response = await adminService.rejectCourse(data);
                console.log(response.data);
                if (response.data.success) {
                    navigate("/admin");
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }
    return (
        <>
            <div className="flex justify-center mt-[2px]">
                <table className="table-auto border-collapse border border-gray-800">
                    <thead>
                        <tr>
                            <th className="bg-gray-800 border text-white py-2 px-4">Instructor Name</th>
                            <th className="py-2 px-4">{state.data.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="bg-gray-800 text-white border py-2 px-[160px]">UserName</td>
                            <td className="border py-2 px-[160px]">{state.data.userName}</td>
                        </tr>
                        <tr>
                            <td className="bg-gray-800 text-white border py-2 px-[160px]">Email</td>
                            <td className="border py-2 px-[160px]">{state.data.email}</td>
                        </tr>
                        <tr>
                            <td className="bg-gray-800 text-white border py-2 px-[160px]">Phone Number</td>
                            <td className="border py-2 px-[160px]">{state.data.phoneNumber}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-[100px]">
                <table className="table-auto border-collapse border border-gray-800">
                    <thead>
                        <tr>
                            <th className="bg-gray-800 border text-white py-2 px-4">Course Title</th>
                            <th className="py-2 px-4">{course.data.title}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="bg-gray-800 text-white border py-2 px-[120px]">Description</td>
                            <td className="border py-2 px-[160px]">{course.data.description}</td>
                        </tr>
                        <tr>
                            <td className="bg-gray-800 w-[150px] text-white border py-2 px-[120px]">Category</td>
                            <td className="border py-2 w-[150px] px-[160px]">{course.data.category}</td>
                        </tr>
                        <tr>
                            <td className="bg-gray-800 text-white border py-2 px-[120px]">Phone Number</td>
                            <td className="border py-2 px-[160px]">{state.data.phoneNumber}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAccept}>Accept</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleReject}>Reject</button>
            </div>
        </>
    )
}

export default ViewInstructor