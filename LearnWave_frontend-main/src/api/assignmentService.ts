import axiosInstance from "../util/axiosInstance";
export class assignmentService {
    private static BaseUrl: string = "http://127.0.0.1:8000/assignment";
    public static deleteAssignment(data: any) {
        let deleteAssignmentURL: string = `${this.BaseUrl}/deleteAssignment`
        return axiosInstance.post(deleteAssignmentURL, data);
    }
    public static editAssignment(data: any) {
        let editAssignmentURL: string = `${this.BaseUrl}/editAssignment`
        return axiosInstance.patch(editAssignmentURL, data);
    }
    public static getAllAssignment(data: any) {
        let getAllAssignmentURL: string = `${this.BaseUrl}/getAllAssignment`
        return axiosInstance.post(getAllAssignmentURL, data);
    }

}

