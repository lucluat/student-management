
import {jwtDecode} from "jwt-decode";
import { getCookie, setCookie } from "./cookie";

export const getToken = () => {
    return getCookie("userToken") || "";
};

export const setToken = (token) => {
    setCookie("userToken", token, 1);
};

export const setRefreshToken = (token) => {
    setCookie("refreshToken", token, 1);
};

export const deleteToken = () => {
    setCookie("userToken", "", 1);
};

export const isTokenValid = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp > Date.now() / 1000) {
            return true;
        }
        return false;
    } catch (error) {
        return false; // Nếu có lỗi khi giải mã, nghĩa là token không hợp lệ
    }
};
export const userToken = () => {
    return getCookie("accountUser") !== undefined
        ? getCookie("accountUser")
        : null;
};


