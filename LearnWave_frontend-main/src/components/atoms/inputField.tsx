import { Controller, Control, FieldValues } from 'react-hook-form';

interface IForm {
    name: string;
    control: Control<FieldValues>;
    type: string;
    placeholder?: string;
    className?: string;
    rules?: Object;
}

const InputField: React.FC<IForm> = ({ name, control, type, placeholder, className, rules }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <>
                        <input
                            className={className}
                            type={type}
                            placeholder={placeholder}
                            {...field}
                        />
                        {fieldState?.error && <p>{fieldState?.error?.message}</p>}
                    </>
                )}
            />
        </>
    );
};

export default InputField;
