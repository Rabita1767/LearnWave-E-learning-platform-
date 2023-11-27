import SideBar from "../molecules/sideBar";
import AdminNavLinks from "../molecules/adminNavLinks";
const Subscription = () => {
    return (
        <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
            <SideBar />
            <div className="flex-1">
                <AdminNavLinks />
                <p>Trasaction table ta y</p>
            </div>
        </div>
    )
}

export default Subscription