import ListItem from "../atoms/listItem";

const NavLink: React.FC<{ items: string[] }> = ({ items }) => {
    return (
        <>
            <ul>
                {
                    items.map((item, index) => (
                        <ListItem key={index} className="text-customText font-poppins text-customFont font-normal mb-4 sm:mb-0">
                            {item}
                        </ListItem>
                    ))
                }
            </ul>
        </>
    )
}

const InstructorNavLink: React.FC = () => {
    const itemsArray = ["Courses", "Students", "Profile"]
    return (
        <div>
            <NavLink items={itemsArray} />
        </div>
    )

}
export default InstructorNavLink;