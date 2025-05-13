import React, { useContext, useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { handleAddCourseFaq } from '../../utils/services';
import toast from 'react-hot-toast';
import { ModalContext } from '../../Context';

const AssignFaqForm = ({ fetchFaqs, id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
    const { closeModal } = useContext(ModalContext);

  const onFinish = async (values) => {
    setLoading(true); // start loader
    try {
      console.log('Form submitted:', values);
      await handleAddCourseFaq({
        title: values.title,
        description: values.description,
        course_id: id, // Replace with actual course ID
      });

      toast.success('FAQ added successfully!');
      form.resetFields(); // optional: clear form
      fetchFaqs(id);
      closeModal() // refresh FAQs list

    } catch (error) {
      console.error('Error adding FAQ:', error);
      toast.error('Failed to add FAQ. Please try again.');
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <Card title="Assign FAQ" style={{ maxWidth: 500, margin: '0 auto' }}>
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
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AssignFaqForm;
