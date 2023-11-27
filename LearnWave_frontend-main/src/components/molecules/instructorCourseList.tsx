import ImageComponent from "../atoms/imageAtom";
import TextField from "../atoms/textField";
import img from "../../assets/Rectangle 6.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInstructorHook from "../../hooks/instructorHook";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { courseService } from "../../api/courseService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const InstructorCourseList: React.FC = () => {
    const { state, deleteFlag, deleteCourse } = useInstructorHook();
    const navigate = useNavigate();

    const handleEdit = (courseId: any) => {
        navigate(`/addCourse/${courseId}`)
        console.log("edit clicked");
    }
    const handleDelete = (courseId: any) => {
        console.log("delete clicked");
        const data = {
            course_id: courseId
        }
        deleteCourse(data);
    }
    console.log(state);
    return (
        <>
            <div className="flex ml-20 space-x-4">
                <div className="w-3/4 mt-[60px]">
                    <div><TextField className="text-[35px] font-[600] text-[#2D2F31] cursor-pointer mx-auto" children="All Courses Created by You" /></div>
                    {state.data.map((item) => (
                        <div key={item._id} className="flex space-x-8 mt-8 mb-8 border-t-[2px] pt-6 border-[#2D2F31] border-opacity-30">
                            <div>
                                <ImageComponent src={img} className="w-[180px] h-[90px] object-cover pt-4 border-rounded" />
                            </div>
                            <div className="w-full space-y-4">
                                <TextField className="text-[20px] font-[600] opacity-80 mt-2 cursor-pointer hover:text-purple-700" children={item.title} />
                                <TextField className="text-[18px] font-[500] opacity-75 mt-[2px]" children={item.description} />
                                <TextField className="text-[18px] font-[500] opacity-75 mt-[2px]" children={item.category} />
                                <TextField className="text-[18px] font-[600] opacity-100 mt-[2px]" children={item.isApproved ? "Accepted" : "Pending"}
                                />
                            </div>
                            <div>
                                <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleEdit(item._id)}><FaRegEdit /></p>
                            </div>
                            <div>
                                <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleDelete(item._id)}><MdDelete /></p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default InstructorCourseList;