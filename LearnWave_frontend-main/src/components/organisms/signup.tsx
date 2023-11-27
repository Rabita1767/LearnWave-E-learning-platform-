import { useForm, Controller } from "react-hook-form";
import FormField from "../molecules/formField";
import Button from "../atoms/button";
import ImageComponent from "../atoms/imageAtom";
import img1 from "../../assets/logo.png";
import img3 from "../../assets/Logo1.png";
import img2 from "../../assets/Picture.png";
import TextField from "../atoms/textField";
import { EmailVerify } from "../../interfaces/student";
import { studentService } from "../../api/studentService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { saveLogin } from "../../store/authSlice";
interface IAuth {
    loading: boolean,
    data: EmailVerify,
    errorMsg: string
}

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    interface IFormData {
        password: string,
        confirmPassword: string
    }
    const [state, setState] = useState<IAuth>({
        loading: false,
        data: {} as EmailVerify,
        errorMsg: ""
    })
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch
    } = useForm<IFormData>();
    const password = watch("password");
    const handleOnSubmit = (data: any) => {
        const fetchData = async () => {
            setState({ ...state, loading: true })
            try {
                const result = await studentService.fetchEmailverify(data);
                console.log(result.data);
                setState({ ...state, data: result.data, loading: false });
                if (result.data.success) {
                    const userId = result.data.data.userId;
                    console.log(userId);
                    dispatch(saveLogin(result.data));
                    navigate("/verify");
                }
                else {
                    navigate("/signup");
                }
            } catch (error) {
                console.log(error);
                setState({ ...state, loading: false })
            }
        }
        fetchData();

    }
    return (
        <>
            <div className="flex">
                <div><ImageComponent src={img2} className="h-screen w-630" /></div>
                <div className="w-1/2 p-8">
                    <ImageComponent src={img3} className="h-[68px] w-[120px] mt-[18px] ml-[420px] mr-[300px]" />
                    <div className="ml-[50px]">
                        <TextField children="Create Account" className="text-[28px] font-[600] text-[#0C0531] mt-8 mb-8" />
                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                            <div className="flex space-x-12 pt-6">
                                <div>
                                    <FormField
                                        name="fname"
                                        control={control}
                                        type="text"
                                        children="Enter First Name"
                                        rules={{
                                            required: "First Name is required",
                                            pattern: {
                                                value: /^[A-Za-z\s]+$/,
                                                message: "Name should only contain alphabets and spaces",
                                            },
                                            minLength: {
                                                value: 2,
                                                message: "Minimum length must be 2",
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "Maximum length must be 50",
                                            },
                                        }}
                                    />

                                </div>
                                <div>
                                    <FormField
                                        name="lname"
                                        control={control}
                                        type="text"
                                        children="Enter Last Name"
                                        rules={{
                                            required: "Last Name is required",
                                            pattern: {
                                                value: /^[A-Za-z\s]+$/,
                                                message: "Name should only contain alphabets and spaces",
                                            },
                                            minLength: {
                                                value: 2,
                                                message: "Minimum length must be 2",
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "Maximum length must be 50",
                                            },
                                        }}
                                    />

                                </div>
                            </div>
                            <div className="flex space-x-12 pb-4">
                                <div>
                                    <FormField
                                        name="userName"
                                        control={control}
                                        type="text"
                                        children="Enter Username"
                                        rules={{
                                            required: "Username is required",
                                            pattern: {
                                                value: /^[A-Za-z0-9\s]+$/,
                                                message: "Name should only contain alphabets, digits, and spaces",
                                            },
                                            minLength: {
                                                value: 2,
                                                message: "Minimum length must be 2",
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "Maximum length must be 50",
                                            },
                                        }}
                                    />
                                </div>
                                <div>
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
                            </div>
                            <div className="flex space-x-12 pb-4">
                                <div>
                                    <FormField
                                        name="password"
                                        control={control}
                                        type="password"
                                        children="Enter Password"
                                        rules={{
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message:
                                                    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one symbol, and one digit",
                                            },
                                        }}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        name="confirmPassword"
                                        control={control}
                                        type="password"
                                        children="Confirm Password"
                                        rules={{
                                            required: 'Confirm Password is required',
                                            validate: (value: string) => value === password || 'Passwords do not match',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-12 pb-4">
                                <div className="pb-2">
                                    <FormField
                                        name="phoneNumber"
                                        control={control}
                                        type="tel"
                                        children="Enter Phone Number"
                                        rules={{
                                            required: 'Phone Number is required',
                                            pattern: {
                                                value: /^\+88\d{11}$/,
                                                message: 'Invalid phone number. Must start with +88 and have 13 digits.',
                                            },
                                        }}
                                    />
                                </div>
                                <div className="justify-center p-2">
                                    <Button text="Register" className="w-80 h-14 p-4 mt-9  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" />

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
    // return (
    //     <>
    //         <div className="flex">
    //             <div>
    //                 <ImageComponent src={img2} className="h-screen w-653" />
    //             </div>
    //             <div className="w-1/2 p-4">
    //                 <div>
    //                     <ImageComponent src={img3} className="h-[68px] w-[120px] mt-[60px] ml-[420px] mr-[300px]" />
    //                 </div>
    //                 <div>
    //                 <div>
    //                     <TextField children="Create Account" className="text-[28px] font-[600] text-[#0C0531] mt-8 mb-8" />
    //                 </div>
    //                 <div className="flex justify-center h-screen mt-16">
    //                     <form onSubmit={handleSubmit(handleOnSubmit)}>
    //                         <div className="flex space-x-12 pb-4">
    //                             <div>
    //                                 <FormField
    //                                     name="fname"
    //                                     control={control}
    //                                     type="text"
    //                                     children="Enter First Name"
    //                                     rules={{
    //                                         required: "First Name is required",
    //                                         pattern: {
    //                                             value: /^[A-Za-z\s]+$/,
    //                                             message: "Name should only contain alphabets and spaces",
    //                                         },
    //                                         minLength: {
    //                                             value: 2,
    //                                             message: "Minimum length must be 2",
    //                                         },
    //                                         maxLength: {
    //                                             value: 50,
    //                                             message: "Maximum length must be 50",
    //                                         },
    //                                     }}
    //                                 />

    //                             </div>
    //                             <div>
    //                                 <FormField
    //                                     name="lname"
    //                                     control={control}
    //                                     type="text"
    //                                     children="Enter Last Name"
    //                                     rules={{
    //                                         required: "Last Name is required",
    //                                         pattern: {
    //                                             value: /^[A-Za-z\s]+$/,
    //                                             message: "Name should only contain alphabets and spaces",
    //                                         },
    //                                         minLength: {
    //                                             value: 2,
    //                                             message: "Minimum length must be 2",
    //                                         },
    //                                         maxLength: {
    //                                             value: 50,
    //                                             message: "Maximum length must be 50",
    //                                         },
    //                                     }}
    //                                 />

    //                             </div>
    //                         </div>
    //                         <div className="flex space-x-12 pb-4">
    //                             <div>
    //                                 <FormField
    //                                     name="userName"
    //                                     control={control}
    //                                     type="text"
    //                                     children="Enter Username"
    //                                     rules={{
    //                                         required: "Username is required",
    //                                         pattern: {
    //                                             value: /^[A-Za-z0-9\s]+$/,
    //                                             message: "Name should only contain alphabets, digits, and spaces",
    //                                         },
    //                                         minLength: {
    //                                             value: 2,
    //                                             message: "Minimum length must be 2",
    //                                         },
    //                                         maxLength: {
    //                                             value: 50,
    //                                             message: "Maximum length must be 50",
    //                                         },
    //                                     }}
    //                                 />
    //                             </div>
    //                             <div>
    //                                 <FormField
    //                                     name="email"
    //                                     control={control}
    //                                     type="text"
    //                                     children="Enter Email"
    //                                     rules={{
    //                                         required: "Email is required",
    //                                         pattern: {
    //                                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //                                             message: "Invalid email address",
    //                                         },
    //                                     }}
    //                                 />
    //                             </div>
    //                         </div>
    //                         <div className="flex space-x-12 pb-4">
    //                             <div>
    //                                 <FormField
    //                                     name="password"
    //                                     control={control}
    //                                     type="password"
    //                                     children="Enter Password"
    //                                     rules={{
    //                                         required: "Password is required",
    //                                         pattern: {
    //                                             value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //                                             message:
    //                                                 "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one symbol, and one digit",
    //                                         },
    //                                     }}
    //                                 />
    //                             </div>
    //                             <div>
    //                                 <FormField
    //                                     name="confirmPassword"
    //                                     control={control}
    //                                     type="password"
    //                                     children="Confirm Password"
    //                                     rules={{
    //                                         required: 'Confirm Password is required',
    //                                         validate: (value: string) => value === password || 'Passwords do not match',
    //                                     }}
    //                                 />
    //                             </div>
    //                         </div>
    //                         <div className="pb-2">
    //                             <FormField
    //                                 name="phoneNumber"
    //                                 control={control}
    //                                 type="tel"
    //                                 children="Enter Phone Number"
    //                                 rules={{
    //                                     required: 'Phone Number is required',
    //                                     pattern: {
    //                                         value: /^\+88\d{11}$/,
    //                                         message: 'Invalid phone number. Must start with +88 and have 13 digits.',
    //                                     },
    //                                 }}
    //                             />
    //                         </div>
    //                         <div className="justify-center">
    //                             <Button text="Register" className="w-40 h-15 p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" />
    //                         </div>

    //                     </form>
    //                 </div>

    //             </div>
    //         </div>
    //     </div >

    //     </>
    // )
}
export default Signup;