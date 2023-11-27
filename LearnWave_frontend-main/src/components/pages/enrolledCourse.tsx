import Layout from "../templates/layout";
import EnrolledCourseList from "../organisms/EnrolledCourseList";
const EnrolledCourse: React.FC = () => {
    return (
        <>
            <Layout>
                <div className="bg-slate-50">
                    <EnrolledCourseList />
                </div>
            </Layout>
        </>
    )
}

export default EnrolledCourse;