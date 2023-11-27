import ImageComponent from "../atoms/imageAtom";
import logo from "../../assets/Logo1.png";
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_INSTRUCTOR_LINKS } from "../../lib/constants/navigation";
import SideBarLink from "../atoms/sideBarLink";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { removeLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import navigate, { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const linkClass =
    'flex items-center gap-2 font-light px-8 py-4 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
const SideBar: React.FC = () => {
    const userRole = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.removeItem("token");
        console.log("log out button clicked");
        dispatch(removeLogin());
        navigate("/common");
    }
    return (

        <div className="flex flex-col bg-[#0C0531] w-60 p-3 text-[#fff]">
            <div className="pt-4 pl-10 py-3 pb-8">
                <div><ImageComponent src={logo} className="h-[55px] w-[100px]" /></div>
            </div>
            {userRole === 1 ? (
                <div className="flex-1">
                    {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                        <SideBarLink key={item.key} item={item} />
                    ))}
                </div>
            ) : (
                <div className="flex-1">
                    {DASHBOARD_SIDEBAR_INSTRUCTOR_LINKS.map((item) => (
                        <SideBarLink key={item.key} item={item} />
                    ))}
                </div>
            )}
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SideBarLink key={item.key} item={item} />
                ))}
                <div className={`cursor-pointer ${linkClass}`} onClick={onLogout}>
                    <span>
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>


    )

}


export default SideBar;