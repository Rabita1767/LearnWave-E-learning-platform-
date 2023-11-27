import Layout from "../templates/layout";
import "../../util/style.scss";
const Transaction: React.FC = () => {
    return (
        <div>
            <Layout>
                <div className="circle__box">
                    <div className="circle__wrapper circle__wrapper--right">
                        <div className="circle__whole circle__right"></div>
                    </div>
                    <div className="circle__wrapper circle__wrapper--left">
                        <div className="circle__whole circle__left"></div>
                    </div>
                    <div className="circle__checkmark">
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-[40px] font-[600] text-[#2D2F31]">
                        A subscription request has been sent to your account!
                    </p>
                </div>
            </Layout>
        </div>
    )
}

export default Transaction;