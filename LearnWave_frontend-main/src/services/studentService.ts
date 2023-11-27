import axios from "axios";
export class studentService {
    private static BaseUrl: string = "http://127.0.0.1:8000/student";
    public static fetchEmailverify(formData: any) {
        let authURL: string = `${this.BaseUrl}/auth`
        return axios.post(authURL, formData);
    }

}