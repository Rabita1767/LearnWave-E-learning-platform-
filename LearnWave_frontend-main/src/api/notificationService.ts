import axiosInstance from "../util/axiosInstance";
export class notificationService {
    private static BaseUrl: string = "http://127.0.0.1:8000/notification";
    public static getNotification() {
        let notificationURL: string = `${this.BaseUrl}/getSubscriptionNotification`
        return axiosInstance.get(notificationURL);
    }


}