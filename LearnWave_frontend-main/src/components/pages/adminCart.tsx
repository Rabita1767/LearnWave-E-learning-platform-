import AdminCartDetails from "../organisms/adminCartDetails";
import Layout from "../templates/layout";
import SideBar from "../molecules/sideBar";
const AdminCart = () => {
    return (

        <div className="flex flex-row h-screen w-screen">
            <SideBar />
            <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[80px] overflow-x-hidden">
                <AdminCartDetails />
            </div>
        </div >

    )
}

export default AdminCart;