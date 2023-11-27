import axiosInstance from "../util/axiosInstance";
export class cartService {
    private static BaseUrl: string = "http://127.0.0.1:8000/cart";
    public static addCartData(formData: any) {
        let addCartURL: string = `${this.BaseUrl}/addToCart`
        return axiosInstance.post(addCartURL, formData);
    }
    public static removeCartData(formData: any) {
        let removeCartURL: string = `${this.BaseUrl}/removeFromCart`
        return axiosInstance.post(removeCartURL, formData);
    }

    public static viewCartData() {
        let viewCartURL: string = `${this.BaseUrl}/viewCart`
        return axiosInstance.get(viewCartURL);
    }

}