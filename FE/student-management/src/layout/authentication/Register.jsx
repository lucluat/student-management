import {Button, message, Row} from "antd";
import {useEffect, useState} from "react";
import {RegisterApiService} from "../../service/authentication/RegisterServiceApi"
import {setToken, setRefreshToken, getToken, deleteToken} from "../../helper/UserToken";
import login from "./Login";

const Register = () => {
    const [info, setInfo] = useState(null);
    const handleRegister = () => {
        if (info?.username && info?.password) {

            RegisterApiService.login(info).then((response) => {
                message.success("Đăng ký thành công!")
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2500);
            }).catch((error) => {
                message.error(error?.response?.data?.message)
            })
        } else {
            message.error("Tài khoản hoặc mật khẩu không được trống")
        }
    }

    useEffect(() => {
        if (getToken() !== "") {
            window.location.href = "/admin/student-management";
        }
    }, [])
    return (
        <div>
            <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                <div className="container mx-auto px-4"
                     style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "40%"}}>
                    <section className="bg-gray-50 dark:bg-gray-900">
                        <div
                            className="flex flex-col items-center justify-center px-6 py-8
                            mx-auto md:h-screen lg:py-0">
                            <div
                                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0
                                dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900
                                    md:text-2xl dark:text-white">
                                        Register an account
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div style={{margin: "20px"}}>
                                            <label style={{margin: "10px"}} htmlFor="email"
                                                   className="block mb-2 text-sm font-medium
                                                   text-gray-900 dark:text-white">User
                                                name</label>
                                            <input value={info?.username}
                                                   onChange={(e) => {
                                                       setInfo((pre) => ({...pre, username: e.target.value}))
                                                   }}
                                                   type="email" name="email" id="email"
                                                   className="bg-gray-50 border border-gray-300
                                                   text-gray-900 rounded-lg
                                                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   placeholder="User name" required=""/>

                                        </div>
                                        <div style={{margin: "20px"}}>
                                            <label style={{margin: "10px"}} htmlFor="password"
                                                   className="block mb-2 text-sm
                                                   font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type="password"
                                                   value={info?.password}
                                                   onChange={(e) => {
                                                       setInfo((pre) => ({...pre, password: e.target.value}))
                                                   }}
                                                   name="password" id="password" placeholder="••••••••"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg
                                                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   required=""/>
                                        </div>
                                        <Button color="default" variant="solid" onClick={handleRegister}>
                                            Register
                                        </Button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            You already have an account? <a href="/login"
                                                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Row>
        </div>
    )
}

export default Register;