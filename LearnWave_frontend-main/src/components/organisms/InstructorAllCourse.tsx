import useInstructorHook from "../../hooks/instructorHook";
import SideBar from "../molecules/sideBar";
import TextField from "../atoms/textField";
import ImageComponent from "../atoms/imageAtom";
import img from "../../assets/Rectangle 6.png"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PageLoader from "../molecules/pageLoader";
const InstructorAllCourse = () => {
    const navigate = useNavigate();
    const { state, deleteFlag, deleteCourse } = useInstructorHook();
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
    return (<>
        {
            state.loading ? (
                <div className="flex items-center justify-center h-screen">
                    <PageLoader />
                </div>
            ) : (
                < div className="flex flex-row h-screen w-screen" >
                    <SideBar />
                    <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[80px] overflow-x-hidden">
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
                    </div>


                </div >


            )
        }
    </>
    )
}

export default InstructorAllCourse