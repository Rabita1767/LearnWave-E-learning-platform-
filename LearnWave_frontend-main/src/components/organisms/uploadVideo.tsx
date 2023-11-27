import { useParams } from "react-router-dom";
import { useState } from "react";
import TextField from "../atoms/textField";
import SideBar from "../molecules/sideBar";
import { instructorService } from "../../api/instructorService";
import { IoCloudUploadSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadVideo: React.FC = () => {
    const navigate = useNavigate();
    const [video, setVideo] = useState()
    const { sectionId, courseId } = useParams();
    const [title, setTitle] = useState();
    const handleVideo = (e) => {
        console.log(video);
        const formData = new FormData();
        formData.append("file", video);
        formData.append("section_id", sectionId);
        formData.append("course_id", courseId);
        formData.append("title", title);
        const uploadVideo = async (formData) => {
            try {
                const response = await instructorService.uploadVideo(formData);
                console.log(response.data);
                if (response.data.success) {
                    toast(response.data.message)
                    navigate(`/addCourse/${courseId}`);
                }
                else {
                    toast(response.data.message)
                }

            } catch (error) {
                console.log(error);
                toast.error("Video couldn't be uploaded!");
            }
        }
        uploadVideo(formData);

    }
    return (
        <>
            <div className="flex flex-row h-screen w-screen">
                <SideBar />
                <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[70px] overflow-x-hidden">
                    <div className="h-[90%] w-[90%] border border-2 ml-[70px] flex flex-col space-x-4 px-10 pt-6 pb-8">
                        <div className="text-center pt-[15px] pb-[30px]">
                            <TextField children="Upload a Thumbnail" className="text-[34px] font-[700] text-[#0C0531]" />
                        </div>
                        <div className="text-center pb-[20px]">
                            <TextField children="Upload a video for your section" className="text-[20px] opacity-90" />
                        </div>
                        <div className="text-center pt-[10px] pb-[30px]">
                            <TextField children="Enter Title for your video" className="text-[22px] font-[700] text-[#0C0531] pb-[20px]" />
                            <input type="text" name="title" value={title} className="w-[320px]" onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="text-center pb-[30px] mb-[40px]">
                            <div className="flex items-center justify-center">
                                <IoCloudUploadSharp className="text-[180px] text-[#0C0531]" />
                            </div>
                            <input type="file" id="file" className="hidden" onChange={e => setVideo(e.target.files[0])} />
                            <div className="mt-[30px] mr-[10px]">
                                <label htmlFor="file" className="bg-[#0C0531] text-[20px] text-white py-4 px-4 ml-[2px] rounded cursor-pointer">Choose a Video file</label>
                            </div>
                            <div className="flex items-center justify-center">
                                <Button children="Upload" onClick={handleVideo} className="h-[50px] w-[280px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-white text-customFont font-customWeight" />
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

export default UploadVideo;