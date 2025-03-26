import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select,Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddOfferModal = ({ visible, onCancel }) => {
    return (
        <Modal 
            title="Add Offers" 
            open={visible} 
            onCancel={onCancel} 
            footer={null} 
            width={800} 
            centered
        >
            <Form layout="vertical">
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Offer Name" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Enter Offer name" />
                    </Form.Item>
                    <Form.Item label="Discount Type" name="badge" style={{ flex: 1 }}>
                        <Select placeholder="Select Discount Type">
                            <Option value="gold">Gold</Option>
                            <Option value="silver">Silver</Option>
                            <Option value="bronze">Bronze</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Form.Item label="Discount Value" name="category" style={{ flex: 1 }}>
                        <Input placeholder="Discount Value" />
                    </Form.Item>
                    <Form.Item label="Applies To" name="price" style={{ flex: 1 }}>
                        <Input placeholder="Applies To" type="number" />
                    </Form.Item>
                   
                </div>
                
              

                <div style={{ display: "flex", gap: "16px" }}>
                    
                    <Form.Item label="Course/Subscription" name="badge" style={{ flex: 1 }}>
                        <Select placeholder="Select course/subscription">
                            <Option value="gold">Gold</Option>
                            <Option value="silver">Silver</Option>
                            <Option value="bronze">Bronze</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Coupon Code" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Coupon Code" />
                    </Form.Item>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    
                <Form.Item label="Usage Limit" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Usage Limit" />
                    </Form.Item>
                    <Form.Item label="Status" name="name" style={{ flex: 1 }}>
                        <Input placeholder="Status" />
                    </Form.Item>
                    

                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    
                <Form.Item label="Description" name="name" style={{ flex: 1 }}>
    <Input.TextArea placeholder="Description" />
</Form.Item>

                       
                        
    
                    </div>
                <Button type="primary" >Submit</Button>
            </Form>
        </Modal>
    );
};

export default AddOfferModal;
