import React, { useContext, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { addBadge, editBadge } from '../../utils/services';
import toast from 'react-hot-toast';
import { ModalContext } from '../../Context';

const EditBadge = ({ handleGetApi, item }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const modalContext = useContext(ModalContext);
    const { closeModal } = modalContext;

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const result = await editBadge({
                name: values.title,
             },item.id);
             setLoading(false);
             toast.success('Successfully updated!');
             handleGetApi();
             closeModal();
            form.resetFields();
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="create_badge">
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                initialValues={{ title: item?.name }} // Set default value
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                >
                    <Input placeholder="Enter badge title" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </>
                        ) : (
                            'Save'
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditBadge;
