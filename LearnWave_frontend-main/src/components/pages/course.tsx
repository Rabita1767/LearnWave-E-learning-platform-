import SideBar from "../molecules/sideBar";
import AdminNavLinks from "../molecules/adminNavLinks";
import TextField from "../atoms/textField";
import ImageComponent from "../atoms/imageAtom";
import buttonImg from "../../assets/Layer 2.png";
import { courseService } from "../../api/courseService";
import { DataEntity } from "../../interfaces/course";
import { useState, useEffect } from "react";
import img1 from "../../assets/Rectangle 6.png";
import ratingImg from "../../assets/Group 119.png"
import Button from "../atoms/button";
import { useNavigate } from "react-router-dom";
const Course = () => {
    const navigate = useNavigate();
    interface IState {
        loading: boolean,
        data: DataEntity[]
    }
    const [state, setState] = useState<IState>({
        loading: false,
        data: [] as DataEntity[]
    })
    useEffect(() => {
        const fetchCourse = async () => {
            setState({ ...state, loading: true })
            try {
                const response = await courseService.getAllCourseAdmin();
                console.log(response.data.data);
                setState({ ...state, loading: false, data: response.data.data });
            } catch (error) {
                console.log(error);
            }

        }
        fetchCourse();

    }, [])
    const handleViewSections = (id: any) => {
        navigate(`/AdminviewAllCourse/${id}`);
    }
    return (
        <>
            <div className="flex flex-row h-screen w-screen">
                <SideBar />
                <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[5px] overflow-x-hidden">
                    <div className="grid grid-cols-3 gap-6 mx-auto px-8 mt-12 space-x-4">
                        {state.data && state.data.length > 0 && state.data.map((item, index) => (
                            <div key={index} className="bg-white rounded-[20px] overflow-hidden shadow-md">
                                <div className="m-6 rounded-[20px]">
                                    <ImageComponent src={img1} className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-4 mr-4">
                                    <div>
                                        <TextField children={item.title} className="text-customHeadingText font-customWeight text-midPTextSize mt-4 mb-2" />
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <ImageComponent src={ratingImg} className="h-5 w-20" />
                                        <TextField className="text-customPText" children={item.rating === 0 ? "No rating yet" : item.rating} />
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <div>
                                            <TextField children={item.enrollment && item.enrollment.length === 0 ? "No enrollments yet" : item.enrollment && item.enrollment.length} />
                                        </div>
                                        <div>
                                            <Button onClick={() => handleViewSections(item._id)} type="submit" className="w-10 h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" children={<ImageComponent src={buttonImg} />} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Course