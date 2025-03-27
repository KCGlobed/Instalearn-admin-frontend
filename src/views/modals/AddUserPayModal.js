import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select,Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddUserPayModal = ({ visible, onCancel }) => {
    return (
        <Modal 
            title="Offline Payment" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form layout="vertical">
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="User Name" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter User name" />
                    </Form.Item>
                    <Form.Item label="Course/Subscription" name="badge" style={{ flex: 1 }}>
                        <Select placeholder="Select course/subscription">
                            <Option value="gold">Gold</Option>
                            <Option value="silver">Silver</Option>
                            <Option value="bronze">Bronze</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Amount" name="category" style={{ flex: 1 }}>
                        <Input placeholder="Enter Amount" />
                    </Form.Item>
                    <Form.Item label="Payment Method" name="price" style={{ flex: 1 }}>
                        <Input placeholder="Enter Payment Method" type="number" />
                    </Form.Item>
                   
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  
                    <Form.Item label="Transaction Id" name="plan" style={{ flex: 1 }}>
                        <Input placeholder="Transaction Id" />
                    </Form.Item>
                    <Form.Item label="Notes" name="plan" style={{ flex: 1 }}>
                        <Input placeholder="Notes" />
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  
                <Form.Item label="Upload Receipt" name="receipt" style={{ flex: 1 }}>
    <Upload>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
</Form.Item>

                   
                </div>
                
                <Button type="primary" >Submit</Button>
            </Form>
        </Modal>
    );
};

export default AddUserPayModal;
