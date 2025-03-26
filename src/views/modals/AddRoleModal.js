import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";

const { Option } = Select;

const AddRoleModal = ({ visible, onCancel }) => {
    return (
        <Modal 
            title="Add New Role" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form layout="vertical">
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Role Name" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter Role Name" />
                    </Form.Item>
                   
                </div>
               
               
               
                <div style={{ display: "flex", gap: "16px" }}>
                <Form.Item label="Select Permission" name="badge" style={{ flex: 1 }}>
                                      <Select placeholder="Select permission">
                                          <Option value="gold">Gold</Option>
                                          <Option value="silver">Silver</Option>
                                          <Option value="bronze">Bronze</Option>
                                      </Select>
                                  </Form.Item>
                </div>
                <Button type="primary" >Submit</Button>
            </Form>
        </Modal>
    );
};

export default AddRoleModal;
