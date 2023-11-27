import ImageComponent from "../atoms/imageAtom";
import img1 from "../../assets/Picture.png";
import img2 from "../../assets/Logo1.png";
import TextField from "../atoms/textField";
import FormField from "../molecules/formField";
import Button from "../atoms/button";
import { useForm } from "react-hook-form";
import { studentService } from "../../api/studentService";
import { Result } from "../../interfaces/student";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageLoader from "../molecules/pageLoader";
const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        handleSubmit,
        control
    } = useForm();
    interface ILogin {
        loading: boolean,
        data: Result,
        errorMsg: string
    }
    const [state, setState] = useState<ILogin>({
        loading: false,
        data: {} as Result,
        errorMsg: ""
    })
    const handleLogin = (data: any) => {
        const fetchData = async () => {
            setState({ ...state, loading: true })
            try {
                const response = await studentService.fetchLogin(data);
                console.log(response.data.success);
                setState({ ...state, loading: false, data: response.data });
                console.log(response.data.data.result);
                console.log(response.data.data.Access_token);
                localStorage.setItem("token", response.data.data.Access_token);
                if (response.data.success) {
                    dispatch(saveLogin(response.data));
                    toast(response.data.message);
                    navigate("/");
                }
                else {
                    toast(response.data.message)
                    navigate("/login")
                }
            } catch (error) {
                toast.error("Somrthing went wrong.Try again");
                console.log(error);
            }
        }
        fetchData();
    }
    return (
        <>
            {state.loading ? (
                <div className="flex items-center justify-center h-screen">
                    <PageLoader />
                </div>

            ) : (
                <div className="flex">
                    <div>
                        <ImageComponent src={img1} className="h-screen w-653" />
                    </div >
                    <div className="w-1/2 p-8">
                        <ImageComponent src={img2} className="h-[68px] w-[120px] mt-[60px] ml-[420px] mr-[300px]" />
                        <div className="mt-[80px] ml-[210px]">
                            <div className="mb-[20px]">
                                <TextField children="Welcome back!" className="text-[20px] text-[#0C0531] font-[500] opacity-95" />
                                <TextField children="Login to your account" className="text-[30px] text-[#0C0531] font-[520]" />
                            </div>
                            <div className="mt-[40px]">
                                <form onSubmit={handleSubmit(handleLogin)}>
                                    <div className="mb-8">
                                        <FormField
                                            name="email"
                                            control={control}
                                            type="text"
                                            children="Enter Email"
                                            rules={{
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address",
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            name="password"
                                            control={control}
                                            type="password"
                                            children="Enter Password"
                                            rules={{
                                                required: "Password is required",

                                            }}
                                        />
                                    </div>
                                    <div className="justify-center">
                                        <Button text="Login" className="h-[50px] w-[380px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >

            )}
        </>

    )
}
export default Login;