import Layout from "../templates/layout";
import ViewAllSection from "../organisms/viewAllSection";
import ImageComponent from "../atoms/imageAtom";
import { useParams } from "react-router-dom";
import img1 from "../../assets/Rectangle 4.png";
import { useSelector } from 'react-redux';
const CourseDetails: React.FC = () => {
    const userRole = useSelector((state) => state.auth.role);
    const { courseId } = useParams();
    console.log(courseId);
    return (
        <>
            <Layout>
                <div className="flex ml-20 mt-16 flex-col sm:flex-row">
                    <div>
                        <ImageComponent src={img1} className="h-594 w-653" />
                    </div>
                    <div className="w-1/2 p-10">
                        <ViewAllSection />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CourseDetails;