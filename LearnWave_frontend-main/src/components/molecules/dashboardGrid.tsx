import Div from "../atoms/div";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';
import { StudentData, CourseData } from "../../interfaces/student";
import { adminService } from "../../api/adminService";
import { useState, useEffect } from "react";
interface IStudent {
    loading: boolean,
    data: StudentData
}
interface ICourse {
    loading: boolean,
    data: CourseData
}
const DashboardGrid = () => {
    const [student, setStudent] = useState<IStudent>({
        loading: false,
        data: {} as StudentData
    })
    const [course, setCourse] = useState<ICourse>({
        loading: false,
        data: {} as CourseData
    })

    useEffect(() => {
        const fetchStudent = async () => {
            setStudent({ ...student, loading: true })
            try {
                const response = await adminService.studentCount();
                console.log(response.data);
                setStudent({ ...student, loading: false, data: response.data.data })

            } catch (error) {
                console.log(error);
            }
        }
        fetchStudent();

    }, [])
    useEffect(() => {
        const fetchCourse = async () => {
            setCourse({ ...course, loading: true })
            try {
                const response = await adminService.courseCount();
                console.log(response.data);
                setCourse({ ...course, loading: false, data: response.data.data })

            } catch (error) {
                console.log(error);
            }
        }
        fetchCourse();

    }, [])
    return (
        <div className="flex gap-4 w-full p-8">
            <Div>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-indigo-600">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Students</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{student.data.total}</strong>
                    </div>
                </div>
            </Div>
            <Div>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-indigo-600">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Instructors</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">1</strong>
                    </div>
                </div>
            </Div>
            <Div>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-indigo-600">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Courses</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{course.data.total}</strong>
                    </div>
                </div>
            </Div>
            {/* <Div>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-indigo-600">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Sales</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        <span className="text-sm text-green-500 pl-2">+343</span>
                    </div>
                </div>
            </Div> */}
        </div>
    )
}

export default DashboardGrid