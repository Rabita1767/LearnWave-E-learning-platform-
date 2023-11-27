import HeaderLeft from "../molecules/headerLeft";
import img from "../../assets/img.png";
import ImageComponent from "../atoms/imageAtom";
const Header: React.FC = () => {
    return (
        <>
            <div className="flex bg-customBg mt-[-20px]">
                <div className="w-1/2 ml-20 mt-16">
                    <HeaderLeft />
                </div>
                <div>
                    <ImageComponent src={img} className="mt-4 ml-16" />
                    {/* <img src={img} alt="" className="mt-4 ml-16" /> */}
                </div>
            </div>
        </>
    )
}
export default Header;