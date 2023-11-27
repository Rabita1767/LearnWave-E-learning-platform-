import axiosInstance from "../util/axiosInstance";
export class quizService {
    private static BaseUrl: string = "http://127.0.0.1:8000/quiz";
    public static fetchSubmission(formData: any) {
        let submissionURL: string = `${this.BaseUrl}/submissionExist`
        return axiosInstance.post(submissionURL, formData);
    }
    public static fetchQuiz(formData: any) {
        let quizURL: string = `${this.BaseUrl}/getOneQuiz`
        return axiosInstance.post(quizURL, formData);
    }
    public static submitAnswer(formData: any) {
        let quizSubmiURL: string = `${this.BaseUrl}/answerQuiz`
        return axiosInstance.post(quizSubmiURL, formData);
    }
    public static addQuiz(formData: any) {
        let addQuizURL: string = `${this.BaseUrl}/addQuiz`
        return axiosInstance.post(addQuizURL, formData);
    }
    public static editQuiz(formData: any) {
        let editQuizURL: string = `${this.BaseUrl}/editQuiz`
        return axiosInstance.patch(editQuizURL, formData);
    }
    public static deleteQuiz(formData: any) {
        let deleteQuizURL: string = `${this.BaseUrl}/deleteQuestion`
        return axiosInstance.post(deleteQuizURL, formData);
    }
    public static deleteQuizFull(formData: any) {
        let deleteQuizFullURL: string = `${this.BaseUrl}/deleteQuiz`
        return axiosInstance.post(deleteQuizFullURL, formData);
    }
    public static getAllQuiz(formData: any) {
        let getAllQuizURL: string = `${this.BaseUrl}/getAllQuiz`
        return axiosInstance.post(getAllQuizURL, formData);
    }
    public static submitQuizGetMarks(formData: any) {
        let submitQuizGetMarksURL: string = `${this.BaseUrl}/submitQuizGetMarks`
        return axiosInstance.post(submitQuizGetMarksURL, formData);
    }



}