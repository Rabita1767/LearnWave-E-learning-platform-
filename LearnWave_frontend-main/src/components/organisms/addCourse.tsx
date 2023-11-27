import SideBar from "../molecules/sideBar";
import Button from "../atoms/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instructorService } from "../../api/instructorService";
import ImageComponent from "../atoms/imageAtom";
import InstructorCourseList from "../molecules/instructorCourseList";
import { courseService } from "../../api/courseService";
import { toast } from 'react-toastify';
import TextField from "../atoms/textField";
import 'react-toastify/dist/ReactToastify.css';
import PageLoader from "../molecules/pageLoader";
const AddCourse: React.FC = () => {
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const handleImage = (e) => {
        console.log(image);

        const title = localStorage.getItem("title") || "";
        const description = localStorage.getItem("description") || "";
        const category = localStorage.getItem("category") || "";
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        setLoading(true);
        const addData = async () => {
            try {
                const response = await instructorService.addCourse(formData);
                console.log(response.data.data);
                console.log(response.data.data._id)
                if (response.data.success) {
                    toast(response.data.message);
                    const data = {
                        course_id: response.data.data._id
                    }
                    const getResponse = await courseService.getCourseById(data)
                    console.log(getResponse.data);
                    if (getResponse.data.success) {
                        setLoading(false);
                        navigate("/instructor/course");
                    }
                    // navigate(`/addSection/${response.data.data._id}`)
                }
                else {
                    toast(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        addData();
    }

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <PageLoader />
                </div>
            ) : (
                <div className="flex flex-row h-screen w-screen">
                    <SideBar />
                    <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[80px] overflow-x-hidden">
                        <div className="h-[40%] w-[90%] border border-2 ml-[70px] flex flex-col space-x-4 px-10 pt-6 pb-8">
                            <div className="text-center pt-[50px] pb-[30px]">
                                <TextField children="Upload a Thumbnail" className="text-[34px] font-[700]" />
                            </div>
                            <div className="text-center pb-[40px]">
                                <TextField children="Its always good to have a thumnbnail" className="text-[20px] opacity-90" />
                                {/* <p className="text-[20px] opacity-90">Its always good to have a thumnbnail */}
                                {/* </p> */}
                            </div>
                            <div className="text-center pb-[30px]">

                                <input type="file" onChange={e => setImage(e.target.files[0])} />

                            </div>
                        </div>
                        <div className="h-[35%] w-[90%] ml-[70px] space-x-4 px-10 py-6">
                            <Button children="Create" className="w-40 h-[60px] ml-[500px] p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" onClick={handleImage} />
                            <InstructorCourseList />
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}

export default AddCourse;