import { IData } from "../../interfaces/instructor";
import { instructorService } from "../../api/instructorService";
import { useState, useEffect } from "react";
import PageLoader from "../molecules/pageLoader";
import SideBar from "../molecules/sideBar";
const InstructorProfile = () => {
    const [state, setState] = useState({
        loading: false,
        data: {} as IData
    })
    useEffect(() => {
        const fetchData = async () => {
            setState({ ...state, loading: true })
            const response = await instructorService.getInstructorById();
            try {
                console.log(response.data);
                if (response.data.success) {
                    setState({ ...state, loading: false, data: response.data.data })
                }

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();

    }, [])
    return (
        <>
            {state.loading ? (
                <div className="flex items-center justify-center h-screen">
                    <PageLoader />
                </div>
            ) : (
                <div className="flex flex-row h-screen w-screen">
                    <SideBar />
                    <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[80px] overflow-x-hidden">
                        <div className="max-w-2xl mx-auto mt-[140px] p-8 px-14 bg-white rounded shadow-lg">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-2">{state.data.name}</h2>
                                <p className="text-[#6255A5] text-[20px]">Instructor</p>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-[28px] font-[600] mb-2">Profile Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <p className="text-[22px]">Email</p>
                                        <p className="text-[22px]">Username</p>
                                        <p className="text-[22px]">Contact</p>
                                        <p className="text-[22px]">Role</p>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[#6255A5] text-[20px]">{state.data.email}</p>
                                        <p className="text-[#6255A5] text-[20px]">{state.data.userName}</p>
                                        <p className="text-[#6255A5] text-[20px]">{state.data.phoneNumber}</p>
                                        <p className="text-[#6255A5] text-[20px]">{state.data.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )}

        </>

    )
}

export default InstructorProfile;