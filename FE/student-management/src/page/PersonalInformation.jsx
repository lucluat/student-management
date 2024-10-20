import {useEffect, useState} from "react";
import {Button, Col, DatePicker, Input, InputNumber, message, Modal, Row, Space, Table, Tag} from "antd";
import dayjs from "dayjs";
import {ExclamationCircleOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {PersonalServiceApi} from "../service/admin/PersonalServiceApi"


const PersonalInformation = (prop) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getPersonalInformation();
    }, [prop?.isOpen]);

    function handleCancel() {
        prop?.setOpenPersonalInformation(false);
    }
    const getPersonalInformation = () => {
        PersonalServiceApi.fetchAll().then(response => {
            console.log(response?.data);
        }).catch(error => {
            message.error("Có lỗi xảy ra!")
        })
    }
    const columns = [
        {
            title: '#',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthDate',
            key: 'birthDate',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (_, record) => (
                <Tag color={record.gender === 0 ? "green" : "blue"}>
                    <a>{record.gender === 0 ? "Nam" : "Nữ"}</a>
                </Tag>
            ),
        },
        {
            title: 'Mối quan hệ',
            dataIndex: 'relationship',
            key: 'relationship',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Row style={{display: "flex", gap: "5px"}}>
                        {/*<Tooltip placement="leftTop" title={"Sửa sinh viên"}>*/}
                        {/*    <Button color="default"*/}
                        {/*            onClick={() => {*/}
                        {/*                openModalUpdate(record)*/}
                        {/*            }}*/}
                        {/*            variant="solid">*/}
                        {/*        <EditOutlined/>*/}
                        {/*    </Button>*/}
                        {/*</Tooltip>*/}
                        {/*<Tooltip placement="leftTop" title={"Xoá sinh viên"}>*/}
                        {/*    <Popconfirm*/}
                        {/*        title="Xác nhận xóa?"*/}
                        {/*        description="Bạn chắc chắn muốn xóa sinh viên này?"*/}
                        {/*        onConfirm={() => {*/}
                        {/*            confirmDelete(record.id)*/}
                        {/*        }}*/}
                        {/*        okText="Có"*/}
                        {/*        cancelText="Không"*/}
                        {/*    >*/}
                        {/*        <Button color="default" variant="solid">*/}
                        {/*            <DeleteOutlined/>*/}
                        {/*        </Button>*/}
                        {/*    </Popconfirm>*/}
                        {/*</Tooltip>*/}
                        {/*<Tooltip placement="leftTop" title={"Thông tin nhân thân"}>*/}
                        {/*    <Button color="default"*/}
                        {/*            onClick={() => {*/}
                        {/*                openModalDetail(record)*/}
                        {/*            }}*/}
                        {/*            variant="solid">*/}
                        {/*        <TeamOutlined/>*/}
                        {/*    </Button>*/}
                        {/*</Tooltip>*/}
                    </Row>
                </Space>
            ),
        }
    ];
    return (
        <>
            <Modal
                title="Thông tin nhân thân"
                open={prop.isOpen}
                width={1000}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>,
                ]}
            >
                <div>
                    <div style={{padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                        <Row>
                            <Col>
                                <Row style={{display: "flex", gap: "5px"}}>
                                    <ExclamationCircleOutlined style={{fontSize: "18px"}}/>
                                    <h2>Thông tin sinh viên</h2>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <label>Họ và tên</label>
                                <input type="text" value={prop?.student?.name} disabled={true}/>
                            </Col>
                            <Col span={6}>
                                <label>Ngày sinh</label>
                                <input type="text" value={prop?.student?.birthDate} disabled={true}/>
                            </Col>
                            <Col span={6}>
                                <label>Giới tính</label>
                                <input type="text" value={prop?.student?.gender == 0 ? "Nam" : "Nữ"} disabled={true}/>
                            </Col>
                            <Col span={6}>
                                <Row><label>GPA</label></Row>
                                <input type="text" value={prop?.student?.gpa} disabled={true}/>
                            </Col>
                        </Row>
                    </div>
                    <div style={{padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                        <Row style={{display: "flex", gap: "5px"}}>
                            <UnorderedListOutlined style={{fontSize: "18px"}}/>
                            <h2>Danh sách nhân thân</h2>
                        </Row>
                        <div>
                            <Table columns={columns} dataSource={data} pagination={false}/>

                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default PersonalInformation