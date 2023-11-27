import { HiOutlineBell, HiOutlineSearch } from "react-icons/hi";
import Input from "../atoms/input";
import { Button, Modal } from 'flowbite-react';
import { useState, useEffect } from "react";
import { notificationService } from "../../api/notificationService";
import { DataEntity, IState } from "../../interfaces/notification";
import { useNavigate } from "react-router-dom";
import { adminService } from "../../api/adminService";
const AdminNavLinks = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [border, setBorder] = useState(false);
    const [button, setButton] = useState(false);
    const [state, setState] = useState<IState>({
        loading: false,
        data: [] as DataEntity[],
        errorMsg: ""
    })
    const [notification, setNotification] = useState({
        loading: false,
        data: [] as DataEntity[],
        errorMsg: ""
    })
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await notificationService.getNotification();
                console.log(response.data);
                if (response.data.success) {
                    setState({ ...state, loading: false, data: response.data.data });
                }

            } catch (error) {
                console.log("error");
            }
        }
        fetchNotification();

    }, []);
    useEffect(() => {
        const fetchInstructorNotification = async () => {
            try {
                const response = await adminService.getAdminNotification();
                console.log(response.data);
                if (response.data.success) {
                    setNotification({ ...notification, loading: false, data: response.data.data });
                }

            } catch (error) {
                console.log("error");
            }
        }
        fetchInstructorNotification();

    }, []);
    const handleCart = (studentId, notificationId) => {
        setButton(true);
        navigate(`/adminCart/${notificationId}/${studentId}`);
    }
    const handleDetails = (instructorId, courseId) => {
        navigate(`/viewInstructorDetails/${instructorId}/${courseId}`)
    }
    const [tab, setTab] = useState("instructor");
    const handleStudentTab = () => {
        setTab("student");
        console.log("student");
    }
    const handleInstructorTab = () => {
        setTab("instructor");
        console.log("ins");
    }
    return (
        <div className="flex justify-between items-center bg-white h-16 px-4">
            <div className="relative">
                <HiOutlineSearch className="text-indigo-600 absolute top-1/2 -translate-y-1/2 left-3" fontSize={20} />
                <Input type="text" name="searchText" placeholder="Search Here..." className="text-sm focus:outline-none active:outline-none h-[40px] w-[24rem] border rounded border-indigo-600 opacity-80 pr-4 pl-11" />
            </div>
            <div className="flex item-center gap-[10px] mr-4 cursor-pointer">
                {/* <HiOutlineBell className="text-indigo-600" fontSize={26} /> */}
                <button onClick={() => setOpenModal(true)}> <HiOutlineBell className="text-indigo-600" fontSize={30} /></button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>
                        <div className="text-[28px] font-[600]">
                            Notifications
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container mx-auto p-4">
                            <div>
                                <div className="flex space-x-[100px] border-b-2 ">
                                    <a href="#" className={border ? "transition duration-300 px-3 py-2" : "border-b-4 duration-300 border-[#6255A5] px-3 py-2 "}><p onClick={handleInstructorTab} className="text-[20px] font-[500]">Instructors</p></a>
                                    <a href="#" className={border ? "hover:border-b-4 transition duration-300 border-[#6255A5] px-3 py-2" : "hover:border-b-4 transition duration-300 px-3 py-2"} onTouchStart={() => setBorder(true)}><p onClick={handleStudentTab} className="text-[20px] font-[500]">Students</p></a>
                                </div>
                                {tab === "student" && (
                                    <div>
                                        <div className={button ? "hidden" : "flex flex-col py-[30px]"}>
                                            {state.data && state.data.map((item) => (
                                                <div className="flex border-b-2 mt-[15px] mb-[15px]">
                                                    <div className="w-full">
                                                        <p className="text-[25px]">{item.message}</p>
                                                    </div>
                                                    <div className="w-[125px] text-[#6255A5] font-[600] pt-[10px]">
                                                        <button onClick={() => handleCart(item.sender, item._id)}>View Cart</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                )}
                                {tab === "instructor" && (
                                    <div className={button ? "hidden" : "flex flex-col py-[30px]"}>
                                        {notification.data && notification.data.map((item) => (
                                            <div className="flex border-b-2 mt-[15px] mb-[15px]">
                                                <div className="w-full">
                                                    <p className="text-[25px]">{item.message}</p>
                                                </div>
                                                <div className="w-[125px] text-[#6255A5] font-[600] pt-[10px]">
                                                    <button onClick={() => handleDetails(item.sender, item.courseID
                                                    )}>View Details</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button onClick={() => setOpenModal(false)}>I accept</Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Decline
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    );
};

export default AdminNavLinks;
