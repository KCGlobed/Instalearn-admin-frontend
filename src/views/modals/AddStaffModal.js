import React, { useState } from "react";
import { Modal, Form, Input, Button, Spin } from "antd";
import toast from "react-hot-toast";
import { handleCreateStaffApi } from "../../utils/services";

const AddStaffModal = ({ visible, onCancel, fetchStaffList }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false); // State to track loading

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await handleCreateStaffApi(values);
            toast.success("Successfully created!");
            form.resetFields();
            fetchStaffList()
            onCancel();
        } catch (error) {
            toast.error(error.errors?.non_field_errors?.[0] || "Something went wrong");
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Add Staff"
            open={visible}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={null}
            width={600}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true, message: "First name is required" }]}
                >
                    <Input placeholder="Enter first name" disabled={loading} />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[{ required: true, message: "Last name is required" }]}
                >
                    <Input placeholder="Enter last name" disabled={loading} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Enter a valid email" }
                    ]}
                >
                    <Input placeholder="Enter email" disabled={loading} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Password is required" },
                        { min: 6, message: "Password must be at least 6 characters" }
                    ]}
                >
                    <Input.Password placeholder="Enter password" disabled={loading} />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirm_password"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "Please confirm your password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Passwords do not match"));
                            }
                        })
                    ]}
                >
                    <Input.Password placeholder="Confirm password" disabled={loading} />
                </Form.Item>

                <Button type="primary" htmlType="submit" block disabled={loading}>
                    {loading ? <Spin size="small" /> : "Submit"}
                </Button>
            </Form>
        </Modal>
    );
};

export default AddStaffModal;
