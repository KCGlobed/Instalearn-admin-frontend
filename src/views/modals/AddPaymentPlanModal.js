import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select,Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddPaymentPlanModal = ({ visible, onCancel }) => {
    return (
        <Modal 
            title="Create Payment Plan" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form layout="vertical">
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Plan Name" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter Plan name" />
                    </Form.Item>
                    <Form.Item label="Price" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter Price" />
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Billing Cycle" name="category" style={{ flex: 1 }}>
                        <Input placeholder="Billing Cycle" />
                    </Form.Item>
                    <Form.Item label="Discount" name="price" style={{ flex: 1 }}>
                        <Input placeholder="Discount" type="number" />
                    </Form.Item>
                   
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  
                    <Form.Item label="Total Amount" name="plan" style={{ flex: 1 }}>
                        <Input placeholder="Total Amount" />
                    </Form.Item>
                    <Form.Item label="Access Duration" name="plan" style={{ flex: 1 }}>
                        <Input placeholder="Access Duration" />
                    </Form.Item>
                    </div>
              

                <div style={{ display: "flex", gap: "16px" }}>
                    
                    <Form.Item label="Course/Subscription" name="badge" style={{ flex: 1 }}>
                        <Select placeholder="Select course/subscription">
                            <Option value="gold">Gold</Option>
                            <Option value="silver">Silver</Option>
                            <Option value="bronze">Bronze</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Trial Period" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter Trial Period" />
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    
                <Form.Item label="Featured Plan" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Featured Plan" />
                    </Form.Item>
                    <Form.Item label="Start Date" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter Start Date" />
                    </Form.Item>
                    <Form.Item label="Upload Banner" name="banner" style={{ flex: 1 }}>
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

export default AddPaymentPlanModal;
