import axios from "axios";
export class commonService {
    private static BaseUrl: string = "http://127.0.0.1:8000/common";
    public static fetchCourseData() {
        let courseURL: string = `${this.BaseUrl}/getAllCourse`
        return axios.get(courseURL);
    }
}