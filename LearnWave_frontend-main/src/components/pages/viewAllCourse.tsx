import Layout from "../templates/layout";
import CourseList from "../molecules/courseList";
const ViewAllCourse: React.FC = () => {
    return (
        <>
            <Layout>
                <div className="bg-slate-50">
                    <div className="flex flex-col items-center mt-6">
                        <div className="text-[38px] text-[#0C0531] font-[600] text-center">Level Up Your Coding Skills</div>
                        <div className="text-[20px] text-[#827A7A] mt-6">Whether you want to excel in web development, mobile development</div>
                        <div className="text-[20px] text-[#827A7A]">or strengthen your fundamental software engineering skills, there is a course for you.</div>
                    </div>
                    <CourseList />
                </div>
            </Layout>
        </>
    )
}

export default ViewAllCourse