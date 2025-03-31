import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Spin } from "antd";
import toast from "react-hot-toast";
import { handleUpdateStaffApi } from "../../utils/services";

const EditStaffModal = ({ visible, onCancel, fetchStaffList, selectedStaff }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await handleUpdateStaffApi(selectedStaff.id, values);
            toast.success("Staff updated successfully!");
            form.resetFields();
            fetchStaffList();
            onCancel();
        } catch (error) {
            toast.error(error.errors?.non_field_errors?.[0] || "Something went wrong");
            console.error("Error updating staff:", error);
        } finally {
            setLoading(false);
        }
    };

        // Pre-fill form when editing data
    useEffect(() => {
          if (selectedStaff) {
              form.setFieldsValue(selectedStaff);
          } else {
              form.resetFields();
          }
    }, [selectedStaff, form]);

    return (
        <Modal
            title="Edit Staff"
            open={visible}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={null}
            width={600}
            centered
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

                <Button type="primary" htmlType="submit" block disabled={loading}>
                    {loading ? <Spin size="small" /> : "Update"}
                </Button>
            </Form>
        </Modal>
    );
};

export default EditStaffModal;
