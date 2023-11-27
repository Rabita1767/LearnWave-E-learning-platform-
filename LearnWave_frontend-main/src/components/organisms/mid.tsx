import MidRight from "../molecules/midRight";
import ImageComponent from "../atoms/imageAtom";
import img1 from "../../assets/Rectangle 4.png";
const Mid: React.FC = () => {
    return (
        <>
            <div className="flex ml-20 mt-16 flex-col sm:flex-row">
                <div>
                    <ImageComponent src={img1} className="h-594 w-653" />
                </div>
                <div className="w-1/2 p-10">
                    <MidRight />
                </div>
            </div>
        </>
    )
}
export default Mid;