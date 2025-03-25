import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";
const { Option } = Select;

const EditTopicModal = ({ visible, onCancel, course }) => {
    return (
        <Modal 
            title="Edit Topic" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form layout="vertical">
              <div style={{ display: "flex", gap: "16px" }}>
                                  <Form.Item label="Topic Name" name="name" style={{ flex: 1 }}>
                                      <Input placeholder="Enter Topic name" />
                                  </Form.Item>
                                  <Form.Item label="Select Course Name" name="badge" style={{ flex: 1 }}>
                                      <Select placeholder="Select Course Name">
                                          <Option value="gold">Gold</Option>
                                          <Option value="silver">Silver</Option>
                                          <Option value="bronze">Bronze</Option>
                                      </Select>
                                  </Form.Item>
                              </div>
                              <div style={{ display: "flex", gap: "16px" }}>
                              <Form.Item label="Select Category" name="badge" style={{ flex: 1 }}>
                                      <Select placeholder="Select Ctegory">
                                          <Option value="gold">Gold</Option>
                                          <Option value="silver">Silver</Option>
                                          <Option value="bronze">Bronze</Option>
                                      </Select>
                                  </Form.Item>
                                  <Form.Item label="Select SubCategory" name="badge" style={{ flex: 1 }}>
                                      <Select placeholder="Select SubCategory">
                                          <Option value="gold">Gold</Option>
                                          <Option value="silver">Silver</Option>
                                          <Option value="bronze">Bronze</Option>
                                      </Select>
                                  </Form.Item>
                                 
                              </div>
                <Button type="primary" >Submit</Button>
            </Form>
        </Modal>
    );
};
export default EditTopicModal;
