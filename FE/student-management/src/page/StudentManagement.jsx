import {
    Button,
    Cascader,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select, Space,
    Switch, Table, Tag,
    TreeSelect
} from "antd";
import {
    FilterOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import {useState} from "react";

function StudentManagement() {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };
    const [data, setData] = useState([
        {
            "stt": 1,
            "fullName": "Nguyễn Văn A",
            "birthDate": "15/10/2006",
            "gender": 1,
            "GPA": 3.4
        }
    ]);

    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthDate',
            key: 'birthDate',
        },
        {
            title: 'GPA',
            dataIndex: 'GPA',
            key: 'GPA',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        }
    ];
    return (<>
            <div className="container"
                 style={{backgroundColor: "white", margin: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                <div className="container rounded-lg m-4" style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                    <Row style={{display: "flex", gap: "10px", padding: "10px",margin:"30px"}}>
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
                     style={{margin: "50px"}}>
                    <Row style={{display: "flex", justifyContent: "space-between",alignItems: "center"}}>
                        <div style={{display: "flex",gap:"10px"}}>
                            <UnorderedListOutlined style={{fontSize: "28px"}}/>
                            <h2>
                                Danh sách sinh viên
                            </h2>
                        </div>
                        <div>
                            hanhf
                        </div>
                    </Row>
                    <Table columns={columns} dataSource={data}/>
                </div>
            </div>
        </>
    )
}

export default StudentManagement;