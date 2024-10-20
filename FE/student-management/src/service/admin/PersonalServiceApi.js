import { request } from "../../helper/request.helper";

export class PersonalServiceApi {

    static URL = "admin/personal-information";

    static fetchAll = (id) => {
        return request({
            method: "GET",
            url: `/${this.URL}/${id}`,
        });
    };

    static addPersonal= (data) => {
        return request({
            method: "POST",
            url: `/${this.URL}`,
            data: data,
        });
    };

    static updatePersonal= (data) => {
        return request({
            method: "PUT",
            url: `/${this.URL}`,
            data: data,
        });
    };

    static deletePersonal = (id) => {
        return request({
            method: "DELETE",
            url: `/${this.URL}/${id}`,
        });
    };

}