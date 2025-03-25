import React from 'react';
import { Modal, Form, Input, Select, Button, DatePicker, Row, Col } from 'antd';

const { Option } = Select;

const EditOfflineSubscriptionModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form Data:', values);
    onClose();
  };

  return (
    <Modal title="Edit Subscription" open={visible} onCancel={onClose} footer={null} width={800} centered>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}> 
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}> 
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="phone" label="Phone No" rules={[{ required: true, message: 'Please enter your phone number' }]}> 
              <Input placeholder="Phone No" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="billingAddress" label="Billing Address" rules={[{ required: true, message: 'Please enter your billing address' }]}> 
              <Input placeholder="Billing Address" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter your city' }]}> 
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="state" label="State" rules={[{ required: true, message: 'Please enter your state' }]}> 
              <Input placeholder="State" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please enter your country' }]}> 
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="courses" label="Select Courses" rules={[{ required: true, message: 'Please select at least one course' }]}> 
              <Select mode="multiple" placeholder="Select Courses">
                <Option value="course1">Course 1</Option>
                <Option value="course2">Course 2</Option>
                <Option value="course3">Course 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="amount" label="Total Amount" rules={[{ required: true, message: 'Please enter the total amount' }]}> 
              <Input type="number" placeholder="Total Amount" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="purchaseDate" label="Purchase Date" rules={[{ required: true, message: 'Please select the purchase date' }]}> 
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOfflineSubscriptionModal;