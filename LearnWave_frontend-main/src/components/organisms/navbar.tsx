import React from "react";
import NavLinks from "../molecules/navLink";
import ButtonSet from "../molecules/Button";
const Navbar: React.FC = () => {
    return (
        <>
            <div className="flex justify-end p-4 pt-2">
                <NavLinks />
                <div className="p-4">
                    <ButtonSet />
                </div>
            </div>
        </>
    )

}
export default Navbar;