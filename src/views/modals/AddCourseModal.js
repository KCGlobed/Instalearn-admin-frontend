import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";

const { Option } = Select;

const AddCourseModal = ({ visible, onCancel }) => {
    return (
        <Modal 
            title="Add Course" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form layout="vertical">
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Course Name" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter course name" />
                    </Form.Item>
                    <Form.Item label="Instructor" name="instructor" style={{ flex: 1 }}>
                        <Input placeholder="Enter instructor name" />
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Category" name="category" style={{ flex: 1 }}>
                        <Input placeholder="Enter category" />
                    </Form.Item>
                    <Form.Item label="Price" name="price" style={{ flex: 1 }}>
                        <Input placeholder="Enter price" type="number" />
                    </Form.Item>
                   
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  
                    <Form.Item label="Plan" name="plan" style={{ flex: 1 }}>
                        <Input placeholder="Enter plan" />
                    </Form.Item>
                    <Form.Item label="Select Badge" name="badge" style={{ flex: 1 }}>
                        <Select placeholder="Select a badge">
                            <Option value="gold">Gold</Option>
                            <Option value="silver">Silver</Option>
                            <Option value="bronze">Bronze</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  
                    <Form.Item label="Start Date" name="start_date" style={{ flex: 1 }}>
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item label="End Date" name="end_date" style={{ flex: 1 }}>
                        <DatePicker style={{ width: "100%" }} />
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

export default AddCourseModal;
