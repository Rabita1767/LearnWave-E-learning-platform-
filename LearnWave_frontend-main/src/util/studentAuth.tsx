import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const StudentAuth: React.FC = () => {
    const studentRole = useSelector((state: RootState) => state.auth.role);
    // const role = localStorage.getItem("role");
    console.log("Authenticating", studentRole);

    return studentRole === 2 ? (
        <div>
            <Outlet />{" "}
        </div>
    ) : (
        <Navigate to="/login" />
    );
};

export default StudentAuth;