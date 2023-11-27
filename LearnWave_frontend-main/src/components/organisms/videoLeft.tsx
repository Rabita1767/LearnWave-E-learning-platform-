import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import { instructorService } from "../../api/instructorService";
import { Data } from "../../interfaces/subSection";
import { subSectionData } from "../../interfaces/course";
import { useState, useEffect } from "react";
import Button from "../atoms/button";
import { courseService } from "../../api/courseService";
import Review from "./review";
import ReactStars from "react-rating-stars-component";
import TextField from "../atoms/textField";
import { useSelector } from "react-redux";

interface IData {
    loading: boolean,
    data: Data,
    errorMsg: string
}

const VideoLeft: React.FC = () => {
    const userRole = useSelector((state) => state.auth.role);
    let count = 0;
    const { subsectionId, courseId } = useParams();

    const [state, setState] = useState<IData>({
        loading: false,
        data: {} as Data,
        errorMsg: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                subsection_id: subsectionId
            };

            setState({ ...state, loading: false });

            try {
                const response = await instructorService.fetchVideoData(data);
                if (response.data.success) {
                    setState({ ...state, loading: true, data: response.data.data });
                }
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [subsectionId]);

    const handleProgress = (courseId: any, subsectionId: any) => {
        count++;
        console.log("clicked");
        console.log(count);
        const data = {
            course_id: courseId,
            subsection_id: subsectionId
        };

        const findSubsection = async () => {
            try {
                const findResponse = await courseService.findSubsection(data);
                if (!findResponse.data.data.videoCompleted) {
                    const response = await courseService.markAsCompleted(data);
                    if (response.data.success) {
                        console.log(response.data);
                    }
                } else {
                    alert("video already been marked as completed");
                }
                console.log(findResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        findSubsection();
    };

    console.log(subsectionId);
    console.log(state.data);
    console.log(state.data.videoUrl);

    return (
        <>
            {userRole === 1 ? (
                <div>
                    <div className="border-2 border-blue-700 p-[20px]">
                        <ReactPlayer url={state.data.videoUrl} controls={true} volume={1} width={1000} height={460} onEnded={() => handleProgress(courseId, subsectionId)} className="ml-[1px]" />
                    </div>
                    <div className="flex flex-row border-2 border-blue-700 mt-[40px]">
                        <div className="h-[240px] w-full">
                            <p className="text-[26px] font-[600] ml-[40px] mt-[30px]">Topic Description</p>
                            <p className="mt-[15px] text-[20px] ml-[40px]">{state.data.video_title}</p>
                        </div>

                    </div>

                </div>
            ) : (
                <div>
                    <div className="border-2 border-blue-700 p-[20px]">
                        <ReactPlayer url={state.data.videoUrl} controls={true} volume={1} width={1000} height={460} onEnded={() => handleProgress(courseId, subsectionId)} className="ml-[1px]" />
                    </div>
                    <div className="flex flex-row border-2 border-blue-700 mt-[40px]">
                        <div className="h-[240px] w-full">
                            <p className="text-[26px] font-[600] ml-[40px] mt-[30px]">Topic Description</p>
                            <p className="mt-[15px] text-[20px] ml-[40px]">{state.data.video_title}</p>
                        </div>
                        <div className={count > 0 ? "hidden" : "mr-[40px] mt-[20px]"}>
                            <Button className="mt-[15px] text-[20px] ml-[30px] h-[50px] w-[250px] p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText font-customWeight cursor-pointer" children="Mark As Completed" onClick={() => handleProgress(courseId, subsectionId)} disabled={count > 0} />
                        </div>
                    </div>
                    <Review />
                </div>
            )}
        </>
    );
};

export default VideoLeft;
