import { Link, useLocation } from "react-router-dom";
interface IItem {
    item: {
        key: string,
        label: string,
        path: string,
        icon: React.ReactNode
    }
}
const linkClass =
    'flex items-center gap-2 font-light px-8 py-4 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
const SideBarLink: React.FC<IItem> = ({ item }) => {
    const path = useLocation();
    return (
        <Link className={path.toString() === item.path ? "bg-neutral-700 text-white" : linkClass} to={item.path}>
            <span>
                {item.icon}
            </span>
            {item.label}
        </Link>
    )
}
export default SideBarLink;