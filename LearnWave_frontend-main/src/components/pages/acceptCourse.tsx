import ViewInstructor from "../organisms/viewInstructor"
import SideBar from "../molecules/sideBar"
const AcceptCourse = () => {
    return (
        <div className="flex flex-row h-screen w-screen">
            <SideBar />
            <div className="flex-1 flex-shrink-0 space-y-10 flex-col items-center mt-[80px] overflow-x-hidden">
                <ViewInstructor />
            </div>
        </div >
    )
}

export default AcceptCourse