
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

export const getRefreshToken = () => {
    return getCookie("refreshToken") !== undefined
        ? getCookie("refreshToken")
        : null;
};

export const getStateCookie2=(name)=> {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export const getTokenObj = () => {
    const tokenObj = {
        accessToken: getCookie("userToken"),
        refreshToken: getCookie("refreshToken"),
    };
    return JSON.stringify(tokenObj);
}

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


