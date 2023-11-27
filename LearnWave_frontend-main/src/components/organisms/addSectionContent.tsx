import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../atoms/button";
import { courseService } from "../../api/courseService";
import { FaFolderPlus } from "react-icons/fa";
import { Modal } from 'flowbite-react';
import FormField from "../molecules/formField";
import { useForm } from "react-hook-form";
import useInstructorHook from "../../hooks/instructorHook";
import { DataEntity } from "../../interfaces/section";
import TextField from "../atoms/textField";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageLoader from "../molecules/pageLoader";
const AddSectionContent: React.FC = () => {
    const { handleSubmit, getValues, control, setValue } = useForm();
    interface IState {
        loading: boolean,
        data: DataEntity[],
        errorMsg: string
    }
    const [sections, setSections] = useState<IState>({
        loading: false,
        data: [] as DataEntity[],
        errorMsg: ""
    });
    const navigate = useNavigate();
    const { addData, flag, editFlag, setFlag, setEditFlag, editSection } = useInstructorHook();
    const { courseId } = useParams();

    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    const [tab, setTab] = useState("");
    const [editingSectionId, setEditingSectionId] = useState(null);
    const [deleteFlag, setDeleteFlag] = useState(false);
    const updateSection = (sectionId: any, sectionTitle) => {
        console.log(sectionId);
        const body =
        {
            section_id: sectionId,
            title: getValues("title")
        }

        editSection(body);
        setOpenModal(false);
        // setTab("");
    }

    const addSection = async (data: any) => {
        const body =
        {
            course_id: courseId,
            title: data.title
        }

        await addData(body);
        setOpenModal(false);
        setTab("");
    };

    useEffect(() => {
        const body =
        {
            course_id: courseId
        }
        setSections({ ...sections, loading: true })
        const fetchSection = async (body: any) => {
            try {
                const response = await courseService.getAllSection(body);
                if (response.data.success) {
                    setSections({ ...sections, loading: false, data: response.data.data })
                    setFlag(false);
                    setEditFlag(false);
                    // navigate(`/addCourse/${body.course_id}`)
                }
                console.log(response.data);
            } catch (error) {
                setSections({ ...sections, loading: false })
                console.log(error);
            }
        }
        fetchSection(body);

    }, [flag, editFlag, deleteFlag])
    console.log(sections);

    const handleEdit = (sectionId, courseId) => {
        console.log(sectionId);
        setTab("editSectionTitle");
        setOpenModal(true);
        setEditingSectionId(sectionId);
        console.log("edit clicked");
    }
    const handleSubSection = (sectionId, courseId) => {
        console.log(sectionId);
        setTab("addSubSection");
        setOpenModal(true);
        setEditingSectionId(sectionId);
        console.log("addsubsection clicked");
    }
    const tabAdd = () => {
        setOpenModal(true);
        setTab("addTab");
    }

    const handleDelete = (sectionId: string, courseId: string) => {
        console.log(sectionId);
        const data = {
            section_id: sectionId
        }
        const deleteSection = async () => {
            try {
                const response = await courseService.deleteSection(data);
                console.log(response.data);
                if (response.data.success) {
                    setDeleteFlag(true);
                    toast(response.data.message);
                }
                toast(response.data.message);
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong!")
            }
        }
        deleteSection();
        console.log("delete clicked");
    }
    const handleSubsectionEdit = (sectionId, courseId) => {
        navigate(`/subsection/${courseId}/${sectionId}`)

    }
    const handleViewSubSection = (sectionId, courseId) => {
        navigate(`/viewSubsection/${sectionId}/${courseId}`)
    }
    const handleVideo = (sectionId, sectionTitle, courseId) => {
        navigate(`/video/${courseId}/${sectionId}`)
    }
    const handleQuiz = (sectionId) => {
        navigate(`/quiz/${courseId}/${sectionId}`)
    }
    const handleAssignment = (sectionId, courseId) => {
        navigate(`/assignment/${courseId}/${sectionId}`)

    }

    return (
        <>
            {sections.loading ? (
                <div className="flex items-center justify-center h-screen">
                    <PageLoader />
                </div>
            ) : (
                <div className="mx-[40px]">
                    <div className="mb-[60px]">
                        <Button onClick={tabAdd} className="h-[70px] w-[280px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton hover:bg-[#ac67bf] text-[22px] text-customFont font-customWeight text-white" children="Add Section" />
                    </div >
                    <div>
                        <TextField children="List of the Sections under this Course" className="text-[30px] font-[600] text-[#6255A5] hover:text-[#ac67bf] cursor-pointer" />
                    </div>
                    {
                        tab === "addTab" && (
                            <div>
                                <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                                    <Modal.Header />
                                    <Modal.Body>
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Section</h3>
                                            <div>
                                                <form onSubmit={handleSubmit(addSection)}>
                                                    <div className="mb-8">
                                                        <FormField
                                                            name="title"
                                                            control={control}
                                                            type="text"
                                                            children="Enter Title"
                                                            rules={{
                                                                required: "Title is required",
                                                                pattern: {
                                                                    value: /^[a-zA-Z0-9\s.,;:'"()&!?-]+$/,
                                                                    message: "Invalid Title Format",
                                                                },
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="w-full">
                                                        <Button className="h-[50px] w-[380px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" children="Add" />
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        )
                    }
                    <div>
                        {sections.data.length > 0 ? (
                            sections.data.map((section) => (
                                <div key={section._id} className="flex space-x-8 mt-8 mb-8 border-t-[2px] pt-6 border-[#2D2F31] border-opacity-30">
                                    <div className="w-full space-y-4">
                                        <TextField className="text-[20px] font-[600] opacity-80 mt-2 cursor-pointer hover:text-purple-700" children={section.title} />
                                    </div>
                                    <div>
                                        <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-[#ac67bf]" onClick={() => handleEdit(section._id, courseId)}><FaRegEdit /></p>
                                        {
                                            tab === "editSectionTitle" && editingSectionId === section._id && (
                                                <div>
                                                    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                                                        <Modal.Header />
                                                        <Modal.Body>
                                                            <div className="space-y-6">
                                                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Section</h3>
                                                                <div>
                                                                    <form onSubmit={handleSubmit(() => updateSection(section._id, section.title))}>
                                                                        <div className="mb-8">
                                                                            <FormField
                                                                                name="title"
                                                                                control={control}
                                                                                type="text"
                                                                                children="Enter Title"
                                                                                rules={{
                                                                                    required: "Title is required",
                                                                                    pattern: {
                                                                                        value: /^[a-zA-Z0-9\s.,;:'"()&!?-]+$/,
                                                                                        message: "Invalid Title Format",
                                                                                    },
                                                                                }}
                                                                            />
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <Button className="h-[50px] w-[380px] p-2 mt-8 hover:bg-[#ac67bf]  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" children="Update" />
                                                                        </div>
                                                                    </form>
                                                                </div>

                                                            </div>
                                                        </Modal.Body>
                                                    </Modal>
                                                </div>
                                            )
                                        }

                                    </div>
                                    <div>

                                    </div>


                                    <div>
                                        <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-[#ac67bf]" onClick={() => handleSubSection(section._id, courseId)}>Add Sub Section</p>
                                        {
                                            tab === "addSubSection" && editingSectionId === section._id && (
                                                <div>
                                                    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                                                        <Modal.Header />
                                                        <Modal.Body>
                                                            <div className="text-center">
                                                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                                    Please Choose One of the Following
                                                                </h3>
                                                                <div className="flex justify-center gap-4">
                                                                    <Button color="failure" onClick={() => handleVideo(section._id, section.title, courseId)}>
                                                                        Upload Video
                                                                    </Button>

                                                                    <Button color="gray" onClick={() => handleQuiz(section._id)}>
                                                                        Add Quiz
                                                                    </Button>
                                                                    <Button color="gray" onClick={() => handleAssignment(section._id, courseId)}>
                                                                        Add Assignment
                                                                    </Button>

                                                                </div>
                                                            </div>
                                                        </Modal.Body>
                                                    </Modal>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-[#ac67bf]" onClick={() => handleDelete(section._id, courseId)}><MdDelete /></p>
                                    </div>
                                    <div>
                                        <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-[#ac67bf]" onClick={() => handleSubsectionEdit(section._id, courseId)}>SubSection Update</p>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <div>No sections have been added till now.</div>
                        )}
                    </div>
                </div >
            )}
        </>
    );
};

export default AddSectionContent;
