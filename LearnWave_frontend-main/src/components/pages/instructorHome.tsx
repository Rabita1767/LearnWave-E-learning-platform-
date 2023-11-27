import SideBar from "../molecules/sideBar";
import { Link } from "react-router-dom";
import img1 from "../../assets/engaging-course-removebg-preview.png";
import ImageComponent from "../atoms/imageAtom";
const InstructorHome: React.FC = () => {
    return (
        <>
            <div className="flex flex-row h-screen w-screen overflow-hidden]">
                <SideBar />
                <div className="flex-1 space-y-12 flex-col items-center mt-[100px] shadow-lg">
                    <div className="h-80 w-[90%] border border-2 ml-[70px] flex space-x-4 px-10 py-6">
                        <div className="w-1/2 border border-2 pl-[200px]">
                            <ImageComponent src={img1} className="h-[250px]" />
                        </div>
                        <div className="w-1/2 border border-2 px-6 py-2">
                            <div className="py-4">
                                <p className="text-[24px] font-[500] text-[#6255A5] cursor-pointer">
                                    Create an Engaging Course</p>
                            </div>
                            <div className="pt-4 pb-2">
                                <p className="text-[18px]">
                                    Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.
                                </p>
                            </div>
                            <div className="pt-4">
                                <p className="text-[18px] text-[#6255A5]">
                                    <Link className="border-b border-[#6255A5]" to="/addCourse/title">Get Started</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="h-40 w-[90%] border border-2 ml-[70px]">Course View</div>
                </div>

            </div>
        </>
    )
}

export default InstructorHome;