import React from 'react'
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd'

const { Option } = Select

const EditStaffModal = ({ visible, onCancel }) => {
  return (
    <Modal title="Edit Staff" open={visible} onCancel={onCancel} footer={null} width={800} centered>
      <Form layout="vertical">
        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item label="User Name" name="name" style={{ flex: 1 }}>
            <Input placeholder="User Name " />
          </Form.Item>
          <Form.Item label="Email" name="Email" style={{ flex: 1 }}>
            <Input placeholder="Email " />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item label="Phone Number" name="phone" style={{ flex: 1 }}>   
            <Input placeholder="Phone " />
          </Form.Item>
          <Form.Item label="Role" name="role" style={{ flex: 1 }}>
            <Input placeholder="Role " />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item label="Select Country" name="Country" style={{ flex: 1 }}>
            <Select placeholder="Select Country">
              <Option value="gold">Gold</Option>
              <Option value="silver">Silver</Option>
              <Option value="bronze">Bronze</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Select State" name="state" style={{ flex: 1 }}>
            <Select placeholder="Select State">
              <Option value="gold">Gold</Option>
              <Option value="silver">Silver</Option>
              <Option value="bronze">Bronze</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Select City" name="city" style={{ flex: 1 }}>
            <Select placeholder="Select City">
              <Option value="gold">Gold</Option>
              <Option value="silver">Silver</Option>
              <Option value="bronze">Bronze</Option>
            </Select>
          </Form.Item>
        </div>
 
        <Button type="primary">Submit</Button>
      </Form>
    </Modal>
  )
}
export default EditStaffModal










