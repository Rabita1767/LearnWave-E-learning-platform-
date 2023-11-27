import { useParams } from "react-router-dom"
import { quizService } from "../../api/quizService";
import { Data, QuizData } from "../../interfaces/quiz";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import FormField from "../molecules/formField";
import { useNavigate } from "react-router-dom";
import InputField from "../atoms/inputField";
import Button from "../atoms/button";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useQuizHook from "../../hooks/quizHook";
interface IData {
    loading: boolean,
    data: Data,
    errorMsg: string
}
interface IQData {
    Qloading: boolean,
    Qdata: QuizData,
    errorMsg: string
}
const EditQuiz = () => {
    const navigate = useNavigate();
    const { handleSubmit, setValue, control, getValues } = useForm();
    const { quizId, courseId } = useParams();
    const { deleteQuestion } = useQuizHook();
    const [state, setState] = useState<IData>({
        loading: false,
        data: {} as Data,
        errorMsg: ""
    })
    const [quizState, setQuizState] = useState<IQData>({
        Qloading: false,
        Qdata: {} as QuizData,
        errorMsg: ""
    })
    const [formData, setFormData] = useState({});
    const Qdata =
    {
        quiz_id: quizId
    }

    useEffect(() => {
        let isMounted = true;

        const fetchQuizData = async () => {
            try {
                const response = await quizService.fetchQuiz(Qdata);
                if (isMounted && response.data.success) {
                    console.log(response.data.data);
                    setQuizState({ ...quizState, Qdata: response.data.data });
                }
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };

        fetchQuizData();

        return () => {
            isMounted = false;
        };
    }, []);


    console.log(quizState.Qdata);

    useEffect(() => {
        quizState.Qdata.questions?.map((item) => {
            setValue(`questions[${item._id}].question`, item.question);
            setValue(`questions[${item._id}].answer`, item.answer);
            item.options?.map((op) => {
                setValue(`questions[${item._id}].options[${op._id}].value`, op.value);
                setValue(`questions[${item._id}].options[${op._id}]._id`, op._id);
            });
        });
    }, [quizState.Qdata, setValue]);
    console.log(formData);
    const handleOnSubmit = (data) => {
        navigate(`/edited/${courseId}/${quizId}`)
    }
    const handleAnswer = (item_id, op_id) => {
        const selectedOptionValue = getValues(`questions[${item_id}].options[${op_id}]._id`);
        setValue(`questions[${item_id}].answer`, selectedOptionValue);
    }
    const handleEdit = (item_id, op_id) => {
        console.log("edited");
        console.log(item_id);
        console.log(op_id);

        const data =
        {
            quiz_id: quizId,
            questions:
                [
                    {
                        question_id: item_id,
                        question: getValues(`questions[${item_id}].question`),
                        options:
                            [
                                {
                                    option_id: op_id,
                                    option: getValues(`questions[${item_id}].options[${op_id}].value`)
                                }
                            ],
                        answer: getValues(`questions[${item_id}].answer`)
                    }
                ]
        }
        const updateData = async () => {
            try {
                const response = await quizService.editQuiz(data);
                console.log(response.data);
                if (response.data.success) {
                    toast(response.data.message)
                }
            } catch (error) {
                console.log(error);
                toast.error("The quiz could not be updated");
            }
        }
        updateData();
    }
    const handleDelete = (item_id: any) => {
        const data =
        {
            quiz_id: quizId,
            questions:
                [
                    {
                        question_id: item_id
                    }

                ]
        }

        deleteQuestion(data, courseId);
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                {quizState.Qdata.questions?.map((item) => (
                    <div key={item._id} className="mb-8">

                        <div className="mb-[30px]">
                            <p className="text-[26px] font-[600]">Enter Your Question </p>
                            <div className="flex">
                                <div className="w-full">
                                    <InputField name={`questions[${item._id}].question`} control={control} type="text" rules={{ required: 'Question is required' }} className="h-[50px] w-[780px] p-[6px] border rounded border-indigo-600 opacity-80" />
                                </div>

                                <div className="mx-[50px] cursor-pointer">
                                    <p className="text-[30px]" onClick={() => handleDelete(item._id)}><MdDelete /></p>
                                </div>

                            </div>
                        </div>
                        <div className="mb-[30px]">
                            <p className="text-[26px] font-[600]">Enter Your Options</p>
                            {item.options?.map((op) => (
                                <div key={op._id} className="mb-4">
                                    <div className="flex items-center">
                                        <label className="mr-2">
                                            <Controller
                                                control={control}
                                                name={`questions[${item._id}].selectedOption`}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="radio"
                                                        value={op._id}
                                                        onChange={() => handleAnswer(item._id, op._id)}
                                                    />
                                                )}
                                            />
                                        </label>
                                        <div>
                                            <InputField
                                                name={`questions[${item._id}].options[${op._id}].value`}
                                                control={control}
                                                type="text"
                                                rules={{ required: 'Option value is required' }}
                                                className="h-[50px] w-[480px] p-[6px] border rounded border-indigo-600 opacity-80"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex mt-[20px] ml-[40px]">
                                        <div>
                                            <p className="text-[30px] cursor-pointer" onClick={() => handleEdit(item._id, op._id)}>
                                                <FaRegEdit />
                                            </p>
                                        </div>
                                        {/* <div className="mx-[50px] cursor-pointer">
                                            <p className="text-[30px]" onClick={() => handleDelete(item._id)}><MdDelete /></p>
                                        </div> */}
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div>
                            <p className="text-[26px] font-[600]">Enter Your Answer</p>
                            <InputField name={`questions[${item._id}].answer`}
                                control={control}
                                type="text"
                                rules={{ required: 'Answer is required' }}
                                className="h-[50px] w-[480px] p-[6px] border rounded border-indigo-600 opacity-80" />
                        </div>

                    </div>
                ))}
                <div className="justify-center">
                    <Button
                        text="Submit" type="submit"
                        className="h-[50px] w-[380px] p-2 mt-8 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight"
                    />
                </div>
            </form>

        </>
    )
}

export default EditQuiz;