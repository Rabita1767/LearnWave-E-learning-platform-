import { useParams } from "react-router-dom";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useEffect } from "react";
import TextField from "../atoms/textField";
import FormField from "../molecules/formField";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInstructorHook from "../../hooks/instructorHook";
import useQuizHook from "../../hooks/quizHook";
import { useNavigate } from "react-router-dom";
import useAssignmentHook from "../../hooks/assignmentHook";
import { Modal } from "flowbite-react";
import Button from "../atoms/button";
import { useForm, Controller } from "react-hook-form";
import { assignmentService } from "../../api/assignmentService";
import { instructorService } from "../../api/instructorService";
import { DataEntity } from "../../interfaces/subSection";
const SubSection: React.FC = () => {
    const navigate = useNavigate();
    const { handleSubmit, control, setValue, getValues } = useForm();
    const { subSections, getAllSubsection, deleteVideo, videoDeleteFlag } = useInstructorHook();
    const { deleteFullQuiz, quizDelete, getAllQuiz, subQuiz } = useQuizHook();
    const { deleteAssignment, deleteAssignmentState, updateAssignment, update, getAllAssignment, subAssignment } = useAssignmentHook();
    const { sectionId, courseId } = useParams();
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);

    }
    useEffect(() => {
        const data =
        {
            course_id: courseId,
            section_id: sectionId,
        }
        getAllSubsection(data);
    }, [videoDeleteFlag])
    useEffect(() => {
        const data =
        {
            course_id: courseId,
            section_id: sectionId,
        }
        getAllQuiz(data);
    }, [quizDelete])

    useEffect(() => {
        const data =
        {
            course_id: courseId,
            section_id: sectionId,
        }
        getAllAssignment(data);
    }, [deleteAssignmentState, updateAssignment])




    console.log(subSections.data);
    const handleVideo = (subSectionId: string) => {
        console.log("video clicked!");
        console.log(subSectionId);
    }
    const handleQuiz = (quizId: string) => {
        console.log("quiz clicked");
        console.log(quizId);
        navigate(`/editQuiz/${courseId}/${quizId}`)
    }
    const handleAssignment = (assignmentId: string) => {
        console.log("assignment clicked!");
        setOpenModal(true)
        console.log(assignmentId);
    }
    const handleQuizDelete = (quizId) => {
        console.log("quiz");
        console.log(quizId);
        const data = {
            quiz_id: quizId,
            course_id: courseId
        }

        deleteFullQuiz(data);
    }
    const handleAssignmentDelete = (assignmentId) => {
        const data =
        {
            assignment_id: assignmentId,
            course_id: courseId
        }

        deleteAssignment(data);
    }
    const handleAssignmentUpdate = (assignmentId) => {

        console.log(assignmentId);
        setOpenModal(false);

        const data =
        {
            assignment_id: assignmentId,
            title: getValues("title"),
            question: getValues("question")
        }

        update(data);
    }
    const handleVideoDelete = (videoId) => {
        console.log("Video delete");
        console.log(videoId);
        const data =
        {
            subsection_id: videoId
        }

        deleteVideo(data);
    }

    console.log(subSections.data);
    const [isPublicationDisabled, setPublicationDisabled] = useState(false);
    const handlePublication = () => {
        console.log("pub clicked");
        const data =
        {
            course_id: courseId
        }
        const sendRequest = async (data) => {
            try {
                const response = await instructorService.sendCourseAddrequest(data);
                console.log(response.data);
                if (response.data.success) {
                    toast(response.data.message);
                    setPublicationDisabled(true);
                }
            } catch (error) {
                console.log(error);
                // toast.error('Please add contentsto all your lessons first!');
            }
        }
        sendRequest(data);
    }
    return (
        <div>
            <div>
                <TextField children="List of the Sub Sections under this Lesson" className="text-[32px] font-[600] text-[#6255A5] hover:text-[#ac67bf] cursor-pointer" />
            </div>
            <div>
                <h2 className="text-[28px] font-[600] opacity-90 mt-[30px]">Video</h2>
                {subSections.data.length > 0 ? (
                    subSections.data.map((subSection) => (
                        <div key={subSection._id} className="flex space-x-8 mt-8 mb-8 border-t-[2px] pt-6 border-[#6255A5] border-opacity-30">
                            <div className="w-full space-y-4">
                                <>

                                    <TextField className="text-[20px] font-[500] opacity-70 mt-2 cursor-pointer hover:text-[#6255A5]" children={subSection.video_title} />
                                    <div className="flex">
                                        <div className="w-full">
                                            <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleVideo(subSection._id)}><FaRegEdit /></p>
                                        </div>
                                        <div>
                                            <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleVideoDelete(subSection._id)}><MdDelete /></p>
                                        </div>
                                    </div>
                                </>
                            </div>

                        </div>
                    ))
                ) : (
                    <div>No Contents have been added till now.</div>
                )}
            </div>
            <div>
                <h2 className="text-[28px] font-[600] opacity-90 mt-[30px]">Quiz</h2>
                {subQuiz.data.length > 0 ? (
                    subQuiz.data.map((subSection) => (
                        <div key={subSection._id} className="flex space-x-8 mt-8 mb-8 border-t-[2px] pt-6 border-[#6255A5] border-opacity-30">
                            <div className="w-full space-y-4">
                                <>

                                    <TextField className="text-[20px] font-[500] opacity-70 mt-2 cursor-pointer hover:text-[#6255A5]" children={subSection.title} />
                                    <div className="flex">
                                        <div className="w-full">
                                            <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleQuiz(subSection._id)}><FaRegEdit /></p>
                                        </div>
                                        <div>
                                            <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleQuizDelete(subSection._id)}><MdDelete /></p>
                                        </div>
                                    </div>
                                </>
                            </div>


                        </div>
                    ))
                ) : (
                    <div>No Contents have been added till now.</div>
                )}
            </div>
            <div>
                <h2 className="text-[28px] font-[600] opacity-90 mt-[30px]">Assignment</h2>
                {subAssignment.data.length > 0 ? (
                    subAssignment.data.map((subSection) => (
                        <div key={subSection._id} className="flex space-x-8 mt-8 mb-8 border-t-[2px] pt-6 border-[#6255A5] border-opacity-30">
                            <div className="w-full space-y-4">
                                <>

                                    <TextField className="text-[20px] font-[500] opacity-70 mt-2 cursor-pointer hover:text-[#6255A5]" children={subSection.title} />
                                    <div className="flex">
                                        <div className="w-full">
                                            <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleAssignment(subSection._id)}><FaRegEdit /></p>
                                        </div>
                                        <div>
                                            <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleAssignmentDelete(subSection._id)}><MdDelete /></p>
                                        </div>
                                    </div>
                                </>
                            </div>

                            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                                <Modal.Header />
                                <Modal.Body>
                                    <div>
                                        <form onSubmit={handleSubmit(() => handleAssignmentUpdate(subSection._id))}>
                                            <div className="space-y-6">
                                                <TextField className="text-[24px] font-[600] text-gray-900 dark:text-white" children="Update Assignment" />
                                                <div className="mb-8">
                                                    <FormField
                                                        name="title"
                                                        control={control}
                                                        type="text"
                                                        children="Enter Title"

                                                    />
                                                </div>
                                                <div className="mb-8">
                                                    <FormField
                                                        name="question"
                                                        control={control}
                                                        type="text"
                                                        children="Enter Question"

                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <Button type="submit" children="Update" className="h-[50px] w-[380px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    ))
                ) : (
                    <div>No Contents have been added till now.</div>
                )}
            </div>
            <div className="fixed bottom-0 right-[70px] w-1/4 p-[70px]">
                {/* {isPublicationDisabled ? (
                    <div>

                        <p className="font-customFont font-[40px]">Pending...</p>
                    </div>
                ) : (
                    <Button
                        children="Send Publication Request"
                        className="h-[60px] w-[380px] p-2 mt-8 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight"
                        onClick={handlePublication}
                    />
                )} */}
                {/* <Button
                    children="Send Publication Request"
                    className="h-[60px] w-[380px] p-2 mt-8 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight"
                    onClick={handlePublication}
                /> */}
            </div>
        </div >
    )
}

export default SubSection;