import SideBar from "../molecules/sideBar";
import Button from "../atoms/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InstructorformField from "../molecules/instructorFormField";
const AddCourse3: React.FC = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        getValues
    } = useForm();
    const handleCategory = () => {
        const category = getValues("category");
        localStorage.setItem("category", category);
        console.log(category);
        navigate("/addCourse")
    }
    return (
        <>
            <div className="flex flex-row h-screen w-screen overflow-hidden]">
                <SideBar />
                <div className="flex-1 space-y-10 flex-col items-center mt-[80px] shadow-lg">
                    <div className="h-[70%] w-[90%] border border-2 ml-[70px] flex flex-col space-x-4 px-10 pt-6 pb-8">
                        <div className="text-center pt-[50px] pb-[30px]">
                            <p className="text-[34px] font-[700]">What category best fits the knowledge you'll share?</p>
                        </div>
                        <div className="text-center pb-[40px]">
                            <p className="text-[20px] opacity-90">If you're not sure about the right category, you can change it later.
                            </p>
                        </div>
                        <div className="text-center pb-[30px]">
                            <form onSubmit={handleSubmit(handleCategory)}>
                                <InstructorformField
                                    name="category"
                                    control={control}
                                    type="text"
                                    placeholder="e.g. MERN is now one of the most ..."
                                    rules={{
                                        required: "Category is required",

                                        minLength: {
                                            value: 2,
                                            message: "Minimum length must be 2",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Maximum length must be 100",
                                        },
                                    }}
                                />
                                <div>
                                    <Button children="Next" type="submit" className="w-40 h-[60px] p-2 mt-[50px] rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight  ml-auto" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="h-[15%] w-[90%] border border-2 ml-[70px] flex space-x-4 px-10 py-6">
                        {/* <Button children={<Link to="/addCourse">Create</Link>} className="w-40 h-[60px] p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight  ml-auto" /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCourse3;