import {Button, Input, message, Row} from "antd";
import {useEffect, useState} from "react";
import {RegisterApiService} from "../../service/authentication/RegisterServiceApi"
import {getToken} from "../../helper/UserToken";

const Register = () => {
    const [info, setInfo] = useState(null);
    const handleRegister = () => {
        if (info?.username && info?.password) {

            RegisterApiService.login(info).then((response) => {
                message.success("Đăng ký thành công!")
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);
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
                                        Register an account
                                    </h1>
                                    <form action="#">
                                        <Row style={{margin: "20px"}}>
                                            <label style={{margin: "10px"}} htmlFor="email">User
                                                name</label>
                                            <Input value={info?.username}
                                                   onChange={(e) => {
                                                       setInfo((pre) => ({...pre, username: e.target.value}))
                                                   }}
                                                   type="email" name="email" id="email"
                                                   placeholder="User name" required=""/>

                                        </Row>
                                        <Row style={{margin: "20px"}}>
                                            <label style={{margin: "10px"}} htmlFor="password">Password</label>
                                            <Input type="password"
                                                   value={info?.password}
                                                   onChange={(e) => {
                                                       setInfo((pre) => ({...pre, password: e.target.value}))
                                                   }}
                                                   name="password" id="password" placeholder="••••••••"
                                                   required=""/>
                                        </Row>
                                        <Button color="default" variant="solid" onClick={handleRegister}>
                                            Register
                                        </Button>
                                        <p>
                                            You already have an account? <a href="/login">Login</a>
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