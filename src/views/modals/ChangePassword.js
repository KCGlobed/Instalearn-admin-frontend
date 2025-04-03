import React, { useContext, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { handleChangePasswordApi } from '../../utils/services';
import toast from 'react-hot-toast';
import { ModalContext } from '../../Context';

const PasswordUpdateForm = ({handleGetProfile}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { closeModal } = useContext(ModalContext);
    const onFinish = async (values) => {
        setLoading(true);
        try {
            await handleChangePasswordApi(values);
            toast.success('Password updated successfully');
            form.resetFields();
            handleGetProfile()
            closeModal()
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update password');
            form.setFields([
                { name: 'current_password', errors: ['Incorrect current password'] },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            name="password_update"
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="Current Password"
                name="current_password"
                rules={[{ required: true, message: 'Please enter your current password' }]}
            >
                <Input.Password placeholder="Enter current password" disabled={loading} />
            </Form.Item>

            <Form.Item
                label="New Password"
                name="password"
                rules={[{ required: true, message: 'Please enter a new password' }]}
            >
                <Input.Password placeholder="Enter new password" disabled={loading} />
            </Form.Item>

            <Form.Item
                label="Confirm New Password"
                name="confirm_password"
                dependencies={["password"]}
                rules={[
                    { required: true, message: 'Please confirm your new password' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            return value && getFieldValue('password') === value
                                ? Promise.resolve()
                                : Promise.reject(new Error('Passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Confirm new password" disabled={loading} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                    {loading ? 'Updating...' : 'Update Password'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PasswordUpdateForm;
