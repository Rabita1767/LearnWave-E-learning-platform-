import React from "react";
import ListItem from "../atoms/listItem";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const NavLinks: React.FC = () => {
    const path = useLocation();
    console.log(path.pathname);
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-10 list-none mb-6 mt-6">


                {path.pathname === "/common" ? (
                    <ListItem className="text-customText font-poppins text-customFont font-normal mb-4 sm:mb-0">
                        <Link to="/instructorLogin">Join as an Instructor</Link>
                    </ListItem>
                ) : (
                    <>
                        <ListItem className="font-poppins text-customFont font-customWeight relative mb-4 sm:mb-0">
                            <span className="bg-gradient-to-r from-green-500 via-transparent to-red-500 text-transparent bg-clip-text">
                                <Link to="/">Home</Link>
                            </span>
                        </ListItem>
                        <ListItem className="text-customText font-poppins text-customFont font-normal mb-4 sm:mb-0">
                            <Link to="/viewAllCourse">Courses</Link>
                        </ListItem>
                        <ListItem className="text-customText font-poppins text-customFont font-normal mb-4 sm:mb-0">
                            <Link to="/instructorLogin">Instructor</Link>
                        </ListItem>
                        <ListItem className="text-customText font-poppins text-customFont font-normal mb-4 sm:mb-0">
                            <Link to="/enrolledCourses">My Learning</Link>
                        </ListItem>
                    </>
                )}
            </div>
        </>
    )
}
// interface IItem {
//     content: string,
//     style: string
// }
// interface IItems {
//     items: IItem[]
// }
// const ListLinks: React.FC<IItems> = ({ items }) => {
//     return (
//         <>
//             <ul>
//                 {items.map((item, index) => (
//                     <ListItem key={index} className={item.style}>
//                         {item.content}
//                     </ListItem>
//                 ))}
//             </ul>
//         </>
//     )

// }
// const NavLinks: React.FC = () => {
//     const listArray = [{ content: "Home", style: "font-poppins text-customFont font-customWeight relative mb-4 sm:mb-0" }, { content: "Courses", style: "text-customText font-poppins text-customFont font-normal mb-4 sm:mb-0" }, { content: "Courses", style: "text-customText font-poppins text-customFont font-normal mb-4 sm:mb-0" }, { content: "Courses", style: "text-customText font-poppins text-customFont font-normal mb-4 sm:mb-0" }]
//     return (
//         <div className="flex flex-col sm:flex-row justify-center items-center gap-10 list-none mb-6 mt-6">
//             <ListLinks items={listArray} />
//         </div>
//     )

// }
export default NavLinks;