import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "../atoms/textField";
import ImageComponent from "../atoms/imageAtom";
import FormField from "../molecules/formField";
import img from "../../assets/Picture.png";
import img1 from "../../assets/logo.png";
import Button from "../atoms/button";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { Result } from "../../interfaces/student";
import { studentService } from "../../api/studentService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface IAuthstate {
    id: string
    fname: string | null,
    lname: string | null,
    userName: string | null,
    email: string | null,
    phoneNumber: number | null,
    role: number | null
}
interface IState {
    auth: IAuthstate
}
const Verify: React.FC = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        getValues,
        control,
    } = useForm();
    const authState = useSelector((state: IState) => state.auth);
    interface IStudentInfo {
        loading: boolean,
        data: Result,
        errorMsg: string | null
    }
    const [state, setState] = useState<IStudentInfo>({
        loading: false,
        data: {} as Result,
        errorMsg: ""
    })
    const submitOTP = () => {
        const data = {
            id: authState.id,
            email: authState.email,
            otp: getValues("otp")

        }
        const fetchData = async () => {
            setState({ ...state, loading: true })
            try {
                const response = await studentService.fetchOTP(data);
                console.log(response.data);
                setState({ ...state, data: response.data, loading: false });
                if (response.data.success) {
                    toast(response.data.message);
                    navigate("/");
                }
                else {
                    toast(response.data.message);
                    navigate("/verify");
                }
            } catch (error) {
                console.log(error)
            }

        }
        fetchData()
    }
    return (
        <>
            <div className="flex">
                <div>
                    <ImageComponent src={img} className="h-screen w-653" />
                </div>
                <div className="w-1/2 p-12">
                    <div className="flex space-x-4">
                        <ImageComponent src={img1} />
                        <TextField children="LearnWave" className="font-[600] text-[20px] text-[#0C0531]" />
                    </div>
                    <div className="flex justify-center">
                        <TextField children="Two-Step Verification" className="text-[28px] font-[600] text-[#0C0531] m-8" />
                    </div>
                    <div className="flex justify-center">
                        <TextField className="text-[22px] font-[450] text-customHeadingText opacity-95 px-8 pt-8 pb-8 mb-2" children="Please enter the OTP(One Time Password) to verify your account.A code has been sent to your email" />
                    </div>
                    <form onSubmit={handleSubmit(submitOTP)} className="px-8 pt-2 pb-8 mb-4">
                        <FormField
                            name="otp"
                            control={control}
                            type="text"
                            rules={{
                                required: "OTP is required",
                            }}
                        />
                        <div>
                            <Button text="Enter" type="submit" className="w-40 h-15 p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}
export default Verify;