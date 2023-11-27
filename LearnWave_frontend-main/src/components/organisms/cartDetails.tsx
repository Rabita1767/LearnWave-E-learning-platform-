import { useState, useEffect } from "react";
import { cartService } from "../../api/cartService";
import { subscriptionService } from "../../api/subscriptionService";
import { Data } from "../../interfaces/cart";
import { useNavigate } from "react-router-dom";
import img from "../../assets/Rectangle 6.png";
import ImageComponent from "../atoms/imageAtom";
import Button from "../atoms/button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageLoader from "../molecules/pageLoader";
const CartDetails = () => {
    const navigate = useNavigate();
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
    const [removeItem, setRemoveItem] = useState({
        loading: false,
    })
    const [button, setButton] = useState<ButtonState>(false);
    const handleRemove = (courseId: string) => {
        setRemoveItem({ ...removeItem, loading: true })
        const data =
        {
            course: [
                {
                    course_id: courseId
                }
            ]
        }
        const fetchRemove = async () => {
            const response = await cartService.removeCartData(data);
            if (response.data.success) {
                toast(response.data.message);
                setRemoveItem({ ...removeItem, loading: true })
            }
            else {
                toast(response.data.message);
            }
            console.log(response.data);
        };

        fetchRemove();
        console.log("remove button clicked!");
    }
    const handelSubscription = () => {
        const sendSubscription = async () => {
            try {
                const response = await subscriptionService.sendSubscription();
                console.log(response.data);
                if (response.data.success) {
                    setButton(true);
                    navigate("/transaction");
                }
                else {
                    toast("Something went wrong!Couldn't send subscription request")
                }
            } catch (error) {
                console.log(error);
            }
        }
        sendSubscription();
    }
    useEffect(() => {
        const fetchData = async () => {
            setState({ ...state, loading: true })
            try {
                const response = await cartService.viewCartData();
                console.log(response.data.data.course);
                setState({ ...state, loading: false, data: response.data.data.course });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [removeItem])

    return (
        <>
            {state.loading ? (
                <div className="flex items-center justify-center h-screen">
                    <PageLoader />
                </div>

            ) : (
                <div className="flex ml-20 space-x-4">
                    <div className="w-3/4">
                        <div><p className="text-[40px] font-[600] text-[#2D2F31] cursor-pointer">Shopping Cart</p ></div >
                        {
                            state.data.map((item) => (
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
                                        <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700" onClick={() => handleRemove(item.course_id._id)}>Remove</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div >
                    {
                        state.data.length > 0 ? (
                            <div className="w-1/4">
                                <Button onClick={handelSubscription} className="mt-[510px] ml-[25px] w-140 h-15 p-6 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" disabled={button}>Send Subscription Request</Button>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <div>
                                    <p className="text-[24px]">No cart item available to show</p>
                                </div>
                            </div>

                        )
                    }
                </div >
            )}
        </>
    )
}

export default CartDetails