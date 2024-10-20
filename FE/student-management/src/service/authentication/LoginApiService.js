import { request } from "../../helper/request.helper";

export class LoginServiceApi {

    static URL = "login";

    static login= (data) => {
        return request({
            method: "POST",
            url: `/${this.URL}`,
            data: data,
        });
    };
}