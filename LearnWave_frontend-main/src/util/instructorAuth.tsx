import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const InstructorAuth: React.FC = () => {
    const instructorRole = useSelector((state: RootState) => state.auth.role);
    // const role = localStorage.getItem("role");
    console.log("Authenticating", instructorRole);

    return instructorRole === 3 ? (
        <div>
            <Outlet />{" "}
        </div>
    ) : (
        <Navigate to="/instructorLogin" />
    );
};

export default InstructorAuth;