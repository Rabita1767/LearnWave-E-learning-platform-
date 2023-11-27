import Header from "../organisms/header";
import Logos from "../molecules/logos";
import Mid from "../organisms/mid";
import MidBottom from "../molecules/MidBottom";
import CourseList from "../molecules/courseList";
import Layout from "../templates/layout";
const Home: React.FC = () => {
    return (
        <>
            <Layout>
                <Header />
                <Logos />
                <Mid />
                <div className="bg-slate-50">
                    <MidBottom />
                    <CourseList />
                </div>
            </Layout>
        </>

    )
}
export default Home;