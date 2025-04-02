import React, { useEffect, useState } from 'react';
import { Checkbox, Spin, Button, Card, Row, Col, Typography, message } from 'antd';
import { useParams,useNavigate  } from 'react-router-dom'; 
import { handlePermissionStaffApi, updateStaffPermissionsApi } from '../../../utils/services';
import toast from 'react-hot-toast';

const { Title } = Typography;

const PermissionManagement = () => {
    const { id } = useParams(); 
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    const handlePermissionList = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await handlePermissionStaffApi(id);
            if (response.res.status === 'success') {
                setPermissions(response.res.data || {});
            }
        } catch (error) {
            console.error('Error fetching permissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePermissionChange = (key) => {
        setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleUpdatePermissions = async () => {
        setUpdating(true);
        try {
            const grant_permission = Object.keys(permissions).filter(key => permissions[key]);
            const revoke_permission = Object.keys(permissions).filter(key => !permissions[key]);
            const response = await updateStaffPermissionsApi(id, { grant_permission, revoke_permission });
            toast.success("Permissions updated successfully!");
            navigate("/managestaff")
        } catch (error) {
            console.error('Error updating permissions:', error);
            toast.error('An error occurred while updating permissions.');
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        handlePermissionList();
    }, [id]);

    return (
        <Card
            style={{
                padding: '30px',
                maxWidth: '1200px',
                margin: 'auto',
                borderRadius: '12px',
                boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fafafa',
            }}
        >
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <Spin size="large" />
                    <Typography.Text>Loading permissions...</Typography.Text>
                </div>
            ) : (
                <div>
                    <Title level={4} style={{ textAlign: 'center', marginBottom: '30px' }}>Manage Permissions</Title>
                    <div className='manage_staff_permission' >
                        {Object.keys(permissions).map((key) => (
                            <div className=''> 
                                <Checkbox
                                    checked={permissions[key]}
                                    onChange={() => handlePermissionChange(key)}
                                    style={{
                                        transition: '0.3s ease',
                                        padding: '10px',
                                        borderRadius: '8px',
                                    }}
                                    className="permission-checkbox"
                                >
                                    <span style={{ textTransform: 'capitalize' }}>
                                        {key.replace(/_/g, ' ')}
                                    </span>
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                    <Button
                        type="primary"
                        block
                        loading={updating}
                        onClick={handleUpdatePermissions}
                        style={{
                            marginTop: '30px',
                            padding: '12px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            backgroundColor: '#007bff',
                            borderColor: '#007bff',
                        }}
                    >
                        {updating ? 'Updating...' : 'Update Permissions'}
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default PermissionManagement;
