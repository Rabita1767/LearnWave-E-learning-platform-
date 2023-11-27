import Header from "../organisms/header";
import Logos from "../molecules/logos";
import Mid from "../organisms/mid";
import MidBottom from "../molecules/MidBottom";
import CourseList from "../molecules/courseList";
import Layout from "../templates/layout";
const CommonHome: React.FC = () => {
    return (
        <>
            <Layout>
                <Header />
                <Logos />
            </Layout>
        </>

    )
}
export default CommonHome;