import React, { useContext, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import toast from 'react-hot-toast';
import { ModalContext } from '../../Context';
import { handleUpdateTopicApi } from '../../utils/services';

const UpdateTopic = ({ data, fetchData }) => {
    const [loading, setLoading] = useState(false);
    const { closeModal } = useContext(ModalContext);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            await handleUpdateTopicApi({ ...values },data.id); // ✅ pass id for update
            toast.success('Topic updated successfully!');
            fetchData();
            closeModal();
            console.log(values);
        } catch (error) {
            toast.error(error.message || 'Failed to update topic');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Update Topic" style={{ maxWidth: 500, margin: '0 auto' }}>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    name: data?.name || '',
                    description: data?.description || '',
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Topic Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter topic name' }]}
                >
                    <Input placeholder="Enter topic name" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter description' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter description" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Update Topic
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UpdateTopic;
