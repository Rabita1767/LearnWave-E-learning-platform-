import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../molecules/sideBar";
import Button from "../atoms/button";
import FormField from "../molecules/formField";
import AddSectionContent from "../organisms/addSectionContent";
import { useForm, Controller } from "react-hook-form";
import { courseService } from "../../api/courseService";
import { Modal } from 'flowbite-react';
import useInstructorHook from "../../hooks/instructorHook";
import ImageComponent from "../atoms/imageAtom";
import TextField from "../atoms/textField";
import img from "../../assets/Rectangle 6.png"
import { CData } from "../../interfaces/course";
import { instructorService } from "../../api/instructorService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const YourComponent: React.FC = () => {
    const navigate = useNavigate();
    const { updateData, updateState } = useInstructorHook();
    const { courseId } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState();
    const [activeTab, setActiveTab] = useState("landingpage");
    function onCloseModal() {
        setOpenModal(false);

    }
    const [state, setState] = useState({
        loading: false,
        data: {} as CData
    })
    useEffect(() => {
        const data =
        {
            course_id: courseId
        }
        const fetchData = async () => {
            const response = await courseService.getCourseById(data);
            if (response.data.success) {
                setState({ ...state, loading: false, data: response.data.data })
                setValue('title', response.data.data.title);
                setValue("description", response.data.data.description);
                setValue("category", response.data.data.category);
                setValue("image", response.data.data.image);
            }
            console.log(response.data.data);
            if (state.data.subcription) {
                setSubscription(true);
            }
        }
        fetchData();

    }, [updateState.data])

    const [subscription, setSubscription] = useState(false);
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    const handleEditCourse = (tab: string, courseId: string | undefined) => {
        console.log("edited clicked")
        setActiveTab(tab);
        setOpenModal(true);
    };
    const handleOnSubmit = (data) => {
        console.log(data);
        console.log(courseId)
        const formData = new FormData();
        formData.append("course_id", courseId);
        formData.append("image", image);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", category);
        console.log(formData);
        updateData(formData);
        setOpenModal(false);
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleCourseAdd = (courseId) => {
        const data =
        {
            course_id: courseId
        }
        console.log("course add");
        console.log(courseId);
        const fetchData = async () => {
            try {
                const response = await instructorService.sendCourseAddrequest(data);
                console.log(response.data);
                if (response.data.success) {
                    navigate("/instructor/course");
                    toast(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }

    const { handleSubmit, control, setValue } = useForm();

    return (
        <div className="flex flex-row h-screen w-screen">
            <SideBar />

            <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[80px] overflow-x-hidden">
                <div className="flex border-b border-gray-300 space-x-[80px]">
                    <Button className={`py-2 px-4 focus:outline-none ${activeTab === "landingpage" ? "border-b-2 border-blue-500" : ""
                        }`}
                        onClick={() => handleTabClick("landingpage")} children={<p className="text-[24px] mx-[60px]">Landing page</p>} />
                    <Button className={`py-2 px-4 focus:outline-none ${activeTab === "editCourseData" ? "border-b-2 border-blue-500" : ""
                        }`}
                        onClick={() => handleEditCourse("editCourseData", courseId)} children={<p className="text-[24px] mx-[60px]">Edit Course Data</p>} />
                    <Button className={`py-2 px-4 focus:outline-none ${activeTab === "addSections" ? "border-b-2 border-blue-500" : ""
                        }`}
                        onClick={() => handleTabClick("addSections")} children={<p className="text-[24px] ml-[60px]">Add Sections</p>} />
                </div>
                {
                    !subscription ? (<Button
                        onClick={() => handleCourseAdd(courseId)} children={<p className="text-[24px] ml-[60px]">Send Subscription</p>} />) : null
                }


                {
                    activeTab === "landingpage" && (
                        <div className="flex space-x-8 mt-8 mb-8 border-t-[2px] pt-6 border-[#2D2F31] border-opacity-30">
                            <div>
                                <ImageComponent src={img} className="w-[180px] h-[90px] object-cover pt-4 border-rounded" />
                            </div>
                            <div className="w-full space-y-4">
                                <TextField className="text-[20px] font-[600] opacity-80 mt-2 cursor-pointer hover:text-purple-700" children={state.data.title} />
                                <TextField className="text-[18px] font-[500] opacity-75 mt-[2px]" children={state.data.description} />
                                <TextField className="text-[18px] font-[500] opacity-75 mt-[2px]" children={state.data.category} />
                                <TextField className="text-[18px] font-[600] opacity-100 mt-[2px]" children={state.data.isApproved ? "Accepted" : "Pending"}
                                />
                            </div>

                        </div>
                    )
                }

                {activeTab === "editCourseData" && (
                    <div>
                        <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="space-y-6">
                                    <div className="pl-[22px]">
                                        <h3 className="text-[24px] font-medium text-gray-900 dark:text-white pb-2">Edit Course data</h3>
                                        <div>
                                            <form onSubmit={handleSubmit(handleOnSubmit)}>
                                                <div className="mb-8">
                                                    <FormField
                                                        name="title"
                                                        control={control}
                                                        type="text"
                                                        children="Enter Title"
                                                        rules={{
                                                            pattern: {
                                                                value: /^[a-zA-Z0-9\s\-!@#$%^&*()_+={}[\]:;<>,.?~\\]+$/,
                                                                message: "Invalid Course Title",
                                                            },
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-8">
                                                    <FormField
                                                        name="description"
                                                        control={control}
                                                        type="text"
                                                        children="Enter a Short Description"
                                                        rules={{

                                                            pattern: {
                                                                value: /^[\w\d\s.,;:'"(){}\[\]<>?!@#$%^&*|+=_-]+$/u,
                                                                message: "Invalid description",
                                                            },
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-8">

                                                    <label htmlFor="category" className="text-[22px] font-[450] text-customHeadingText opacity-95 pb-4">Category</label>
                                                    <select id="category" name="category" value={category} onChange={handleCategoryChange} className="h-[50px] w-[380px] p-[6px] border rounded border-indigo-600 opacity-50 cursor-pointer mt-[10px]">
                                                        <option value="" className="cursor-pointer">Select a category</option>
                                                        <option value="Web Development" className="cursor-pointer">Web Development</option>
                                                        <option value="App Development" className="cursor-pointer">App Development</option>
                                                        <option value="Cyber Security" className="cursor-pointer">Cyber Security</option>

                                                    </select>

                                                </div>
                                                <div>
                                                    <input type="file" onChange={e => setImage(e.target.files[0])} />
                                                </div>
                                                <div className="w-full">
                                                    <Button className="h-[50px] w-[380px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" text="Edit" />
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div >
                )}

                {
                    activeTab === "addSections" && (
                        <div>
                            <AddSectionContent />
                        </div>
                    )
                }
            </div >
        </div >
    );
};

export default YourComponent;
