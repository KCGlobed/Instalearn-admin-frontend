import React, { useContext, useState } from 'react';
import { Form, Input, Button } from 'antd';
import toast from 'react-hot-toast';
import { addBadge } from '../../utils/services';
import { ModalContext } from '../../Context';

const CreateBadge = ({ handleGetApi }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { closeModal } = useContext(ModalContext);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const result = await addBadge({ name: values.title });
            if (result.status) {
                toast.success('Successfully created!');
                handleGetApi();
                closeModal();
                form.resetFields();
            }
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create_badge">
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        { required: true, message: 'Please enter a title' },
                        { pattern: /^[A-Za-z\s]+$/, message: 'Only alphabet characters are allowed' },
                    ]}
                >
                    <Input placeholder="Enter badge title" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateBadge;
