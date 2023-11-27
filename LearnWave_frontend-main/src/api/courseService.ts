import axiosInstance from "../util/axiosInstance";
export class courseService {
    private static BaseUrl: string = "http://127.0.0.1:8000/course";
    public static fetchSectionData(formData: any) {
        let sectionURL: string = `${this.BaseUrl}/getAllSectionData`
        return axiosInstance.post(sectionURL, formData);
    }
    public static fetchSubSection(formData: any) {
        let subsectionURL: string = `${this.BaseUrl}/getAllSubSection`
        return axiosInstance.post(subsectionURL, formData);
    }
    public static fetchEnrolledCourseData() {
        let enrolledCourseURL: string = `${this.BaseUrl}/getEnrolledCourses`
        return axiosInstance.get(enrolledCourseURL);
    }
    public static fetchUnenrolledData() {
        let unenrolledCourseURL: string = `${this.BaseUrl}/getNotEnrolledCourses`
        return axiosInstance.get(unenrolledCourseURL);
    }
    public static markAsCompleted(data: any) {
        let markAsCompletedURL: string = `${this.BaseUrl}/markAsCompleted`
        return axiosInstance.post(markAsCompletedURL, data);
    }
    public static progressCounter(data: string) {
        let progressCounterURL: string = `${this.BaseUrl}/progressCounter`
        return axiosInstance.post(progressCounterURL, data);
    }
    public static getEnrolledCourse() {
        let getEnrolledCourseURL: string = `${this.BaseUrl}/getStudentEnrolled`
        return axiosInstance.get(getEnrolledCourseURL);
    }
    public static findSubsection(data: any) {
        let findSubsectionURL: string = `${this.BaseUrl}/findSubsection`
        return axiosInstance.post(findSubsectionURL, data);
    }
    public static getCourseById(data: any) {
        let getCourseByIdURL: string = `${this.BaseUrl}/getCourseById`
        return axiosInstance.post(getCourseByIdURL, data);
    }
    public static getCoursesByInstructor() {
        let getCoursesByInstructorURL: string = `${this.BaseUrl}/getCoursesByInstructor`
        return axiosInstance.get(getCoursesByInstructorURL);
    }
    public static editCourse(data: any) {
        let editCourseURL: string = `${this.BaseUrl}/editCourse`
        return axiosInstance.patch(editCourseURL, data);
    }
    public static getAllSection(data: any) {
        let getAllSectionURL: string = `${this.BaseUrl}/getAllSection`
        return axiosInstance.post(getAllSectionURL, data);
    }
    public static editSection(data: any) {
        let editSectionURL: string = `${this.BaseUrl}/editSection`
        return axiosInstance.patch(editSectionURL, data);
    }
    public static deleteCourse(data: any) {
        let deleteCourseURL: string = `${this.BaseUrl}/deleteCourse`
        return axiosInstance.post(deleteCourseURL, data);
    }
    public static deleteSection(data: any) {
        let deleteSectionURL: string = `${this.BaseUrl}/deleteSection`
        return axiosInstance.post(deleteSectionURL, data);
    }
    public static getAllCourseAdmin() {
        let getAllCourseURL: string = `${this.BaseUrl}/getAllCourse`
        return axiosInstance.get(getAllCourseURL);
    }







}