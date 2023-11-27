import Layout from "../templates/layout";
import QuizMid from "../organisms/quizMid";
import { useParams } from "react-router-dom";
const Quiz: React.FC = () => {
    const { quizId, courseId } = useParams();
    console.log(quizId);
    return (
        <div>
            <Layout>
                <QuizMid />
            </Layout>
        </div>
    )
}

export default Quiz;