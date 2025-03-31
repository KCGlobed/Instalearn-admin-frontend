import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select, Upload, } from "antd";

import { UploadOutlined } from "@ant-design/icons"; // Optional: For a nice upload icon


const { Option } = Select;

const AddBookModal = ({ visible, onCancel }) => {
    return (
        <Modal
            title="Add Book"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={800}
            centered
        >
            <Form layout="vertical">
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Ebook Title" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter Ebook Title" />
                    </Form.Item>
                    <Form.Item label="Topic Name" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter Topic name" />
                    </Form.Item>

                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Select Course Name" name="badge" style={{ flex: 1 }}>
                        <Select placeholder="Select Course Name">
                            <Option value="gold">Gold</Option>
                            <Option value="silver">Silver</Option>
                            <Option value="bronze">Bronze</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Select Category" name="badge" style={{ flex: 1 }}>
                        <Select placeholder="Select Category">
                            <Option value="gold">Gold</Option>
                            <Option value="silver">Silver</Option>
                            <Option value="bronze">Bronze</Option>
                        </Select>
                    </Form.Item>


                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Select SubCategory" name="badge" style={{ flex: 1 }}>
                        <Select placeholder="Select SubCategory">
                            <Option value="gold">Gold</Option>
                            <Option value="silver">Silver</Option>
                            <Option value="bronze">Bronze</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ flex: 1 }}
                        label="Upload PDF"
                        name="pdf"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e?.fileList}
                    >
                        <Upload beforeUpload={() => false} accept=".pdf">
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>


                </div>


                <Button type="primary" >Submit</Button>
            </Form>
        </Modal>
    );
};

export default AddBookModal;
