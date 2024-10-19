/** @format */

import { deleteToken, getToken, isTokenValid } from "../helper/UserToken";

const AuthGuard = ({ children, levels }) => {

    const userToken = getToken();
    if (!isTokenValid(userToken)) {
        deleteToken();
        // window.location.href = "/login";
    }

    return children;
};

export default AuthGuard;
