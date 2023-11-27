import Button from "../atoms/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeLogin } from "../../store/authSlice";
const ButtonSet: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const onSignup = () => {
        navigate("/signup")
    }
    const onLogin = () => {
        navigate("/login")
    }
    const onLogout = () => {
        localStorage.removeItem("token");
        console.log("log out button clicked");
        dispatch(removeLogin());
        navigate("/");
    }
    const onCart = () => {
        console.log("Cart clicked");
        navigate("/cart");
    }
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-10 list-none mb-6 mt-6">
                <div className="pl-6">
                    <Button onClick={token ? onCart : onLogin} type='submit' text={token ? "Cart" : "Log in"} className="w-40 h-15 p-2 rounded-custom border-2 border-custom text-customText text-customFont font-customWeight" />
                </div>
                <Button onClick={token ? onLogout : onSignup} type='submit' text={token ? "Log out" : "Sign up"} className="w-40 h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" />

            </div>
        </>
    )

}
export default ButtonSet;