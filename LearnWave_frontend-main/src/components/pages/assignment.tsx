import Layout from "../templates/layout";
import { useParams } from "react-router-dom";
const Assignment: React.FC = () => {
    const { assignmentId } = useParams();
    console.log(assignmentId);
    return (
        <div>
            <Layout>
                <div>
                    Assignment
                </div>

            </Layout>
        </div>
    )
}

export default Assignment;