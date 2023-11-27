interface IList {
    className?: string,
    children: React.ReactNode
}
const ListItem: React.FC<IList> = ({ className, children }) => {
    return (
        <>
            <li className={className}>{children}</li>
        </>
    )
}
export default ListItem;