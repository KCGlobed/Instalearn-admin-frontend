import React, { useContext, useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { handleUpdateChapterApi } from "../../utils/services";
import toast from "react-hot-toast";
import { ModalContext } from "../../Context";

const EditChapterModal = ({ chapterData, handleChapter }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const modalContext = useContext(ModalContext);
    const { closeModal } = modalContext;

    useEffect(() => {
        if (chapterData) {
            form.setFieldsValue({
                name: chapterData.name,
                description: chapterData.description,
            });
        }
    }, [chapterData, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            let response = await handleUpdateChapterApi(chapterData.id, values);
            toast.success(response.res.message);
            console.log(response)
            closeModal();
            handleChapter();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Form.Item
                            label="Title"
                            name="name"
                            style={{ flex: 1 }}
                            rules={[{ required: true, message: "Please enter a title" }]}
                        >
                            <Input placeholder="Enter Title" />
                        </Form.Item>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Form.Item
                            label="Description"
                            name="description"
                            style={{ flex: 1 }}
                            rules={[{ required: true, message: "Please enter a description" }]}
                        >
                            <Input.TextArea placeholder="Enter course description" rows={3} />
                        </Form.Item>
                    </div>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default EditChapterModal;
