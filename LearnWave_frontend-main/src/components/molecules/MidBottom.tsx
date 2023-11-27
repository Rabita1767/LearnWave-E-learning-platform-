import TextField from "../atoms/textField";
const MidBottom: React.FC = () => {
    return (
        <>
            <div className="text-center mt-16 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
                <TextField children="Our Explore Course" className="text-midTextSize text-customHeadingText font-midFontWeight font-sans mb-6" />
                <TextField children="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical" className="text-customText text-midPPTextSize md:ml-14 m-4" />
            </div>

        </>
    )
}
export default MidBottom;