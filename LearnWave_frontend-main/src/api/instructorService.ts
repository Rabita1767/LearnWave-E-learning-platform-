import axiosInstance from "../util/axiosInstance";
export class instructorService {
    private static BaseUrl: string = "http://127.0.0.1:8000/instructor";

    public static fetchVideoData(data: { subsection_id: string | undefined }) {
        let videoURL: string = `${this.BaseUrl}/getVideo`
        return axiosInstance.post(videoURL, data);
    }

    public static addCourse(data: any) {
        let addCourseURL: string = `${this.BaseUrl}/addCourse`
        return axiosInstance.post(addCourseURL, data);
    }
    public static addSection(data: any) {
        let addSectionURL: string = `${this.BaseUrl}/addSection`
        return axiosInstance.post(addSectionURL, data);
    }
    public static uploadVideo(data: any) {
        let uploadVideoURL: string = `${this.BaseUrl}/uploadVideo`
        return axiosInstance.post(uploadVideoURL, data);
    }
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
    public static addAssignment(formData: any) {
        let addAssignmentURL: string = `${this.BaseUrl}/addAssignment`
        return axiosInstance.post(addAssignmentURL, formData);
    }
    public static getSubsectionById(formData: any) {
        let getSubsectionByIdURL: string = `${this.BaseUrl}/getSubsectionById`
        return axiosInstance.post(getSubsectionByIdURL, formData);
    }
    public static getAllVideoData(formData: any) {
        let getAllVideoDataURL: string = `${this.BaseUrl}/getAllVideo`
        return axiosInstance.post(getAllVideoDataURL, formData);
    }
    public static deleteVideo(formData: any) {
        let deleteVideoURL: string = `${this.BaseUrl}/deleteVideo`
        return axiosInstance.post(deleteVideoURL, formData);
    }
    public static sendCourseAddrequest(formData: any) {
        let sendCourseAddrequestURL: string = `${this.BaseUrl}/sendCourseAddrequest`
        return axiosInstance.post(sendCourseAddrequestURL, formData);
    }
    public static getInstructorById() {
        let getInstructorByIdURL: string = `${this.BaseUrl}/getInstructorById`
        return axiosInstance.get(getInstructorByIdURL);
    }
    public static uploadAssignment(formdata: any) {
        let uploadAssignmentURL: string = `${this.BaseUrl}/uploadAssignment`
        return axiosInstance.post(uploadAssignmentURL, formdata);
    }




}
