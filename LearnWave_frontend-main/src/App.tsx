import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Home from "./components/pages/Home";
import Signup from "./components/organisms/signup";
import Verify from "./components/organisms/verify";
import Login from "./components/organisms/login";
import InstructorLogin from "./components/organisms/instructorLogin";
import AdminLayout from "./components/organisms/adminLayout";
import Course from "./components/pages/course";
import Subscription from "./components/pages/subscription";
import ViewAllCourse from "./components/pages/viewAllCourse";
import CourseDetails from "./components/pages/courseDetails";
import Video from "./components/pages/video";
import Quiz from "./components/pages/quiz";
import Assignment from "./components/pages/assignment";
import Cart from "./components/pages/cart";
import Transaction from "./components/pages/transaction";
import InstructorHome from "./components/pages/instructorHome";
import AddCourse1 from "./components/organisms/addCourse1";
import AddCourse2 from "./components/organisms/addCourse2";
import AddCourse3 from "./components/organisms/addCourse3";
import AddCourse from "./components/organisms/addCourse";
import AddSection from "./components/organisms/addSection";
import AddSubSection from "./components/organisms/addSubSection";
import AdminCart from "./components/pages/adminCart";
import AdminLogin from "./components/organisms/adminLogin";
import AdminAuth from "./util/adminAuth";
import EnrolledCourse from "./components/pages/enrolledCourse";
import PageLoader from "./components/molecules/pageLoader";
import AddContent from "./components/pages/addContent";
import UploadVideo from "./components/organisms/uploadVideo";
import AddQuiz from "./components/organisms/addQuiz";
import AddAssignment from "./components/organisms/addAssignment";
import SubSectionList from "./components/pages/subSectionList";
import EditQuiz from "./components/organisms/editQuiz";
import ViewEditedQuiz from "./components/organisms/viewEditedQuiz";
import AcceptCourse from "./components/pages/acceptCourse";
import AdminCourseDetails from "./components/pages/adminCourseDetails";
import ViewSubsection from "./components/pages/viewSubsection";
import ViewUnenrolledDetails from "./components/pages/viewUnenrolledDetails";
import InstructorAllCourse from "./components/organisms/InstructorAllCourse";
import InstructorProfile from "./components/pages/instructorProfile";
import CommonHome from "./components/pages/commonHome";
import InstructorSignup from "./components/organisms/instructorSignup";
import InstructorAuth from "./util/instructorAuth";
function App() {
    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/common" element={<CommonHome />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/instructorSignup" element={<InstructorSignup />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/subcription" element={<Subscription />} />
                    <Route path="/viewAllCourse" element={<ViewAllCourse />} />
                    <Route path="/viewAllCourse/:courseId" element={<CourseDetails />} />
                    <Route path="/viewAllCourse/:courseId/subsection/:subsectionId" element={<Video />} />
                    <Route path="/viewAllCourse/:courseId/quiz/:quizId" element={<Quiz />} />
                    <Route path="/viewAllCourse/:courseId/assignment/:assignmentId" element={<Assignment />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/transaction" element={<Transaction />} />

                    <Route path="/addCourse/title" element={<AddCourse1 />} />
                    <Route path="/addCourse/description" element={<AddCourse2 />} />
                    <Route path="/addCourse/category" element={<AddCourse3 />} />
                    <Route path="/addCourse" element={<AddCourse />} />
                    <Route path="/viewSubsection/:sectionId/:courseId" element={<ViewSubsection />} />
                    <Route path="/editQuiz/:courseId/:quizId" element={<EditQuiz />} />
                    <Route path="/edited/:courseId/:quizId" element={<ViewEditedQuiz />} />
                    <Route path="/addSection/:courseId" element={<AddSection />} />
                    <Route path="/addSubSection/:courseId/:sectionId" element={<AddSubSection />} />
                    <Route path="/instructorLogin" element={<InstructorLogin />} />
                    <Route path="/adminCart/:notificationId/:studentId" element={<AdminCart />} />
                    <Route path="/adminLogin" element={<AdminLogin />} />
                    <Route path="/enrolledCourses" element={<EnrolledCourse />} />
                    <Route path="/view/:courseId" element={<ViewUnenrolledDetails />} />
                    <Route path="/loader" element={<PageLoader />} />


                    <Route element={<InstructorAuth />}>
                        <Route path="/instructorHome" element={<InstructorHome />} />
                        <Route path="/instructor/course" element={<InstructorAllCourse />} />
                        <Route path="/profile" element={<InstructorProfile />} />
                        <Route path="/addCourse/:courseId" element={<AddContent />} />
                        <Route path="/video/:courseId/:sectionId" element={<UploadVideo />} />
                        <Route path="/quiz/:courseId/:sectionId" element={<AddQuiz />} />
                        <Route path="/assignment/:courseId/:sectionId" element={<AddAssignment />} />
                        <Route path="/subsection/:courseId/:sectionId" element={<SubSectionList />} />
                    </Route>
                    <Route element={<AdminAuth />}>
                        <Route path="/admin" element={<AdminLayout />} />
                        <Route path="/course" element={<Course />} />
                        <Route path="/AdminviewAllCourse/:courseId" element={<AdminCourseDetails />} />
                        <Route path="/viewInstructorDetails/:instructorId/:courseId" element={<AcceptCourse />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
