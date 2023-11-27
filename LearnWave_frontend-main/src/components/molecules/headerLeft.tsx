import TextField from "../atoms/textField";
import Button from "../atoms/button";
import { useNavigate } from "react-router-dom";
const HeaderLeft: React.FC = () => {
    const navigate = useNavigate();
    const handleCourse = () => {
        navigate("/viewAllCourse");
    }
    return (
        <>

            <div className="mb-12">
                <TextField className="font-sans text-customHeadingText text-customHeadingFont leading-11 font-custom tracking-normal">
                    Start <span className="bg-gradient-to-r from-green-500 via-transparent to-red-500 text-transparent bg-clip-text">learning</span> skill From your favorite mentor
                </TextField>
            </div>

            <div className="pb-6">
                <TextField className="text-customTextSize text-customText font-custom" children="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC," />
            </div>
            <div>
                <Button type='submit' text="Explore Course" onClick={handleCourse} className="w-55 h-15 p-2 rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" />
            </div>

        </>

    )

}
export default HeaderLeft;