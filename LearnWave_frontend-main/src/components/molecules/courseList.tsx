import { courseService } from "../../api/courseService";
import { cartService } from "../../api/cartService";
import { Course } from "../../interfaces/course";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ImageComponent from "../atoms/imageAtom";
import TextField from "../atoms/textField";
import Button from "../atoms/button";
import img1 from "../../assets/Rectangle 6.png";
import PageLoader from "./pageLoader";
import ratingImg from "../../assets/Group 119.png";
import buttonImg from "../../assets/Layer 2.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CourseList: React.FC = () => {
    const token = localStorage.getItem("token");
    const path = useLocation();
    const [flag, setFlag] = useState(false);
    console.log(path);
    const navigate = useNavigate();
    interface CourseState {
        loading: boolean,
        courses: Course[],
        errorMsg: string
    }
    interface IEnrolled {
        enrolledLoading: Boolean,
        enrolledData: Course[],
        errorMsg: string
    }

    const [state, setState] = useState<CourseState>({
        loading: false,
        courses: [] as Course[],
        errorMsg: ""
    })
    const [enrolledState, setEnrolledState] = useState<IEnrolled>({
        enrolledLoading: false,
        enrolledData: [] as Course[],
        errorMsg: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            setState({ ...state, loading: true });
            try {
                const response = await courseService.fetchUnenrolledData();
                console.log(response.data.data);
                setState({ ...state, courses: response.data.data, loading: false });
            } catch (error) {
                console.log(error);
                setState({ ...state, loading: false })
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchEnrolledData = async () => {
            setEnrolledState({ ...enrolledState, enrolledLoading: true })
            try {
                const response = await courseService.fetchEnrolledCourseData();
                console.log(response.data);
                if (response.data.success) {
                    setEnrolledState({ ...enrolledState, enrolledLoading: false, enrolledData: response.data.data });
                    setFlag(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchEnrolledData();

    }, [])
    const handleViewAllCourse = () => {
        navigate("/viewAllCourse");
    }
    const handleNext = () => {
        navigate("/next");
    }
    const handleViewSections = (id: any) => {
        navigate(`/viewAllCourse/${id}`);
    }
    const viewDetails = (courseId) => {
        console.log("view");
        navigate(`/view/${courseId}`)
    }
    const handleAddToCart = (courseId: string) => {
        const data =
        {
            course: [
                {
                    course_id: courseId
                }
            ]
        }
        const addCart = async () => {
            const response = await cartService.addCartData(data);
            console.log(response.data);
            if (response.data.success) {
                toast(response.data.message);
            }
            else {
                toast(response.data.message);
            }
        }
        addCart();

    }
    return (
        <>
            {/* <div className={state.loading ? "" : enrolledState.enrolledLoading ? "" : "hidden"}>
                <PageLoader />
            </div> */}
            <div>
                <div className="grid grid-cols-3 gap-6 mx-auto px-8 mt-12 space-x-4">

                    <div className={state.loading ? "mx-[350px]" : "hidden"}>
                        <PageLoader />
                    </div>

                    {state && state.courses.map((item, index) => (
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
                                    {/* <Button onClick={path.pathname.toString() === "/" ? () => handleViewAllCourse() : () => handleViewSections(item._id)} type="submit" className="w-10 h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" children={<ImageComponent src={buttonImg} />} />
                                <Button className="w-10 h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" children="Add to cart" onClick={() => handleAddToCart(item._id)} /> */}
                                </div>
                                <div className="flex justify-between mt-4 mb-4">
                                    {token ? (
                                        <div>
                                            <Button className="w-[150px] h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-[18px] font-customWeight" children="Add to cart" onClick={() => handleAddToCart(item._id)} />
                                        </div>
                                    ) : null}
                                    <div>
                                        <Button className="w-[150px] h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-[18px] font-customWeight" children="View Details" onClick={() => viewDetails(item._id)} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-16">
                    <Button onClick={path.pathname.toString() === "/" ? () => handleViewAllCourse() : () => handleNext()} type='submit' text={path.pathname.toString() === "/" ? "All Courses" : "Next"} className={path.pathname.toString() === "/" ? "w-55 h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" : "w-[145px] h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight"} />
                </div>
                <div className={flag ? "" : "hidden"}>
                    <div className="grid grid-cols-3 gap-6 mx-auto px-[20px] py-[20px] mt-12 space-x-4">
                        <div className={enrolledState.enrolledLoading ? "" : "hidden"}>
                            <PageLoader />
                        </div>
                        {enrolledState && enrolledState.enrolledData.map((item, index) => (
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
                                        <Button onClick={path.pathname.toString() === "/" ? () => handleViewAllCourse() : () => handleViewSections(item._id)} type="submit" className="w-10 h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" children={<ImageComponent src={buttonImg} />} />
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
export default CourseList