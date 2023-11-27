interface IInput {
    type: string,
    className: string,
    placeholder: string,
    name: string
}
const Input: React.FC<IInput> = ({ type, className, placeholder, name }) => {
    return (
        <div>
            <input type={type} className={className} placeholder={placeholder} name={name} />
        </div>
    )
}

export default Input;