interface IText {
    className?: string,
    children: React.ReactNode;
}
const TextField: React.FC<IText> = ({ className, children }) => {
    return (
        <p className={className}>{children}</p>
    )

}
export default TextField;