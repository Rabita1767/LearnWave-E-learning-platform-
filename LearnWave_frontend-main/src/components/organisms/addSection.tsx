import SideBar from "../molecules/sideBar";
import Button from "../atoms/button";
import InstructorformField from "../molecules/instructorFormField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { instructorService } from "../../api/instructorService";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddSection: React.FC = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const {
        handleSubmit,
        control,
        getValues
    } = useForm();
    const handleTitle = () => {
        const title = getValues("title");
        localStorage.setItem("title", title);
        console.log(title);
        const addSection = async () => {
            try {
                const data =
                {
                    course_id: courseId,
                    title: getValues("title")
                }
                console.log(data);
                const response = await instructorService.addSection(data);
                console.log(response.data);
                if (response.data.success) {
                    navigate(`/addSubSection/${courseId}/${response.data.data._id}`);
                    toast(response.data.message);
                }
                else {
                    toast(response.data.message);

                }

            } catch (error) {
                console.log(error);
            }

        }
        addSection();
    }
    return (
        <>
            <div className="flex flex-row h-screen w-screen overflow-hidden]">
                <SideBar />
                <div className="flex-1 space-y-10 flex-col items-center mt-[80px] shadow-lg">
                    <div className="h-[70%] w-[90%] border border-2 ml-[70px] flex flex-col space-x-4 px-10 pt-6 pb-8">
                        <div className="text-center pt-[50px] pb-[30px]">
                            <p className="text-[34px] font-[700]">How about a working on a Section title?</p>
                        </div>
                        <div className="text-center pb-[40px]">
                            <p className="text-[20px] opacity-90">Enter a title
                            </p>
                        </div>
                        <div className="text-center pb-[30px]">
                            <form onSubmit={handleSubmit(handleTitle)}>
                                <InstructorformField
                                    name="title"
                                    control={control}
                                    type="text"
                                    placeholder="e.g. Learn MERN Stack from Scratch"
                                    rules={{
                                        required: "Title is required",
                                        // pattern: {
                                        //     value: /^[A-Za-z0-9\s!@#$%^&*(),.?":{}|<>()&]+$/,
                                        //     message: "Title should only contain alphabets, numbers, spaces, symbols, and parentheses",
                                        // },
                                        minLength: {
                                            value: 2,
                                            message: "Minimum length must be 2",
                                        },
                                        maxLength: {
                                            value: 150,
                                            message: "Maximum length must be 150",
                                        },
                                    }}
                                />
                                <div>
                                    <Button children="Create Section" type="submit" className="w-[200px] h-[60px] p-2 mt-[50px] rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight  ml-auto" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="h-[15%] w-[90%] border border-2 ml-[70px] flex space-x-4 px-10 py-6">
                        {/* <Button children={<Link to="/addCourse/description">Continue</Link>} className="w-40 h-[60px] p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight  ml-auto" /> */}
                    </div>

                </div>

            </div>
        </>
    )
}

export default AddSection;