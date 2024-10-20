import { request } from "../../helper/request.helper";

export class PersonalServiceApi {

    static URL = "admin/personal-information";

    static fetchAll = (filter) => {
        return request({
            method: "GET",
            url: `/${this.URL}`,
            params: filter,
        });
    };


}