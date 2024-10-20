import {
    Button,
    Col, DatePicker,
    Form,
    Input, Modal, Pagination,
    Row,
    Select, Space,
    Table, Tag, Tooltip,
    message, InputNumber, Popconfirm,
} from "antd";
import dayjs from 'dayjs';
import {
    FilterOutlined,
    UnorderedListOutlined,
    UserAddOutlined,
    DeleteOutlined,
    EditOutlined,
    TeamOutlined
} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {StudentServiceApi} from "../service/admin/StudentServiceApi"
import PersonalInformation from "./PersonalInformation";

function StudentManagement() {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };
    const [data, setData] = useState([]);
    const [page, setPage] = useState({});
    const [dataSearch, setDataSearch] = useState({});
    const [open, setOpen] = useState(false);
    const [openPersonalInformation, setOpenPersonalInformation] = useState(false);
    const [student, setStudent] = useState({gender: 0});
    const [errorName, setErrorName] = useState("");
    const [errorGPA, setErrorGPA] = useState("");
    const [errorGender, setErrorGender] = useState("");
    const [errorBirthDate, setErrorBirthDate] = useState("");

    const showModal = () => {
        clearError();
        setStudent({gender: 0});
        setOpen(true);
    };

    const clearError = () => {
        setErrorName("");
        setErrorGPA("");
        setErrorGender("");
        setErrorBirthDate("");
    }

    const handleOk = () => {
        console.log(student)
        if (student?.idUpdate == "") {
            StudentServiceApi.addStudent(student).then(response => {
                message.success("Thêm sinh viên thành công!");
                handleGetStudents();
                setOpen(false);
                setStudent((prev) => ({...prev, idUpdate: ""}));
            }).catch((error) => {
                if (error?.response?.data) {
                    for (let item in error?.response?.data) {
                        switch (error?.response?.data[item].fieldError) {
                            case "birthDate":
                                setErrorBirthDate(error?.response?.data[item]?.message);
                                break;
                            case "gpa":
                                setErrorGPA(error?.response?.data[item]?.message);
                                break;
                            case "name":
                                setErrorName(error?.response?.data[item]?.message);
                                break;
                            case "gender":
                                setErrorGender(error?.response?.data[item]?.message);
                                break;
                        }
                    }
                }
                setStudent((prev) => ({...prev, idUpdate: ""}));
            })
        } else {
            StudentServiceApi.updateStudent(student).then(response => {
                message.success("Sửa sinh viên thành công!");
                handleGetStudents();
                setOpen(false);
                setStudent((prev) => ({...prev, idUpdate: ""}));
            }).catch((error) => {
                if (error?.response?.data) {
                    for (let item in error?.response?.data) {
                        switch (error?.response?.data[item].fieldError) {
                            case "birthDate":
                                setErrorBirthDate(error?.response?.data[item]?.message);
                                break;
                            case "gpa":
                                setErrorGPA(error?.response?.data[item]?.message);
                                break;
                            case "name":
                                setErrorName(error?.response?.data[item]?.message);
                                break;
                            case "gender":
                                setErrorGender(error?.response?.data[item]?.message);
                                break;
                        }
                    }
                }
                setStudent((prev) => ({...prev, idUpdate: ""}));
            })
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        handleGetStudents();
    }, []);

    function handleGetStudents() {
        StudentServiceApi.fetchAll(dataSearch).then(response => {
            setData(response?.data?.data?.content);
            setPage(response?.data?.data);
        })
    }

    function confirmDelete(id) {
        StudentServiceApi.deleteStudent(id).then(response => {
            message.success("Xóa thành công!");
            handleGetStudents();
        }).catch(error => {
            message.error("Sinh Viên không tồn tại!");
        })
    }

    function openModalUpdate(student) {
        setStudent({
            birthDate: student?.birthDate,
            gpa: student?.gpa,
            name: student?.name,
            gender: student?.gender + "",
            idUpdate: student?.id
        })
        clearError();
        setOpen(true);
    }

    const openModalDetail = (student) => {
        setStudent(student)
        setOpenPersonalInformation(true);
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
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (_, record) => (
                <Space size="middle" >
                    <Row style={{display: "flex", gap: "5px"}}>
                        <Tooltip placement="leftTop" title={"Sửa sinh viên"}>
                            <Button color="default"
                                    onClick={() => {
                                        openModalUpdate(record)
                                    }}
                                    variant="solid">
                                <EditOutlined/>
                            </Button>
                        </Tooltip>
                        <Tooltip placement="leftTop" title={"Xoá sinh viên"}>
                            <Popconfirm
                                title="Xác nhận xóa?"
                                description="Bạn chắc chắn muốn xóa sinh viên này?"
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
                        <Tooltip placement="leftTop" title={"Thông tin nhân thân"}>
                            <Button color="default"
                                    onClick={() => {
                                        openModalDetail(record)
                                    }}
                                    variant="solid">
                                <TeamOutlined/>
                            </Button>
                        </Tooltip>
                    </Row>
                </Space>
            ),
        }
    ];

    return (<>
            <div className="container"
                 style={{backgroundColor: "white", margin: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                <div className="container rounded-lg m-4" style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                    <Row style={{display: "flex", gap: "10px", padding: "10px", margin: "30px"}}>
                        <FilterOutlined style={{fontSize: "24px"}}/>
                        <h2>Bộ lọc</h2>
                    </Row>
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        initialValues={{
                            size: componentSize,
                        }}
                        onValuesChange={onFormLayoutChange}
                        size={componentSize}
                    >
                        <Row className="items-center">
                            <Col span={8}>
                                <Form.Item label="Input">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Input">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>

                                <Form.Item label="Select">
                                    <Select>
                                        <Select.Option value="demo">Demo</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </div>
                <div className="container"
                     style={{margin: "50px", padding: "10px"}}>
                    <Row style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div style={{display: "flex", gap: "10px"}}>
                            <UnorderedListOutlined style={{fontSize: "28px"}}/>
                            <h2>
                                Danh sách sinh viên
                            </h2>
                        </div>
                        <div>
                            <Tooltip placement="leftTop" title={"Thêm sinh viên"}>
                                <Button color="default" onClick={showModal} variant="solid">
                                    <UserAddOutlined/>
                                </Button>
                            </Tooltip>
                            <Modal
                                title="Thêm sinh viên"
                                open={open}
                                onOk={handleOk}
                                width={600}
                                onCancel={handleCancel}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Đóng
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={handleOk}>
                                        Xác nhận
                                    </Button>
                                    ,
                                ]}
                            >
                                <div>
                                    <Row>
                                        <label>Họ và tên (<span style={{color: "red"}}>*</span>)</label>
                                        <Input value={student?.name}
                                               onChange={(e) => {
                                                   setStudent((prev) => ({
                                                       ...prev,
                                                       name: e.target.value
                                                   }));
                                               }}/>
                                        <span style={{color: "red"}}>{errorName}</span>
                                    </Row>
                                    <Row>
                                        <label>Ngày sinh (<span style={{color: "red"}}>*</span>)</label>
                                        <DatePicker
                                            value={student?.birthDate == null ? null : dayjs(student?.birthDate, "DD/MM/YYYY")}
                                            style={{width: '100%'}}
                                            format="DD/MM/YYYY"
                                            onChange={(date, dateString) => {
                                                if (date.valueOf() <= new Date().getTime()) {
                                                    setStudent((prev) => ({
                                                        ...prev,
                                                        birthDate: dateString
                                                    }));
                                                } else {
                                                    message.error("Ngày sinh phải ở quá khứ!")
                                                    setStudent((prev) => ({
                                                        ...prev,
                                                        birthDate: null
                                                    }));
                                                }
                                            }}/>
                                        <span style={{color: "red"}}>{errorBirthDate}</span>
                                    </Row>
                                    <Row>
                                        <label>GPA (<span style={{color: "red"}}>*</span>)</label>
                                        <InputNumber value={student?.gpa}
                                                     size="middle"
                                                     style={{width: '100%'}}
                                                     min={0} max={10}
                                                     onChange={(e) => {
                                                         setStudent((prev) => ({
                                                             ...prev,
                                                             gpa: e
                                                         }));
                                                     }}/>
                                        <span style={{color: "red"}}>{errorGPA}</span>
                                    </Row>
                                    <Row>
                                        <label>Giới tính (<span style={{color: "red"}}>*</span>)</label>
                                        <select
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                setStudent((prev) => ({
                                                    ...prev,
                                                    gender: e.target.value
                                                }));
                                            }}
                                            value={student?.gender}
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
                        </div>
                    </Row>
                    <Table columns={columns} dataSource={data} pagination={false}/>
                    <div style={{display: "flex", justifyContent: "end", alignItems: "center", padding: "30px"}}>
                        <Pagination simple defaultCurrent={2} total={50}/>
                    </div>
                </div>
            </div>
            <PersonalInformation student={student}
                                 isOpen={openPersonalInformation}
                                 setOpenPersonalInformation={setOpenPersonalInformation}
            />
        </>
    )
}

export default StudentManagement;