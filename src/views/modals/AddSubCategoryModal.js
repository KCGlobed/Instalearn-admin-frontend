import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const AddSubCategoryModal = ({ visible, onCancel, refreshCategories }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [parentCategories, setParentCategories] = useState([]);

    // Fetch Parent Categories
    useEffect(() => {
        if (visible) {
            fetchParentCategories();
        }
    }, [visible]);

    const fetchParentCategories = async () => {
        const token = localStorage.getItem("access_token");
        try {
            const response = await axios.get(`${API_BASE_URL}/content/get-parent-category/`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Token added here
                },
            });
            setParentCategories(response.data.data);
        } catch (error) {
            toast.error("Failed to load parent categories", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };
    

    const handleSubmit = async (values) => {
        const token = localStorage.getItem("access_token");
        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/content/create-sub-category/`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            toast.success("Sub Category added successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
            form.resetFields();
            onCancel();
            refreshCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
       
            <Modal
                title="Add Sub Category"
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
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Form.Item
                            label="Parent Category"
                            name="parent"
                            style={{ flex: 1 }}
                            rules={[{ required: true, message: "Please select a parent category" }]}
                        >
                            <Select placeholder="Select Parent Category">
                                {parentCategories.map((category) => (
                                    <Select.Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default AddSubCategoryModal;
