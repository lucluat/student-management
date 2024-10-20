import { request } from "../../helper/request.helper";

export class RegisterApiService {

    static URL = "register";

    static login= (data) => {
        return request({
            method: "POST",
            url: `/${this.URL}`,
            data: data,
        });
    };
}