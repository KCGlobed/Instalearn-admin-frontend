import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

const EditVideoModal = ({ visible, onCancel, course }) => {
    return (
        <Modal 
            title="Edit Video" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form layout="vertical">
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Course Name" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter course name" />
                    </Form.Item>
                    <Form.Item label="Instructor" name="instructor" style={{ flex: 1 }}>
                        <Input placeholder="Enter instructor name" />
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Category" name="category" style={{ flex: 1 }}>
                        <Input placeholder="Enter category" />
                    </Form.Item>
                    <Form.Item label="Category" name="Sub Category" style={{ flex: 1 }}>
                        <Input placeholder="Enter Sub Category" />
                    </Form.Item>
                   
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  
                    <Form.Item label="Topic" name="Topic" style={{ flex: 1 }}>
                        <Input placeholder="Topic" />
                    </Form.Item>
                    <Form.Item label="Select Badge" name="badge" style={{ flex: 1 }}>
                        <Select placeholder="Select a badge">
                            <Option value="gold">Gold</Option>
                            <Option value="silver">Silver</Option>
                            <Option value="bronze">Bronze</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
   
                <Form.Item label="Upload Image" name="upload_image" style={{ flex: 1 }}>
    <Upload
        listType="picture-card"
        beforeUpload={() => false} // Prevent auto-upload
    >
        <Button icon={<UploadOutlined />}>Upload Image</Button>
    </Upload>
</Form.Item>

<Form.Item label="Upload Video" name="upload_video" style={{ flex: 1 }}>
    <Upload
        beforeUpload={() => false} // Prevent auto-upload
    >
        <Button icon={<UploadOutlined />}>Upload Video</Button>
    </Upload>
</Form.Item>

</div>

             
                <Button type="primary" >Submit</Button>
            </Form>
        </Modal>
    );
};
export default EditVideoModal;
