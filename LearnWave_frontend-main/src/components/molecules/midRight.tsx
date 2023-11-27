import TextField from "../atoms/textField";
import ImageComponent from "../atoms/imageAtom";
import img1 from "../../assets/user.png";
import img2 from "../../assets/Vector.png";
import img3 from "../../assets/certificate.png";
const MidRight: React.FC = () => {
    return (
        <>
            <TextField children="Benefit from our online Learning Expert" className="text-midTextSize text-customHeadingText font-midFontWeight font-sans mb-6 sm:" />
            <div className="flex space-x-4">
                <ImageComponent src={img2} />
                <TextField children="Online Degree" className="text-customHeadingText text-midPTextSize font-midFontWeight" />
            </div>
            <TextField children="Contrary to popular belief, Lorem  popular belief, Lorem Ipsum  is  " className="text-customText text-midPPTextSize ml-14 m-4" />
            <div className="flex space-x-4">
                <ImageComponent src={img3} />
                <TextField children="Short course" className="text-customHeadingText text-midPTextSize font-midFontWeight" />
            </div>
            <TextField children="Contrary to popular belief, Lorem  popular belief, Lorem Ipsum  is  " className="text-customText text-midPPTextSize ml-14 m-4" />
            <div className="flex space-x-4">
                <ImageComponent src={img1} />
                <TextField children="Learn with expert" className="text-customHeadingText text-midPTextSize font-midFontWeight" />
            </div>
            <TextField children="Contrary to popular belief, Lorem  popular belief, Lorem Ipsum  is  " className="text-customText text-midPPTextSize ml-14 m-4" />

        </>

    )
}
export default MidRight;