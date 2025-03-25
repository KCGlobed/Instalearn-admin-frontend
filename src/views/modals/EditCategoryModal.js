import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";
const { Option } = Select;

const EditCategoryModal = ({ visible, onCancel, course }) => {
    return (
        <Modal 
            title="Edit Category" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form layout="vertical">
                <div style={{ display: "flex", gap: "16px" }}>
                                   <Form.Item label="Title" name="name" style={{ flex: 1 }}>
                                       <Input placeholder="Enter Title" />
                                   </Form.Item>
                                  
                               </div>
                              
                              
                              
                               <div style={{ display: "flex", gap: "16px" }}>
                               <Form.Item label="Description" name="description" style={{ flex: 1 }}>
                                       <Input.TextArea placeholder="Enter course description" rows={3} />
                                   </Form.Item>
                               </div>
                <Button type="primary" >Submit</Button>
            </Form>
        </Modal>
    );
};
export default EditCategoryModal;
