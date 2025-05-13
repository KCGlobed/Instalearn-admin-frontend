import React, { useContext, useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { handleAddPrevVideoApi } from '../../utils/services';
import { ModalContext } from '../../Context';

const AddPrevVideo = ({ courseId, handleVideoList }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
   const { closeModal } = useContext(ModalContext);

  const handleFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('duration', values.duration);
    formData.append('course_id', courseId);
    formData.append('videos', values.video);
    formData.append('thumbnail', values.thumbnail);

    try {
      await handleAddPrevVideoApi(formData);
      handleVideoList(courseId);
      toast.success('Video uploaded successfully!');
      form.resetFields();
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-5">Add Preview Video</h2>

      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Video Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the video name' }]}
          >
            <Input placeholder="Enter video name" />
          </Form.Item>

          <Form.Item
            label="Video Duration (in minutes)"
            name="duration"
            rules={[
              { required: true, message: 'Please enter the video duration' },
              { type: 'number', min: 1, message: 'Duration must be a positive integer' }
            ]}
          >
            <InputNumber placeholder="Duration in minutes" min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Upload Video"
            name="video"
            valuePropName="file"
            getValueFromEvent={(e) => e && e.fileList[0]?.originFileObj}
            rules={[{ required: true, message: 'Please upload the video file' }]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select Video File</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Upload Thumbnail"
            name="thumbnail"
            valuePropName="file"
            getValueFromEvent={(e) => e && e.fileList[0]?.originFileObj}
            rules={[{ required: true, message: 'Please upload a thumbnail image' }]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select Thumbnail Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
              Upload Preview Video
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default AddPrevVideo;
