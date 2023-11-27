import axiosInstance from "../util/axiosInstance";
export class subscriptionService {
    private static BaseUrl: string = "http://127.0.0.1:8000/subscription";
    public static sendSubscription() {
        let subscriptionURL: string = `${this.BaseUrl}/sendSubcriptionRequest`
        return axiosInstance.post(subscriptionURL);
    }
    public static acceptSubscription(data) {
        let acceptSubscriptionURL: string = `${this.BaseUrl}/confirmSubscription`
        return axiosInstance.post(acceptSubscriptionURL, data);
    }
    public static rejectSubscription(data) {
        let rejectSubscriptionURL: string = `${this.BaseUrl}/rejectSubscription`
        return axiosInstance.post(rejectSubscriptionURL, data);
    }

    public static clearNotification(data) {
        let clearNotificationURL: string = `${this.BaseUrl}/clearNotification`
        return axiosInstance.post(clearNotificationURL, data);
    }

}

