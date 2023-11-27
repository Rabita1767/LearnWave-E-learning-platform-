interface IDiv {
    children: React.ReactNode
}
const Div: React.FC<IDiv> = ({ children }) => {
    return (
        <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex-items-center">{children}</div>
    )
}

export default Div;