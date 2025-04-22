import React, { useContext, useState } from 'react';
import { Form, Input, Button, Card, Spin } from 'antd';
import { handleUpdateInstructor } from '../../utils/services';
import { ModalContext } from '../../Context';
import toast from 'react-hot-toast';

const UpdateInstructorDetails = ({ item, handleFetchInstructors }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal } = useContext(ModalContext);

  const initialValues = {
    first_name: item.first_name || '',
    last_name: item.last_name || '',  
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      await handleUpdateInstructor(values, item.id);
      await handleFetchInstructors();
      closeModal();
      toast.success("Instructor updated successfully!");
    } catch (error) {
      console.error('Error updating instructor:', error);
      toast.error("Failed to update instructor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <Card 
        title="Update Instructor Details" 
        style={{ maxWidth: 500, margin: 'auto' }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block
              loading={isLoading}
            >
              Update Details
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};

export default UpdateInstructorDetails;