import { Accordion } from "flowbite-react";
import { DataEntity } from "../../interfaces/section";
import { DataEntitySub } from "../../interfaces/subSection";
import { courseService } from "../../api/courseService";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../molecules/loader";
const View = () => {
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

    console.log(state);
    console.log(subSection);

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

                            <Accordion.Title className="text-[#6255A5] text-[20px]">
                                {section.title}
                            </Accordion.Title>


                        </Accordion.Panel>
                    ))}
                </Accordion>
            </div>
        </>




    );
}
export default View;
