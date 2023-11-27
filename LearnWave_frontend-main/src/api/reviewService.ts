import axiosInstance from "../util/axiosInstance";
export class reviewService {
    private static BaseUrl: string = "http://127.0.0.1:8000/review";
    public static addReview(formData: any) {
        let addReviewtURL: string = `${this.BaseUrl}/addReview`
        return axiosInstance.post(addReviewtURL, formData);
    }
    public static getAllReview(formData: any) {
        let getAllReviewURL: string = `${this.BaseUrl}/getAllReview`
        return axiosInstance.post(getAllReviewURL, formData);
    }
    public static updateReview(formData: any) {
        let updateReviewURL: string = `${this.BaseUrl}/updateReview`
        return axiosInstance.patch(updateReviewURL, formData);
    }
    public static deleteReview(formData: any) {
        let deleteReviewURL: string = `${this.BaseUrl}/deleteReview`
        return axiosInstance.post(deleteReviewURL, formData);
    }


}