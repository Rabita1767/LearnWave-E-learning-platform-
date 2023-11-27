import ImageComponent from "../atoms/imageAtom";
import img1 from '../../assets/Amstrad-Logo.wine 1.png';
import img2 from "../../assets/Airbus_Defence_and_Space-Logo.wine 1.png";
import img3 from "../../assets/Aveva-Logo.wine 1.png";
import img4 from "../../assets/BIOVIA-Logo.wine 1.png";
import img5 from "../../assets/Sophos-Logo.wine 1.png";
import img6 from "../../assets/SpaceX-Logo.wine 1.png";
const Logos: React.FC = () => {
    return (
        <>
            <div className="flex mt-6 justify-center">
                <ImageComponent src={img1} className="h-153 w-230" />
                <ImageComponent src={img2} className="h-153 w-230" />
                <ImageComponent src={img3} className="h-153 w-230" />
                <ImageComponent src={img4} className="h-153 w-230" />
                <ImageComponent src={img5} className="h-153 w-230" />
                <ImageComponent src={img6} className="h-153 w-230" />
            </div>
        </>

    )
}
export default Logos;