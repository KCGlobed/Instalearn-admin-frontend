import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import toast from 'react-hot-toast';
import { handleUpdateBlogCategory } from '../../utils/services';
import { ModalContext } from '../../Context';

const EditBlogCategory = ({ handleBlogCategoryList, item }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { closeModal } = useContext(ModalContext);

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        title: item.title || '',
      });
    }
  }, [item, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await handleUpdateBlogCategory(values, item.id);
      toast.success('Blog category updated successfully!');
      closeModal();
      form.resetFields();
      handleBlogCategoryList();
    } catch (error) {
      console.error('Update category error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = ({ errorFields }) => {
    toast.error('Please fix the errors before submitting.');
    console.warn('Validation Failed:', errorFields);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Edit Blog Category</h2>
      <Form
        form={form}
        layout="vertical"
        name="edit_blog_category"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: 'Please enter a blog category title' },
            { min: 3, message: 'Title must be at least 3 characters long' },
          ]}
        >
          <Input placeholder="Enter blog category title" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditBlogCategory;
