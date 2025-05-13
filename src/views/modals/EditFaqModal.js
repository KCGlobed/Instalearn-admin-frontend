import React, { useContext, useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import toast from 'react-hot-toast';
import { ModalContext } from '../../Context';
import { handleUpdateCourseFaqApi } from '../../utils/services';

const EditFaqForm = ({ faq, fetchFaqs, id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { closeModal } = useContext(ModalContext);

  // pre-fill form when faq changes
  useEffect(() => {
    if (faq) {
      form.setFieldsValue({
        title: faq.title,
        description: faq.description,
      });
    }
  }, [faq, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await handleUpdateCourseFaqApi({
        title: values.title,
        description: values.description,
        course_id: id, 
      },faq.id);

      toast.success('FAQ updated successfully!');
      fetchFaqs(id);
      closeModal();
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast.error('Failed to update FAQ. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Edit FAQ" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter FAQ Title' }]}
        >
          <Input placeholder="Enter FAQ Title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter FAQ Description' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter FAQ Description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {loading ? 'Updated...' : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditFaqForm;
