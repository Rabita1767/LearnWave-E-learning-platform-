import Layout from "../templates/layout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { studentService } from "../../api/studentService";
import { AData } from "../../interfaces/assignment";
import { IoCloudUploadSharp } from "react-icons/io5";
import { CData } from "../../interfaces/course";
import Button from "../atoms/button";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { instructorService } from "../../api/instructorService";
import PageLoader from "../molecules/pageLoader";
const Assignment: React.FC = () => {
    const navigate = useNavigate()
    const { assignmentId, courseId } = useParams();
    const [getAssignment, setGetAssignment] = useState({
        loading: false,
        data: {} as AData
    })
    const [assignment, setAssignment] = useState()
    console.log(assignmentId);
    useEffect(() => {
        const data =
        {
            assignment_id: assignmentId
        }
        setGetAssignment({ ...getAssignment, loading: true })
        const fetchAssignment = async () => {
            try {
                const response = await studentService.getAssignmentById(data);
                console.log(response.data);
                setGetAssignment({ ...getAssignment, loading: false, data: response.data.data })

            } catch (error) {
                console.log(error);
            }
        }
        fetchAssignment();


    }, [])
    const handleAssignment = (assignmentId) => {
        console.log("video")
        console.log(assignment);
        const formData = new FormData();
        formData.append("file", assignment);
        formData.append("course_id", courseId);
        formData.append("assignment_id", assignmentId);
        const uploadAssignment = async (formData) => {
            try {
                const response = await instructorService.uploadAssignment(formData);
                console.log(response.data);
                if (response.data.success) {
                    toast(response.data.message)
                    navigate("/");
                }
                else {
                    toast(response.data.message)
                }

            } catch (error) {
                console.log(error);
                toast.error("Video couldn't be uploaded!");
            }
        }
        uploadAssignment(formData);
    }


    return (
        <div>
            {getAssignment.loading ? (
                <div className="flex items-center justify-center h-screen">
                    <PageLoader />
                </div>
            ) : (
                <div>
                    <Layout>
                        <div className="w-3/4 ml-[140px]">
                            <div><p className="text-[32px] font-[500] text-[#2D2F31] cursor-pointer">Assignment</p ></div >
                            <div className="flex space-x-8 mt-8 mb-8 border-t-[2px] pt-6 border-[#2D2F31] border-opacity-30">
                                <div className="w-full">
                                    <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700">{getAssignment.data.title}</p>
                                    <p className="text-[18px] font-[500] opacity-75 mt-[2px]">{getAssignment.data.question}</p>
                                </div>
                                <div>
                                    <div className="text-center pb-[30px] mb-[40px]">
                                        <div className="flex items-center justify-center">
                                            <IoCloudUploadSharp className="text-[100px] text-[#0C0531]" />
                                        </div>
                                        <input type="file" id="file" className="hidden" onChange={e => setAssignment(e.target.files[0])} />
                                        <div className="mt-[30px] mr-[10px]">
                                            <label htmlFor="file" className="bg-[#0C0531] text-[20px] text-white py-4 px-4 ml-[2px] rounded cursor-pointer">Choose a PDF file</label>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Button children="Upload" onClick={() => handleAssignment(getAssignment.data._id)} className="h-[50px] w-[280px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-white text-customFont font-customWeight" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Layout>
                </div>
            )}

        </div>
    )
}

export default Assignment;