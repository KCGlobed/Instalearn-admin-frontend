import React, { useState } from 'react';
import { Form, Input, Button, Upload, Row, Col, Card, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { handleUpdatePublicProfileApi } from '../../../utils/services';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePublicProfile = () => {
  const [form] = Form.useForm();
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async(values) => {
    console.log('Received values:', values);
    const formData = new FormData();
    formData.append("title_1", values.title_1);
    formData.append("title_2", values.title_2);
    formData.append("title_3", values.title_3);
    formData.append("experience", values.experience);
    formData.append("image", values.profile_image.file);
    formData.append("linkedin_url", values.linkedin_url);
    formData.append("company_image_1", values.company_image_1.file);
    formData.append("company_image_2", values.company_image_2.file);
    
    try {
      setLoading(true);
      await handleUpdatePublicProfileApi(formData, id);
      toast.success('Profile updated successfully!');
      form.resetFields();
      navigate('/manageinstructor') 
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip="Updating profile...">
      <div style={{ padding: '24px' }}>
        <Card title="Update Public Profile" bordered={false}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="title_1"
                  label="Title 1"
                  rules={[
                    { required: true, message: 'Please enter title 1' },
                    { max: 50, message: 'Maximum 50 characters' }
                  ]}
                >
                  <Input placeholder="Professional title" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="title_2"
                  label="Title 2"
                  rules={[
                    { required: true, message: 'Please enter title 2' },
                    { max: 50, message: 'Maximum 50 characters' }
                  ]}
                >
                  <Input placeholder="Secondary title" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="title_3"
                  label="Title 3"
                  rules={[
                    { required: true, message: 'Please enter title 3' },
                    { max: 50, message: 'Maximum 50 characters' }
                  ]}
                >
                  <Input placeholder="Additional title" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="experience"
              label="Experience"
              rules={[
                { required: true, message: 'Please describe your experience' },
                { min: 30, message: 'Minimum 30 characters' }
              ]}
            >
              <Input.TextArea rows={4} placeholder="Your professional experience" />
            </Form.Item>

            <Form.Item
              name="linkedin_url"
              label="LinkedIn URL"
              rules={[
                { required: true, message: 'Please enter LinkedIn URL' },
                { type: 'url', message: 'Please enter a valid URL' },
                { pattern: /linkedin\.com/, message: 'Must be a LinkedIn URL' }
              ]}
            >
              <Input placeholder="https://linkedin.com/in/username" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="profile_image"
                  label="Profile Image"
                  valuePropName="file"
                  rules={[
                    { required: true, message: 'Please upload profile image' }
                  ]}
                >
                  <Upload 
                    accept="image/*"
                    beforeUpload={() => false}
                    listType="picture"
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="company_image_1"
                  label="Company Logo 1"
                  valuePropName="file"
                  rules={[
                    { required: true, message: 'Please upload company logo' }
                  ]}
                >
                  <Upload 
                    accept="image/*"
                    beforeUpload={() => false}
                    listType="picture"
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="company_image_2"
                  label="Company Logo 2"
                  valuePropName="file"
                  rules={[
                    { required: true, message: 'Please upload company logo' }
                  ]}
                >
                  <Upload 
                    accept="image/*"
                    beforeUpload={() => false}
                    listType="picture"
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Spin>
  );
};

export default UpdatePublicProfile;