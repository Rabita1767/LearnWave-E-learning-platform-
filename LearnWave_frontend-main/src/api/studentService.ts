import axiosInstance from "../util/axiosInstance";
export class studentService {
    private static BaseUrl: string = "http://127.0.0.1:8000/student";
    public static fetchEmailverify(formData: any) {
        let authURL: string = `${this.BaseUrl}/auth`
        return axiosInstance.post(authURL, formData);
    }

    public static fetchOTP(formData: any) {
        let authURL: string = `${this.BaseUrl}/verifyMail`
        return axiosInstance.post(authURL, formData);
    }

    public static fetchLogin(formData: any) {
        let authURL: string = `${this.BaseUrl}/login`
        return axiosInstance.post(authURL, formData);
    }

    public static getAssignmentById(formData: any) {
        let getAssignmentByIdURL: string = `${this.BaseUrl}/getAssignmentById`
        return axiosInstance.post(getAssignmentByIdURL, formData);
    }
}

