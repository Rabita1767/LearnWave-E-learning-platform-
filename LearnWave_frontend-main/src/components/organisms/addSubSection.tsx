import { useParams } from "react-router-dom";
import { useState } from "react";
import 'react-modern-drawer/dist/index.css'
import SideBar from "../molecules/sideBar";
import Button from "../atoms/button";
import QuizModal from "../molecules/quizModal";
import { instructorService } from "../../api/instructorService";
const AddSubSection = () => {

    const { sectionId, courseId } = useParams();
    const [video, setVideo] = useState();
    const [title, setTitle] = useState();
    console.log(video);
    console.log(title);
    const uploadVideo = () => {
        const formData = new FormData();
        console.log(title);
        formData.append("file", video);
        formData.append("section_id", sectionId);
        formData.append("course_id", courseId);
        formData.append("title", title);
        const uploadVideo = async () => {
            try {
                const response = await instructorService.uploadVideo(formData);
                console.log(response.data);

            } catch (error) {
                console.log(error);
            }
        }
        uploadVideo();
    }
    return (
        <>
            <div className="flex flex-row h-screen w-screen overflow-hidden]">
                <SideBar />
                <div className="flex-1 space-y-10 flex-col items-center mt-[80px] shadow-lg">
                    <div className="h-[70%] w-[90%] border border-2 ml-[70px] flex flex-row space-x-4 px-10 pt-6 pb-8">
                        flag
                        <div className="flex-1 h-full border border-2 flex flex-col space-y-8 px-10">
                            <div>Image</div>
                            <div>
                                <div>
                                    <input type="file" onChange={e => setVideo(e.target.files[0])} />
                                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                                    <div className="mt-4">
                                        <Button children="Upload" className="w-40 h-[60px] p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight  ml-auto" onClick={uploadVideo} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 h-full border border-2">Div2</div>
                        <div className="flex-1 h-full border border-2">Div3</div>
                    </div>
                    <div className="h-[15%] w-[90%] border border-2 ml-[70px] flex space-x-4 px-10 py-6">
                        <QuizModal />
                    </div>

                </div>

            </div>
        </>
    )
}

export default AddSubSection