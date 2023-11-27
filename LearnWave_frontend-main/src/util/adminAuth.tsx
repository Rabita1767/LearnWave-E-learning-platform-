import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminAuth: React.FC = () => {
    const adminRole = useSelector((state: RootState) => state.auth.role);
    // const role = localStorage.getItem("role");
    console.log("Authenticating", adminRole);

    return adminRole === 1 ? (
        <div>
            <Outlet />{" "}
        </div>
    ) : (
        <Navigate to="/adminLogin" />
    );
};

export default AdminAuth;