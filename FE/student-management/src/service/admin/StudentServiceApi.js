import { request } from "../../helper/request.helper";

export class StudentServiceApi {

    static URL = "admin/student-management";

    static fetchAll = (filter) => {
        let data = {...filter,keyword:filter?.keyword?filter.keyword.trim():null}
        return request({
            method: "GET",
            url: `/${this.URL}`,
            params: data,
        });
    };

    static addStudent = (data) => {
        return request({
            method: "POST",
            url: `/${this.URL}`,
            data: data,
        });
    };

    static updateStudent = (data) => {
        return request({
            method: "PUT",
            url: `/${this.URL}`,
            data: data,
        });
    };

    static deleteStudent = (id) => {
        return request({
            method: "DELETE",
            url: `/${this.URL}/${id}`,
        });
    };

}