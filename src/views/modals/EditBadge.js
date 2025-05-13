import React, { useContext, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { editBadge } from '../../utils/services';
import toast from 'react-hot-toast';
import { ModalContext } from '../../Context';

const EditBadge = ({ handleGetApi, item }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { closeModal } = useContext(ModalContext);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await editBadge({ name: values.title }, item.id);
      toast.success('Successfully updated!');
      handleGetApi();
      closeModal();
      form.resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create_badge">
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ title: item?.name }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: 'Please enter a title' },
            { pattern: /^[A-Za-z\s]+$/, message: 'Only alphabets and spaces are allowed' }
          ]}
        >
          <Input placeholder="Enter badge title" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditBadge;
