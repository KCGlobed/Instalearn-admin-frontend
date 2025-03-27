import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

const CreateBlogModal = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const contentState = convertToRaw(editorState.getCurrentContent());
    const blogData = {
      ...values,
      content: JSON.stringify(contentState),
    };

    console.log("Blog Created:", blogData);
  };

  return (
    <div className="container mt-5 p-4">
      <h3 className="mb-4">Create New Blog</h3>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Title Field */}
        <Form.Item 
          label="Title" 
          name="title" 
          rules={[{ required: true, message: "Please enter a title" }]}
        >          
          <Input placeholder="Enter blog title" />
        </Form.Item>

        {/* File Upload (Optional) */}
        <Form.Item label="Upload Image" name="image">
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        {/* Rich Text Editor */}
        <Form.Item label="Content">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="editor-wrapper"
            editorClassName="editor-main"
            toolbarClassName="editor-toolbar"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBlogModal;
