import axiosInstance from "../util/axiosInstance";
export class adminService {
    private static BaseUrl: string = "http://127.0.0.1:8000/admin";
    public static viewCartData(data: any) {
        let viewCartURL: string = `${this.BaseUrl}/viewCart`
        return axiosInstance.post(viewCartURL, data);
    }

    public static fetchLogin(formData: any) {
        let authURL: string = `${this.BaseUrl}/login`
        return axiosInstance.post(authURL, formData);
    }
    public static getAdminNotification() {
        let getAdminNotificationURL: string = `${this.BaseUrl}/getAdminNotification`
        return axiosInstance.get(getAdminNotificationURL);
    }
    public static getInstructor(data) {
        let getInstructorURL: string = `${this.BaseUrl}/getInstructor`
        return axiosInstance.post(getInstructorURL, data);
    }
    public static acceptCourse(data) {
        let acceptCourseURL: string = `${this.BaseUrl}/acceptCourse`
        return axiosInstance.post(acceptCourseURL, data);
    }
    public static getCourseById(data) {
        let courseURL: string = `${this.BaseUrl}/getCourseById`
        return axiosInstance.post(courseURL, data);
    }
    public static rejectCourse(data) {
        let rejectCourseURL: string = `${this.BaseUrl}/rejectCourse`
        return axiosInstance.post(rejectCourseURL, data);
    }
    public static studentCount() {
        let studentCountURL: string = `${this.BaseUrl}/studentCount`
        return axiosInstance.get(studentCountURL);
    }
    public static courseCount() {
        let courseCountURL: string = `${this.BaseUrl}/courseCount`
        return axiosInstance.get(courseCountURL);
    }
    public static getAllStudent() {
        let getAllStudentURL: string = `${this.BaseUrl}/getAllStudent`
        return axiosInstance.get(getAllStudentURL);
    }





}

