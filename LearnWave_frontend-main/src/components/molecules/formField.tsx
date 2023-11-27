import TextField from "../atoms/textField";
import InputField from "../atoms/inputField";
import { Control } from "react-hook-form";
interface IformField {
    children?: React.ReactNode,
    name: string,
    control: Control,
    type: string,
    placeholder?: string,
    rules?: object,

}
const FormField: React.FC<IformField> = ({ children, name, control, type, placeholder, rules }) => {

    return (
        <>
            <TextField className="text-[22px] font-[450] text-customHeadingText opacity-95 pb-4" children={children} />
            <InputField name={name} control={control} type={type} rules={rules} className="h-[50px] w-[380px] p-[6px] border rounded border-indigo-600 opacity-50" placeholder={placeholder} />
        </>
    )
}
export default FormField;