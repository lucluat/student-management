import {Button, Input, message, Row} from "antd";
import {useEffect, useState} from "react";
import {LoginServiceApi} from "../../service/authentication/LoginApiService"
import {setToken, setRefreshToken, getToken} from "../../helper/UserToken";

const Login = () => {
    const [info, setInfo] = useState(null);
    const handleLogin = () => {
        if (info?.username && info?.password) {
            LoginServiceApi.login(info).then((response) => {
                setToken(response?.data?.data + "");
                setRefreshToken(response?.data?.data + "");
                window.location.href = "/admin/student-management"
            }).catch((error) => {
                message.error(error?.response?.data?.message);
            })
        } else {
            message.error("Tài khoản và mật khẩu không được trống!");
        }
    }

    useEffect(() => {
        if (getToken() !== "") {
            window.location.href = "/admin/student-management";
        }
    }, [])
    return (
        <div style={{backgroundColor: "#C0C0C0"}}>
            <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <div className="container"
                     style={{
                         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                         borderRadius: "10px",
                         width: "30%",
                         backgroundColor: "white"
                     }}>
                    <section>
                        <div>
                            <div>
                                <div>
                                    <h1>
                                        Sign in to your account
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <Row style={{margin: "20px"}}>
                                            <label style={{margin: "10px"}} htmlFor="email"
                                                   className="block mb-2 text-sm font-medium
                                                   text-gray-900 dark:text-white">User
                                                name</label>
                                            <Input value={info?.username}
                                                   onChange={(e) => {
                                                       setInfo((pre) => ({...pre, username: e.target.value}))
                                                   }}
                                                   type="email" name="email" id="email"
                                                   placeholder="User name" required=""/>
                                            <Row style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                {/*<span style={{color: "red"}}>{errorUsername}</span>*/}
                                            </Row>
                                        </Row>
                                        <Row style={{margin: "20px"}}>
                                            <label style={{margin: "10px"}} htmlFor="password"
                                                   className="block mb-2 text-sm
                                                   font-medium text-gray-900 dark:text-white">Password</label>
                                            <Input type="password"
                                                   value={info?.password}
                                                   onChange={(e) => {
                                                       setInfo((pre) => ({...pre, password: e.target.value}))
                                                   }}
                                                   name="password" id="password" placeholder="••••••••"
                                                   required=""/>
                                            <Row style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                {/*<span style={{color: "red"}}>{errorPassword}</span>*/}
                                            </Row>

                                        </Row>
                                        <Button color="default" variant="solid" onClick={handleLogin}>
                                            Login
                                        </Button>
                                        <p>
                                            Don’t have an account yet? <a href="/register">Sign
                                            up</a>
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

export default Login;