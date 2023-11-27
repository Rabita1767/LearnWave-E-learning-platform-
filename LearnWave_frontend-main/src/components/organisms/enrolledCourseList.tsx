import { useState, useEffect } from "react";
import { courseService } from "../../api/courseService";
import { EnrolledCoursesEntity, CourseId, IState } from "../../interfaces/course";
import Button from "../atoms/button";
import ImageComponent from "../atoms/imageAtom";
import img1 from "../../assets/Rectangle 6.png";
import TextField from "../atoms/textField";
import ratingImg from "../../assets/Group 119.png";
import { Progress } from 'flowbite-react';
import buttonImg from "../../assets/Layer 2.png";
import { useNavigate } from "react-router-dom";
const EnrolledCourseList: React.FC = () => {
    const navigate = useNavigate();
    const [state, setState] = useState<IState>({
        loading: false,
        data: [] as EnrolledCoursesEntity[],
        errorMsg: ""
    })
    useEffect(() => {
        const enrolledCourses = async () => {
            setState({ ...state, loading: true })
            try {
                const response = await courseService.getEnrolledCourse();
                if (response.data.success) {
                    console.log(response.data.data.enrolled_courses
                    );
                    setState({ ...state, loading: false, data: response.data.data.enrolled_courses })
                }
                console.log(response.data);

            } catch (error) {
                console.log(error);
            }

        }
        enrolledCourses();

    }, [])
    console.log(state.data);
    const handleViewSections = (id: any) => {
        navigate(`/viewAllCourse/${id}`);
    }
    return (
        <>
            <div className="grid grid-cols-3 gap-6 mx-auto px-[50px] space-x-4 mt-[4px]">
                {state.data.map((item) => (
                    <div className="bg-white rounded-[20px] overflow-hidden shadow-md">
                        <div className="m-6 rounded-[20px]">
                            <ImageComponent src={img1} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4 mr-4">
                            <div>
                                <TextField children={item.course_id
                                    .title} className="text-customHeadingText font-customWeight text-midPTextSize mt-4 mb-2" />
                            </div>
                            <div className="flex justify-between mt-4">
                                <ImageComponent src={ratingImg} className="h-5 w-20" />
                                <TextField className="text-customPText" children={item.course_id.rating === 0 ? "No rating yet" : item.course_id.rating} />
                            </div>
                            <div className="flex justify-between mt-4">
                                <div>
                                    <TextField children={item.course_id.enrollment && item.course_id.enrollment.length === 0 ? "No enrollments yet" : item.course_id.enrollment && item.course_id.enrollment.length} />
                                </div>
                                <div>
                                    {/* <Button onClick={() => handleViewSections(item._id)} type="submit" className="w-10 h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" children={<ImageComponent src={buttonImg} />} /> */}
                                </div>
                            </div>
                        </div>

                        <div className="h-[40px]"><Progress className="w-[480px] mx-auto my-4" progress={item.progress} /></div>
                    </div>

                ))}

            </div>

        </>
    )
}

export default EnrolledCourseList