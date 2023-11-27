import React from "react";
import Navbar from "../organisms/navbar";
interface ILayout {
    children: React.ReactNode
}
const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>

    )
}
export default Layout;