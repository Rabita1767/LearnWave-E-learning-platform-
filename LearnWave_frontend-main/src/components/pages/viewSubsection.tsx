import SideBar from "../molecules/sideBar";
import SubSection from "../organisms/subSection";
import SubSectionList from "./subSectionList";
const ViewSubsection: React.FC = () => {
    return (
        <>
            <div className="flex flex-row h-screen w-screen">
                <SideBar />
                <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[80px] overflow-x-hidden">
                    <div className="w-[60%] ml-[80px] space-x-4 px-12 py-6">
                        <SubSectionList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewSubsection