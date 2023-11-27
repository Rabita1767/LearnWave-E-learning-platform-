import { useParams } from "react-router-dom";
import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import { instructorService } from "../../api/instructorService";
import SideBar from "../molecules/sideBar";
import TextField from "../atoms/textField";
import Button from "../atoms/button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const AddAssignment = () => {
    const navigate = useNavigate();
    const { courseId, sectionId } = useParams();
    const [title, setTitle] = useState<string | undefined>();
    const [question, setQuestion] = useState<string | undefined>();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !question) {
            toast.error('Please fill in all fields.');
            return;
        }
        const data =
        {
            section_id: sectionId,
            course_id: courseId,
            title: title,
            question: question
        }
        const addAssignment = async () => {
            try {
                const response = await instructorService.addAssignment(data);
                console.log(response.data);
                if (response.data.success) {
                    toast(response.data.message);
                    navigate(`/addCourse/${courseId}`);
                }

            } catch (error) {
                console.log(error);
                toast.error('Something went wrong!Please try again');
            }
        }
        addAssignment();
    }
    return (
        <>
            <div className="flex flex-row h-screen w-screen">
                <SideBar />
                <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[70px] overflow-x-hidden">
                    <div className="h-[80%] w-[90%] border border-2 ml-[70px] flex flex-col space-x-4 px-10 pt-[2px] pb-8">
                        <div className="text-center pt-[30px] pb-[30px]">
                            <TextField children="Add an assignment for your lesson" className="text-[34px] font-[700] text-[#0C0531]" />
                        </div>
                        <div className="flex items-center justify-center">
                            <MdAssignmentAdd className="text-[120px]" />
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="text-center pt-[10px] pb-[20px]">
                                    <TextField children="Enter Title for your assignment" className="text-[22px] font-[700] text-[#0C0531] pb-[20px]" />
                                    <input type="text" name="title" value={title} className="w-[420px]" onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div className="text-center pt-[10px] pb-[30px]">
                                    <TextField children="Enter Your question" className="text-[22px] font-[700] text-[#0C0531] pb-[20px]" />
                                    <input type="text" name="question" value={question} className="w-[420px]" onChange={e => setQuestion(e.target.value)} />
                                </div>

                                <div className="text-center pb-[30px] mb-[40px]">
                                    <div>
                                        <Button children="Create Assignment" className="h-[50px] w-[300px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" type="submit" />

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

export default AddAssignment;