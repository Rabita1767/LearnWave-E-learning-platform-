import { useParams } from "react-router-dom";
import Layout from "../templates/layout";
import ViewAllSection from "../organisms/viewAllSection";
import VideoLeft from "../organisms/videoLeft";
const Video: React.FC = () => {
    const { subsectionId, courseId } = useParams();
    console.log(subsectionId);
    return (
        <>
            <Layout>
                <div className="flex space-x-1 ml-2 mt-2 flex-col sm:flex-row">
                    <div className="p-6"><VideoLeft /></div>
                    <div className="w-1/3 pt-2 mr-2">
                        <ViewAllSection />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Video