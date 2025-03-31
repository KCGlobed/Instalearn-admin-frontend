
import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const AddCategoryModal = ({ visible, onCancel, refreshCategories }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        const token = localStorage.getItem('access_token');
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/content/create-category/`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            Swal.fire("Success", "Category added successfully!", "success");
            form.resetFields();
            onCancel();
            refreshCategories(); // Refresh category list after adding a new category
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal 
            title="Add Category" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item 
                        label="Title" 
                        name="name" 
                        style={{ flex: 1 }}
                        rules={[{ required: true, message: "Please enter a title" }]}
                    >
                        <Input placeholder="Enter Title" />
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item 
                        label="Description" 
                        name="description" 
                        style={{ flex: 1 }}
                        rules={[{ required: true, message: "Please enter a description" }]}
                    >
                        <Input.TextArea placeholder="Enter course description" rows={3} />
                    </Form.Item>
                </div>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form>
        </Modal>
    );
};

export default AddCategoryModal;


