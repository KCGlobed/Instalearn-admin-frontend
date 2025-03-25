import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";

const { Option } = Select;

const AddPrivateModal = ({ visible, onCancel }) => {
    return (
        <Modal 
            title="Add Private Universities" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form layout="vertical">
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="University Name" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter University Name" />
                    </Form.Item>
                    <Form.Item label="Email" name="instructor" style={{ flex: 1 }}>
                        <Input placeholder="Enter Email" />
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Phone" name="category" style={{ flex: 1 }}>
                        <Input placeholder="Enter Phone Number" />
                    </Form.Item>
                    <Form.Item label="College" name="price" style={{ flex: 1 }}>
                        <Input placeholder="Enter College Name" type="number" />
                    </Form.Item>
                   
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  
                    <Form.Item label="Type Of College" name="plan" style={{ flex: 1 }}>
                        <Input placeholder="Type Of College" />
                    </Form.Item>
                   
                </div>
               
                <Button type="primary" >Submit</Button>
            </Form>
        </Modal>
    );
};

export default AddPrivateModal;
