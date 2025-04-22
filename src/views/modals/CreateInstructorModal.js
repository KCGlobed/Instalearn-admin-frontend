import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { handleAddInstructorApi } from "../../utils/services";
import toast from "react-hot-toast";

const CreateInstructorModal = ({ visible, onCancel,handleFetchInstructors }) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const onFinish = async (values) => {
        console.log("Form Values:", values);
        setConfirmLoading(true);
        try {
            // Here you would typically make an API call to submit the form data
            await handleAddInstructorApi(values);
            toast.success("Instructor created successfully!");
            handleFetchInstructors(); // Refresh the instructor list
            form.resetFields();
            onCancel(); // Close modal
        } catch (error) {
            toast.error("Failed to create instructor. Please try again.");
            console.error("Error:", error);
        } finally {
            setConfirmLoading(false);
        }
    };

    const validatePassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
        },
    });

    return (
        <Modal
            title="Create Instructor"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={800}
            centered
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true, message: "Please enter the instructor's first name" }]}
                >
                    <Input placeholder="Enter first name" />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[{ required: true, message: "Please enter the instructor's last name" }]}
                >
                    <Input placeholder="Enter last name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter the instructor's email" },
                        { type: 'email', message: 'Please enter a valid email address' }
                    ]}
                >
                    <Input placeholder="Enter email address" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Please enter a password" },
                        { min: 6, message: "Password must be at least 6 characters" }
                    ]}
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirm_password"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: "Please confirm the password" },
                        validatePassword
                    ]}
                >
                    <Input.Password placeholder="Confirm password" />
                </Form.Item>

                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        loading={confirmLoading}
                    >
                        Create Instructor
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateInstructorModal;