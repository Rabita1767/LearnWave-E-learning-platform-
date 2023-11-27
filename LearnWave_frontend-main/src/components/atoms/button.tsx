interface IButton {
    className: string,
    onClick?: () => void,
    type?: "button" | "submit" | "reset",
    text?: string | number,
    children?: React.ReactNode,
    disabled?: boolean | undefined
}
const Button: React.FC<IButton> = ({ onClick, type, className, text, children, disabled }) => {
    return (
        <button onClick={onClick} type={type} className={className} disabled={disabled}>{text} {children}</button>
    )
}
export default Button;