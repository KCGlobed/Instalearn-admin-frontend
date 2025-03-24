import React from 'react'
import { Descriptions } from "antd";

const ViewUserReportModal = ({selectedUser}) => {
  return (
    <div>
         <div>
             <h4>View User Details</h4>
         </div>
        <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{selectedUser.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedUser.ph_number}</Descriptions.Item>
            <Descriptions.Item label="Address">{selectedUser.address}, {selectedUser.city}, {selectedUser.state}, {selectedUser.country}, {selectedUser.pincode}</Descriptions.Item>
            <Descriptions.Item label="Subscription Type">{selectedUser.subscription_type}</Descriptions.Item>
            <Descriptions.Item label="Total Watch Time">{selectedUser.total_watch_time} hours</Descriptions.Item>
            <Descriptions.Item label="Certificates Earned">{selectedUser.certificates_earned}</Descriptions.Item>
            <Descriptions.Item label="Goals">{selectedUser.mygoals}</Descriptions.Item>
        </Descriptions>
    </div>
  )
}

export default ViewUserReportModal