import SideBar from "../molecules/sideBar";
import AdminNavLinks from "../molecules/adminNavLinks";
import Dashboard from "./dashboard";
const AdminLayout = () => {
    return (

        <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
            <SideBar />
            <div className="flex-1">
                <AdminNavLinks />
                <Dashboard />
            </div>
        </div>


    )
}
export default AdminLayout;