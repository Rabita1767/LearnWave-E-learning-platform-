import { Accordion } from "flowbite-react";
import { DataEntity } from "../../interfaces/section";
import { DataEntitySub } from "../../interfaces/subSection";
import { courseService } from "../../api/courseService";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../molecules/loader";
const ViewAllSection = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    console.log(courseId);
    interface ISection {
        loading: boolean,
        data: DataEntity[],
        errorMsg: string
    }
    interface ISubSection {
        loading: boolean,
        info: DataEntitySub[],
        errorMsg: string
    }
    const [state, setState] = useState<ISection>({
        loading: false,
        data: [] as DataEntity[],
        errorMsg: ""
    })
    const [subSection, setSubSection] = useState<ISubSection>({
        loading: false,
        info: [] as DataEntitySub[],
        errorMsg: ""
    })
    // const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        const data =
        {
            course_id: courseId
        }
        const fetchData = async () => {
            console.log(data);
            setState({ ...state, loading: true })
            try {
                console.log(data);
                const response = await courseService.fetchSectionData(data);
                if (response.data.success) {
                    setState({ ...state, loading: false, data: response.data.data });
                }
                console.log(response.data.data);

            } catch (error) {
                console.log(error);

            }

        }
        fetchData();
        console.log(state);
    }, [])
    const handleSubSection = (section_id: any) => {
        // setActiveSection(section_id);
        console.log(section_id);
        const data =
        {
            section_id: section_id
        }
        const fetchData = async () => {
            setSubSection({ ...subSection, loading: true })
            try {
                const response = await courseService.fetchSubSection(data);
                if (response.data.success) {
                    setSubSection({ ...subSection, loading: false, info: response.data.data })
                }
                console.log(response.data);

            } catch (error) {
                console.log(error);
                setSubSection({ ...subSection, loading: false, info: [] })
            }
        }

        fetchData();

    }
    console.log(state);
    console.log(subSection);
    const handleVideo = (subsectionId: any, courseId: any) => {
        navigate(`/viewAllCourse/${courseId}/subsection/${subsectionId}`)
    }
    const handleQuiz = (quizId: any, courseId: any) => {
        console.log(quizId)
        navigate(`/viewAllCourse/${courseId}/quiz/${quizId}`);
    }
    const handleAssignment = (assignmentId: any, courseId: any) => {
        navigate(`/viewAllCourse/${courseId}/assignment/${assignmentId}`);
    }
    return (

        <>
            <div>
                <Accordion>
                    <Accordion.Panel>
                        <Accordion.Title className="text-[#0C0531] text-[24px] font-[600] bg-slate-50">Course Modules</Accordion.Title>
                    </Accordion.Panel>
                </Accordion>
                <Accordion>
                    {state.data && state.data.map((section) => (
                        <Accordion.Panel>
                            <div onClick={() => handleSubSection(section._id)}>
                                <Accordion.Title className="text-[#6255A5] text-[20px]">
                                    {section.title}
                                </Accordion.Title>
                            </div>
                            <Accordion.Content>
                                <div className={subSection.loading ? "" : "hidden"}>
                                    <Loader />
                                </div>
                                {subSection.info && subSection.info.map((item) => (
                                    <div className={subSection.loading ? "hidden" : "p-2"}>
                                        {subSection && (
                                            item.video_title ? (
                                                <li className="text-[#0C0531] text-[18px] cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-300 hover:border-2 hover:border-gray-700" onClick={() => handleVideo(item._id, courseId)}>{item.video_title}</li>
                                            ) : item.quiz ? (
                                                <li className="text-[#0C0531] text-[18px] cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-300 hover:border-2 hover:border-gray-700" onClick={() => handleQuiz(item.quiz._id, courseId)}>{item.quiz.title}</li>
                                            ) : item.assignment ? (
                                                <li className="text-[#0C0531] text-[18px] cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-300 hover:border-2 hover:border-gray-700" onClick={() => handleAssignment(item.assignment._id, courseId)}>{item.assignment.title}</li>
                                            ) : subSection ? (<li className="text-[#0C0531] text-[18px] cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-300 hover:border-2 hover:border-gray-700">No data found</li>) : "No data found"
                                        )}
                                    </div>
                                ))}
                            </Accordion.Content>
                        </Accordion.Panel>
                    ))}
                </Accordion>
            </div>
        </>




    );
}
export default ViewAllSection;