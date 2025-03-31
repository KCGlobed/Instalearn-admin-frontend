import React, { useContext, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { addBadge } from '../../utils/services';
import toast from 'react-hot-toast';
import { ModalContext } from '../../Context';

const CreateBadge = ({handleGetApi}) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const modalContext = useContext(ModalContext);
    const { closeModal } = modalContext;


    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            const result = await addBadge({
                "name": values.title,
            });
            console.log(result)
            if (result.status) {
                setLoading(false)
                toast.success("successfully!");
                handleGetApi()
                closeModal()
            }
            form.resetFields();
        } catch (error) {
            setLoading(false)
        }
    };

    return (
        <div className="create_badge">
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                >
                    <Input placeholder="Enter badge title" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {
                            loading ?
                                <>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </>
                                : "Save"
                        }
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateBadge;
