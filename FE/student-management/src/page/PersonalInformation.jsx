import {useEffect, useState} from "react";
import {
    Button,
    Col,
    DatePicker,
    Input,
    message,
    Modal,
    Popconfirm,
    Row,
    Space,
    Table,
    Tag,
    Tooltip
} from "antd";
import dayjs from "dayjs";
import {
    ExclamationCircleOutlined,
    UnorderedListOutlined,
    UserAddOutlined,
    DeleteOutlined,
    EditOutlined
} from "@ant-design/icons";
import {PersonalServiceApi} from "../service/admin/PersonalServiceApi"


const PersonalInformation = (prop) => {
    const [data, setData] = useState([]);
    const [openModalModify, setOpenModalModify] = useState(false);
    const [personal, setPersonal] = useState({});
    const [errorName, setErrorName] = useState("");
    const [errorRelationship, setErrorRelationship] = useState("");
    const [errorGender, setErrorGender] = useState("");
    const [errorBirthDate, setErrorBirthDate] = useState("");

    useEffect(() => {
        if (prop?.isOpen) {
            getPersonalInformation();
            setPersonal({
                studentId: prop?.student?.id,
                gender: 0,
                relationship: 0
            })
        }
    }, [prop?.isOpen]);

    function handleCancel() {
        prop?.setOpenPersonalInformation(false);
    }

    function handleCancelModalModify() {
        prop?.setOpenPersonalInformation(true);
        setOpenModalModify(false);
    }

    const confirmDelete = (id) => {
        PersonalServiceApi.deletePersonal(id).then(response => {
            message.success("Xóa thành công!")
            getPersonalInformation();
        }).catch(error => {
            message.error("Xóa thất bại!")
        })
    }

    const openModalUpdate = (personal) => {
        console.log(personal)
        clearErrors();
        setPersonal({
            idUpdate: personal.id,
            studentId: prop?.student?.id,
            gender: personal.gender,
            relationship: personal.relationship,
            name: personal.name,
            birthDate: personal.birthDate
        })
        prop?.setOpenPersonalInformation(false);
        setOpenModalModify(true);
    }

    const setErrorMessage = (item) => {
        switch (item?.fieldError) {
            case "birthDate":
                setErrorBirthDate(item?.message);
                break;
            case "relationship":
                setErrorRelationship(item?.message);
                break;
            case "name":
                setErrorName(item?.message);
                break;
            case "gender":
                setErrorGender(item?.message);
                break;
        }
    }

    function handleSubmitModalModify() {
        if (personal.idUpdate == "") {
            PersonalServiceApi.addPersonal(personal).then((response) => {
                getPersonalInformation();
                message.success("Thêm thành công!")
                handleCancelModalModify();
            }).catch((error) => {
                if (error?.response?.data) {
                    for (let item in error?.response?.data) {
                        setErrorMessage(error?.response?.data[item]);
                    }
                }else{
                    message.error("Thêm thất bại!")
                }
            })
        } else {
            PersonalServiceApi.updatePersonal(personal).then((response) => {
                getPersonalInformation();
                message.success("Sửa thành công!")
                handleCancelModalModify();
            }).catch((error) => {
                if (error?.response?.data) {
                    for (let item in error?.response?.data) {
                        setErrorMessage(error?.response?.data[item]);
                    }
                }else{
                    message.error("Sửa thất bại!")
                }
            })
        }
    }

    const clearErrors = () => {
        setErrorName("");
        setErrorRelationship("");
        setErrorGender("");
        setErrorBirthDate("");
    }

    const showModalModifyPersonal = () => {
        clearErrors();
        setPersonal({
            studentId: prop?.student?.id,
            gender: 0,
            relationship: 0
        })
        prop?.setOpenPersonalInformation(false);
        setOpenModalModify(true);
    }

    const getPersonalInformation = () => {
        PersonalServiceApi.fetchAll(prop?.student?.id).then(response => {
            setData(response?.data?.data);
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
                    {record.gender === 0 ? "Nam" : "Nữ"}
                </Tag>
            ),
        },
        {
            title: 'Mối quan hệ',
            dataIndex: 'relationship',
            key: 'relationship',
            render: (_, record) => (
                <Tag color={record.relationship === 0 ? "green" :
                    record.relationship === 1 ? "blue" :
                        record.relationship === 2 ? "magenta" :
                            record.relationship === 3 ? "volcano" : "geekblue"}
                >
                    {record.relationship === 0 ? "Bố" :
                        record.relationship === 1 ? "Mẹ" :
                            record.relationship === 2 ? "Anh" :
                                record.relationship === 3 ? "Chị" : "Em"}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Row style={{display: "flex", gap: "5px"}}>
                        <Tooltip placement="leftTop" title={"Sửa nhân thân"}>
                            <Button color="default"
                                    onClick={() => {
                                        openModalUpdate(record)
                                    }}
                                    variant="solid">
                                <EditOutlined/>
                            </Button>
                        </Tooltip>
                        <Tooltip placement="leftTop" title={"Xoá nhân thân"}>
                            <Popconfirm
                                title="Xác nhận xóa?"
                                description="Bạn chắc chắn muốn xóa nhân thân này?"
                                onConfirm={() => {
                                    confirmDelete(record.id)
                                }}
                                okText="Có"
                                cancelText="Không"
                            >
                                <Button color="default" variant="solid">
                                    <DeleteOutlined/>
                                </Button>
                            </Popconfirm>
                        </Tooltip>
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
                                <Row style={{display: "flex", justifyContent: "space-between"}}>
                                    <div style={{display: "flex", gap: "5px"}}>
                                        <ExclamationCircleOutlined style={{fontSize: "18px"}}/>
                                        <h2>Thông tin sinh viên</h2>
                                    </div>
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
                        <Row style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <div style={{display: "flex", gap: "5px"}}>
                                <UnorderedListOutlined style={{fontSize: "18px"}}/>
                                <h2>Danh sách nhân thân</h2>
                            </div>
                            <div>
                                <Tooltip placement="leftTop" title={"Thêm nhân thân"}>
                                    <Button color="default" onClick={showModalModifyPersonal} variant="solid">
                                        <UserAddOutlined/>
                                    </Button>
                                </Tooltip>

                            </div>
                        </Row>
                        <div>
                            <Table columns={columns} dataSource={data} pagination={false}/>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                title="Thêm nhân thân"
                open={openModalModify}
                onOk={handleSubmitModalModify}
                width={600}
                onCancel={handleCancelModalModify}
                footer={[
                    <Button key="back" onClick={handleCancelModalModify}>
                        Đóng
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmitModalModify}>
                        Xác nhận
                    </Button>
                    ,
                ]}
            >
                <div>
                    <Row style={{margin: "10px"}}>
                        <label>Họ và tên (<span style={{color: "red"}}>*</span>)</label>
                        <Input value={personal?.name}
                               onChange={(e) => {
                                   setPersonal((prev) => ({
                                       ...prev,
                                       name: e.target.value
                                   }));
                               }}/>
                        <span style={{color: "red"}}>{errorName}</span>
                    </Row>
                    <Row style={{margin: "10px"}}>
                        <label>Ngày sinh (<span style={{color: "red"}}>*</span>)</label>
                        <DatePicker
                            value={personal?.birthDate == null ? null : dayjs(personal?.birthDate, "DD/MM/YYYY")}
                            style={{width: '100%'}}
                            format="DD/MM/YYYY"
                            onChange={(date, dateString) => {
                                if (date.valueOf() <= new Date().getTime()) {
                                    setPersonal((prev) => ({
                                        ...prev,
                                        birthDate: dateString
                                    }));
                                } else {
                                    message.error("Ngày sinh phải ở quá khứ!")
                                    setPersonal((prev) => ({
                                        ...prev,
                                        birthDate: null
                                    }));
                                }
                            }}/>
                        <span style={{color: "red"}}>{errorBirthDate}</span>
                    </Row>
                    <Row style={{margin: "10px"}}>
                        <label>Mối quan hệ (<span style={{color: "red"}}>*</span>)</label>
                        <select
                            onChange={(e) => {
                                setPersonal((prev) => ({
                                    ...prev,
                                    relationship: e.target.value
                                }));
                            }}
                            value={personal?.relationship}
                            style={{width: "100%", height: "35px"}}
                        >
                            <option value="0">Bố</option>
                            <option value="1">Mẹ</option>
                            <option value="2">Anh</option>
                            <option value="3">Chị</option>
                            <option value="4">Em</option>
                        </select>
                        <span style={{color: "red"}}>{errorRelationship}</span>
                    </Row>
                    <Row style={{margin: "10px"}}>
                        <label>Giới tính (<span style={{color: "red"}}>*</span>)</label>
                        <select
                            onChange={(e) => {
                                setPersonal((prev) => ({
                                    ...prev,
                                    gender: e.target.value
                                }));
                            }}
                            value={personal?.gender}
                            style={{width: "100%", height: "35px"}}
                        >
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                        </select>
                        <span style={{color: "red"}}>{errorGender}</span>
                    </Row>
                    <Row>
                                        <span
                                            style={{color: "red", fontSize: "18px", marginRight: "5px"}}>* </span> Biếu
                        thị trường không được trống
                    </Row>
                </div>
            </Modal>
        </>
    )
}
export default PersonalInformation