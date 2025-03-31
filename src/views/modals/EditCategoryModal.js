import React,  { useEffect } from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";
const { Option } = Select;
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const EditCategoryModal = ({ visible, onCancel, selectedCourse, refreshCategories }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        if (selectedCourse) {
            form.setFieldsValue({
                name: selectedCourse.name,
                description: selectedCourse.description,
            });
        }
    }, [selectedCourse, form]);

    const handleUpdate = async () => {
        const token = localStorage.getItem("access_token");
        try {
            const values = await form.validateFields();
            await axios.post(`${API_BASE_URL}/content/update-category/${selectedCourse.id}`, values, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Show success alert, close modal, and refresh the table
            Swal.fire("Updated!", "The category has been updated.", "success").then(() => {
                onCancel(); // Close modal
                refreshCategories(); // Refresh table data
            });

        } catch (error) {
            console.error("Error updating category:", error);
            Swal.fire("Error!", "Failed to update the category.", "error");
        }
    };
    
    return (
        <Modal 
            title="Edit Category" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Title" name="name" rules={[{ required: true, message: "Please enter title" }]}> 
                    <Input placeholder="Enter Title" />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter description" }]}> 
                    <Input.TextArea placeholder="Enter course description" rows={3} />
                </Form.Item>
                <Button type="primary" onClick={handleUpdate}>Submit</Button>
            </Form>
        </Modal>
    );
};
export default EditCategoryModal;
