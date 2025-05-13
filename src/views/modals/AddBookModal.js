import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { handleAssignchapterlistApi, handleAddEBookApi } from "../../utils/services";
import toast from "react-hot-toast";

const { Option } = Select;

const AddBookModal = ({ visible, onCancel,fetchEbookList }) => {
  const [form] = Form.useForm();
  const [chapterOptions, setChapterOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("chapter_id", values.chapter_id);
      formData.append("pdf_file", values.pdf_file?.[0]?.originFileObj);

      setLoading(true);
      await handleAddEBookApi(formData);
      toast.success("Ebook added successfully!");
      form.resetFields();
      fetchEbookList()
      onCancel();
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to add ebook.");
    } finally {
      setLoading(false);
    }
  };

  const handleChapterList = async () => {
    try {
      const response = await handleAssignchapterlistApi();
      setChapterOptions(response?.res?.data || []);
    } catch (error) {
      console.error("Failed to fetch chapters:", error);
    }
  };

  useEffect(() => {
    handleChapterList();
  }, []);

  const beforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("Only PDF files are allowed!");
    }
    return isPDF ? false : Upload.LIST_IGNORE; // Prevent upload if not PDF
  };

  return (
    <Modal
      title="Add Book"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Ebook Title"
            name="name"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please enter the ebook title" }]}
          >
            <Input placeholder="Enter Ebook Title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input placeholder="Enter Description" />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Select Chapter"
            name="chapter_id"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please select a chapter" }]}
          >
            <Select placeholder="Select Chapter">
              {chapterOptions.map((chapter) => (
                <Option key={chapter.id} value={chapter.id}>
                  {chapter.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Upload PDF"
            name="pdf_file"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please upload a PDF file" }]}
          >
            <Upload beforeUpload={beforeUpload} accept=".pdf">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
