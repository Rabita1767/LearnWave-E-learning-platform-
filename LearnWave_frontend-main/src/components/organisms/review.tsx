import TextField from "../atoms/textField";
import Button from "../atoms/button";
import ReactStars from "react-rating-stars-component";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { reviewService } from "../../api/reviewService";
import useReviewHook from "../../hooks/reviewHook";
import { DataEntity } from "../../interfaces/review";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
interface IState {
    loading: boolean,
    data: DataEntity[]
}
const Review = () => {
    const [openModal, setOpenModal] = useState(false);
    const [tab, setTab] = useState("");
    const userId = useSelector((state) => state.auth.id);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(userId)
    const { courseId, subsectionId } = useParams();
    console.log(courseId);
    console.log(subsectionId);
    const { add, loading } = useReviewHook();
    const [state, setState] = useState<IState>({
        loading: false,
        data: [] as DataEntity[]
    })

    console.log(courseId);
    const ratingChanged = (newRating) => {
        console.log(newRating);
        setRating(newRating);
    };
    const addReview = () => {
        console.log("review");

        const data =
        {
            course_id: courseId,
            review: review,
            rating: rating
        }
        console.log(data);
        add(data);
        setReview("");
    }
    const handleUpdateReview = async (reviewId) => {

        const data =
        {
            review: review,
            rating: rating,
            review_id: reviewId
        }
        console.log("kdhlkdsldkm.kmf")
        console.log(data);
        const updateReview = async () => {

            try {
                console.log("sahbjsanajnajnajnax")
                const response = await reviewService.updateReview(data);

                console.log(`hello ${response.data}`);
                if (response.data.success) {
                    console.log("ratri")
                    setTab("");
                }

            } catch (error) {
                console.log("hskjhcsjj")
                console.log(error);
            }
        }
        updateReview();

    }
    const deleteReview = (reviewId) => {
        console.log("delete clicked");
        setTab("");
        const data =
        {
            review_id: reviewId
        }
        const deleteReview = async () => {
            try {
                const response = await reviewService.deleteReview(data);
                console.log(response.data);
                if (response.data.success) {
                    setTab("");
                    console.log(`delete tab is ${tab}`)
                }

            } catch (error) {
                console.log(error);
            }

        }
        deleteReview();
    }

    useEffect(() => {
        const data =
        {
            course_id: courseId
        }
        const fetchData = async () => {
            setState({ ...state, loading: true })
            try {
                const response = await reviewService.getAllReview(data);
                console.log(response.data);
                if (response.data.success) {
                    setState({ ...state, loading: false, data: response.data.data })
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, [loading, tab])
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    console.log(state.data);

    const userReview = state.data.find((review) => review.student_id._id.toString() === userId);
    const edit = () => {
        console.log("click");
        setTab("edit")

    }
    console.log(userReview);
    return (
        <>
            {!userReview && tab === "" && (
                <div className="flex mt-[20px] border-2 border-blue-700 p-[20px]">
                    <div className="w-3/4">
                        <div>
                            <TextField children="Leave a Review for this course" className="text-[24px] font-[600]" />
                            <input type="text" name="review" value={review} className="mt-[20px] w-[680px] h-[100px]" onChange={(e) => setReview(e.target.value)} />
                            <Button children="Post" type="submit" className="h-[50px] w-[680px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" onClick={addReview} />
                        </div>
                    </div>
                    <div className="ml-[130px]">
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={28}
                            activeColor="#ffd700"
                        />
                    </div>
                </div >
            )}
            {tab === "" && userReview && (
                <div className="flex ml-[10px] space-x-4">
                    <div className="w-full">
                        <div className="flex space-x-8 mt-6 mb-8 border-t-[2px] pt-6 border-[#2D2F31] border-opacity-30">
                            <div className="mt-[10px]">

                                <FaUserCircle className="text-[40px]" />
                            </div>
                            <div className="w-full">
                                <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700"> {userReview?.student_id.name}</p>
                                <p className="text-[18px] font-[500] opacity-75 mt-[2px]"><ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={28}
                                    value={userReview?.rating}
                                    edit={false}
                                    activeColor="#ffd700"
                                /></p>
                                <p className="text-[18px] font-[500] opacity-75 mt-[2px]">{userReview?.review}</p>
                            </div>
                            <div className="flex space-x-8">
                                <div>
                                    <p className="text-[24px] font-[700] mt-2 cursor-pointer hover:text-[#ac67bf]"  ><FaEdit onClick={edit} /></p>
                                </div>
                                <div>
                                    <p className="text-[24px] font-[700] mt-2 cursor-pointer hover:text-[#ac67bf]">< MdDelete onClick={() => deleteReview(userReview?._id)} /></p>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {tab === "edit" && userReview && (
                <div className="flex mt-[20px] border-2 border-blue-700 p-[20px]">
                    <div className="w-3/4">
                        <div>
                            <TextField children="Leave a Review for this course" className="text-[24px] font-[600]" />
                            <input type="text" name="review" value={review} defaultValue={userReview?.review} className="mt-[20px] w-[680px] h-[100px]" onChange={(e) => setReview(e.target.value)} />
                            <Button children="Update" type="submit" className="h-[50px] w-[680px] p-2 mt-8  rounded-custom border-2 border-custom bg-customButton text-customWhiteText text-customFont font-customWeight" onClick={() => handleUpdateReview(userReview?._id)} />
                        </div>
                    </div>
                    <div className="ml-[130px]">
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={28}
                            activeColor="#ffd700"
                        />
                    </div>
                </div >
            )}
            <div className="flex ml-[10px] space-x-4">
                <div className="w-full">
                    <div>
                        <p className="text-[24px] font-[600] text-[#2D2F31] mt-[30px] cursor-pointer">Reviews</p>
                    </div>
                    {state.data && state.data.length > 0 ? (
                        state.data.map((review) => (
                            <div className="flex space-x-8 mt-6 mb-8 border-t-[2px] pt-6 border-[#2D2F31] border-opacity-30" key={review._id}>
                                <div className="mt-[10px]">
                                    <FaUserCircle className="text-[40px]" />
                                </div>
                                <div className="w-full">
                                    <p className="text-[20px] font-[700] mt-2 cursor-pointer hover:text-purple-700">{review.student_id.name}</p>
                                    <p className="text-[18px] font-[500] opacity-75 mt-[2px]">
                                        <ReactStars
                                            count={5}
                                            onChange={ratingChanged}
                                            size={28}
                                            value={review.rating}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    </p>
                                    <p className="text-[18px] font-[500] opacity-75 mt-[2px]">{review.review}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>No reviews yet!</p>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default Review