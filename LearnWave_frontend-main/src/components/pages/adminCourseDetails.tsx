import Layout from "../templates/layout";
import ViewAllSection from "../organisms/viewAllSection";
import ImageComponent from "../atoms/imageAtom";
import { useParams } from "react-router-dom";
import img1 from "../../assets/Rectangle 4.png";
import { useSelector } from 'react-redux';
import SideBar from "../molecules/sideBar";
const AdminCourseDetails: React.FC = () => {
    const userRole = useSelector((state) => state.auth.role);
    const { courseId } = useParams();
    console.log(courseId);
    return (
        <>
            <div className="flex flex-row h-screen w-screen">
                <SideBar />
                <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[80px] overflow-x-hidden">
                    <div className="w-[60%] ml-[250px] space-x-4 px-12 py-6">
                        <ViewAllSection />
                    </div>
                </div>
            </div>
            {/* <Layout>
                <div className="flex ml-20 mt-16 flex-col sm:flex-row">
                    <div>
                        <ImageComponent src={img1} className="h-594 w-653" />
                    </div>
                    <div className="w-1/2 p-10">
                        <ViewAllSection />
                    </div>
                </div>
            </Layout> */}
        </>
    )
}

export default AdminCourseDetails;