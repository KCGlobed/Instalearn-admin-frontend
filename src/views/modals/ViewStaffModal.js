import React, { useEffect, useState } from 'react'
import { Descriptions, Spin } from "antd";
import { handleViewStaffApi } from '../../utils/services';

const ViewStaffModal = ({id}) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleViewDetails = async (staffId) => {
        if (!staffId) return;
        setLoading(true);
        try {
            const response = await handleViewStaffApi(staffId);
            console.log(response,"ch")
            if (response.res.status === 'success') {
                setSelectedUser(response.res.data);
            }
        } catch (error) {
            console.error('Error fetching staff details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            handleViewDetails(id);
        }
    }, [id]);


  return (
    <div>
         <div>
             <h4>View Staff Details</h4>
         </div>
        {loading ? (
                <Spin />
            ) : selectedUser ? (
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Name">{selectedUser.first_name} {selectedUser.last_name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{selectedUser.phone1 || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {selectedUser.address || 'N/A'}, {selectedUser.city || 'N/A'}, {selectedUser.state || 'N/A'}, {selectedUser.country || 'N/A'}, {selectedUser.pincode || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Role">{selectedUser.role}</Descriptions.Item>
                </Descriptions>
            ) : (
                <p>No details available</p>
        )}
    
    </div>
  )
}

export default ViewStaffModal