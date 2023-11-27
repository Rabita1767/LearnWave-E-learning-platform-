import { useState, useEffect } from "react";
import { subscriptionService } from "../../api/subscriptionService";
import { Data } from "../../interfaces/cart";
import { useNavigate } from "react-router-dom";
import { adminService } from "../../api/adminService";
import img from "../../assets/Rectangle 6.png";
import ImageComponent from "../atoms/imageAtom";
import Button from "../atoms/button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
const AdminCartDetails = () => {
    const navigate = useNavigate();
    const { studentId, notificationId } = useParams();
    const cartId = localStorage.getItem("cartId");
    interface IState {
        loading: boolean,
        data: Data[],
        errorMsg: string
    }
    type ButtonState = Boolean | undefined;
    const [state, setState] = useState<IState>({
        loading: false,
        data: [] as Data[],
        errorMsg: ""
    })
    useEffect(() => {
        const data =
        {
            student_id: studentId
        }
        const fetchData = async () => {
            try {
                const response = await adminService.viewCartData(data);
                console.log(response.data.data);
                if (response.data.success) {
                    localStorage.setItem("cartId", response.data.data._id);
                    setState({ ...state, loading: false, data: response.data.data.course });
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    const [button, setButton] = useState<ButtonState>(false);
    const handleAccept = (cartId: string, courseId: string, studentId: string) => {
        const data =
        {
            cart_id: cartId,
            course_id: courseId,
            student_id: studentId
        }
        console.log(data);
        const acceptSubscription = async () => {
            console.log(data);
            try {
                const response = await subscriptionService.acceptSubscription(data);
                console.log(response.data);
                if (response.data.success) {
                    toast(response.data.message);
                    navigate(`/adminCart/${notificationId}/${studentId}`);
                }
                else {
                    toast(response.data.message);
                }

            } catch (error) {
                console.log(error);
            }
        }
        acceptSubscription(data);

    }
    const handleReject = (cartId: string, courseId: string, studentId: string) => {
        const data =
        {
            cart_id: cartId,
            course_id: courseId,
            student_id: studentId
        }
        console.log(data);
        const rejectSubscription = async () => {
            console.log(data);
            try {
                const response = await subscriptionService.rejectSubscription(data);
                console.log(response.data);
                if (response.data.success) {
                    toast(response.data.message);
                    navigate(`/adminCart/${notificationId}/${studentId}`);
                }
                else {
                    toast(response.data.message);
                }

            } catch (error) {
                console.log(error);
            }
        }
        rejectSubscription(data);
    }
    const handleClear = (notificationId: string) => {
        const data =
        {
            notification_id: notificationId
        }
        const clearNotification = async () => {
            try {
                const response = await subscriptionService.clearNotification(data);
                console.log(response.data);
                if (response.data.success) {
                    navigate("/admin");
                }
                else {
                    toast("Something went wrong!Tr again in some times!");
                }

            } catch (error) {
                console.log(error);
            }
        }
        clearNotification();
    }

    return (
        <>
            <div className="flex ml-20 space-x-4">
                <div className="w-3/4">
                    <div><p className="text-[40px] font-[600] text-[#2D2F31] cursor-pointer">Shopping Cart</p></div>
                    {state.data.map((item) => (
                        <div className="flex space-x-8 mt-8 mb-8 border-t-[2px] pt-6 border-[#2D2F31] border-opacity-30">
                            <div>
                                <ImageComponent src={img} className="w-[180px] h-[90px] object-cover" />
                            </div>
                            <div className="w-full">
                                <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700">{item.course_id.title}</p>
                                <p className="text-[18px] font-[500] opacity-75 mt-[2px]">{item.course_id.description}</p>
                                <p className="text-[18px] font-[500] opacity-75 mt-[2px]">{item.course_id.category}</p>
                            </div>
                            <div>
                                <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleAccept(cartId, item.course_id._id, studentId)}>Accept</p>
                            </div>
                            <div>
                                <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleReject(cartId, item.course_id._id, studentId)}>Reject</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-1/4">
                    <Button className="mt-[510px] ml-[25px] w-140 h-15 p-6 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" onClick={() => handleClear(notificationId)}>Done</Button>
                </div>
            </div>
        </>
    )
}

export default AdminCartDetails;