import ImageComponent from "../atoms/imageAtom";
import img1 from "../../assets/Rectangle 4.png";
import Layout from "../templates/layout";
import View from "../organisms/view";
const ViewUnenrolledDetails = () => {
    return (
        <>
            <Layout>
                <div className="flex ml-20 mt-16 flex-col sm:flex-row">
                    <div>
                        <ImageComponent src={img1} className="h-594 w-653" />
                    </div>
                    <div className="w-1/2 p-10">
                        <View />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ViewUnenrolledDetails