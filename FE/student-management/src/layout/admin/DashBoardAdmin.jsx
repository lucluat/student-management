import logo from "../../assets/images/logo.jpeg";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Layout, Row, Menu, Col} from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProjectOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import React from "react";
import {deleteToken, getToken} from "../../helper/UserToken";

const {Header: AntHeader, Content} = Layout;

function DashboardAuthUser({children}) {
    const [selectedKey, setSelectedKey] = useState("");

    let {pathname} = useLocation();
    pathname = pathname.replace("/", "");
    let title = "";

    if (pathname.includes("admin/student-management")) {
        title = "Quản lý sinh viên";
    }
    const [collapsed, setCollapsed] = useState(false);

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    useEffect(() => {
        if (getToken()==""){
            window.location.href = "/login";
        }
    },[])

    const items = [
        getItem(
            <Link to="/admin/student-management">
                <ProjectOutlined style={{marginRight: "8px", marginTop: 7, fontSize: "24px"}}/>
                <span style={{marginLeft: 10, marginRight: 15, fontSize: "18px"}}>
                  Quản lý sinh viên
                </span>
            </Link>,
            "/admin/student-management"
        ),
    ];
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout
            id="authe"
            className={`layout-dashboard`}>
            <div className="bg-white">
                <Sider
                    id="sildebar_ui"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={250}
                    className={`sider-primary ant-layout-sider-primary`}
                    style={{
                        background: "#fff",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 999,
                        height: "100%",
                    }}>
                    <Row
                        className="flex justify-center align-middle   mt-5 pb-8"
                        style={{height: "80px"}}
                    />
                    <Menu
                        mode="inline"
                        items={items}
                        selectedKeys={selectedKey}
                    />
                </Sider>
            </div>
            <Layout className="pb-14">
                <AntHeader
                    style={{zIndex: 1000, position: "fixed", width: "100%", backgroundColor: "white", height: "80px"}}>
                    <Row className="items-center" style={{display: "flex", justifyContent: "space-between"}}>
                        <Col span={16}>
                            <Row>
                                <Col span={2}>
                                    <Link
                                        to="/admin/student-management"
                                        className="active">
                                        <img
                                            src={logo}
                                            style={{
                                                height: "65px",
                                            }}
                                            alt="Logo"
                                        />
                                    </Link>
                                </Col>
                                <Col
                                    span={5}
                                    className="flex items-center">

                                    <button
                                        className="buttonSlider desktop"
                                        style={{fontSize: "18px"}}
                                        onClick={toggleCollapse}>
                                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Row style={{display: "flex", gap: "10px", alignItems: "center"}}
                                 onClick={() => {
                                     deleteToken();
                                     window.location.href = "/login"
                                 }}>
                                <LogoutOutlined style={{fontSize: "24px"}}/>
                                <h2>Đăng xuất</h2>
                            </Row>
                        </Col>
                    </Row>
                </AntHeader>
                {collapsed ? (
                    <Content
                        className="content-ant"
                        style={{paddingLeft: "80px", marginTop: "75px"}}>
                        {children}
                    </Content>
                ) : (
                    <Content
                        className="content-ant"
                        style={{paddingLeft: "250px", marginTop: "75px"}}>
                        {children}
                    </Content>
                )}
            </Layout>
        </Layout>
    );
}

export default DashboardAuthUser;
