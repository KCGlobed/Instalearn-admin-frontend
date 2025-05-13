import React, { useContext, useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { handleAddTopic } from '../../utils/services';
import toast from 'react-hot-toast';
import { ModalContext } from '../../Context';

const AddTopic = ({fetchData}) => {
    const [loading, setLoading] = useState(false);
    const { closeModal } = useContext(ModalContext);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            await handleAddTopic(values); // assuming this returns a promise
            toast.success('Topic created successfully!');
            fetchData(); // Fetch the updated data after creating a topic
            closeModal()
            console.log(values);
        } catch (error) {
            toast.error('Failed to create topic');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Create Topic" style={{ maxWidth: 500, margin: '0 auto' }}>
            <Form layout="vertical" onFinish={onFinish}>
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
                        Create Topic
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AddTopic;
