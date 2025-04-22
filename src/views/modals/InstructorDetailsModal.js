import React, { useEffect, useState } from 'react';
import { handleInstructorDetails, handleInstructorList } from '../../utils/services';
import { Card, Descriptions, Avatar, Divider, Tag, Spin, Row, Col, Empty } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  BookOutlined,
  TeamOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  StarOutlined
} from '@ant-design/icons';

const InstructorDetails = ({ record }) => {
  const [instructorDetails, setInstructorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      try {
        const response = await handleInstructorDetails(record.id);
        setInstructorDetails(response.res.data);
        console.log("Instructor Details:", response.res.data);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (record && record.id) {
      fetchInstructorDetails();
    }
  }, [record]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!instructorDetails) {
    return <Empty description="No instructor data found" />;
  }

  return (
    <Card>
      {/* Header Section */}
      <Row gutter={24} align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Avatar
            size={50}
            src={instructorDetails.profilePicture}
            icon={<UserOutlined />}
          />
        </Col>
        <Col flex={1}>
          <h1 style={{ marginBottom: 8, fontSize: 24 }}>
            {instructorDetails.firstName} {instructorDetails.lastName}
            {instructorDetails.isActive ? (
              <Tag color="green" style={{ marginLeft: 12 }}>Active</Tag>
            ) : (
              <Tag color="red" style={{ marginLeft: 12 }}>Inactive</Tag>
            )}
          </h1>
          <p style={{ fontSize: 16, color: '#666', marginBottom: 4 }}>
            <BookOutlined /> {instructorDetails.department || 'Department not specified'}
          </p>
          <p style={{ fontSize: 16, color: '#666' }} className='mb-0'>
            <StarOutlined /> {instructorDetails.rating || 'No rating'} ({instructorDetails.reviewsCount || 0} reviews)
          </p>
        </Col>
      </Row>

      <Divider orientation="left">Personal Information</Divider>
      <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
        <Descriptions.Item label={<><IdcardOutlined /> ID</>}>
          {instructorDetails.id}
        </Descriptions.Item>
        <Descriptions.Item label={<><CalendarOutlined /> Date of Birth</>}>
          {instructorDetails.dateOfBirth || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label={<><MailOutlined /> Email</>}>
          {instructorDetails.email}
        </Descriptions.Item>
        <Descriptions.Item label={<><PhoneOutlined /> Phone</>}>
          {instructorDetails.phone || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label={<><EnvironmentOutlined /> Address</>}>
          {instructorDetails.address || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label={<><GlobalOutlined /> Website</>}>
          {instructorDetails.website ? (
            <a href={instructorDetails.website} target="_blank" rel="noopener noreferrer">
              {instructorDetails.website}
            </a>
          ) : 'N/A'}
        </Descriptions.Item>
      </Descriptions>

      {/* Professional Information */}
      <Divider orientation="left">Professional Details</Divider>
      <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
        <Descriptions.Item label="Position">
          {instructorDetails.position || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Department">
          {instructorDetails.department || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Specialization">
          {instructorDetails.specialization || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Years of Experience">
          {instructorDetails.experienceYears || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Courses Taught">
          {instructorDetails.courses?.join(', ') || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Students">
          <TeamOutlined /> {instructorDetails.studentsCount || 0}
        </Descriptions.Item>
      </Descriptions>

      {/* Additional Information */}
      {instructorDetails.bio && (
        <>
          <Divider orientation="left">About</Divider>
          <Card type="inner" style={{ marginBottom: 24 }}>
            <p style={{ whiteSpace: 'pre-line' }}>{instructorDetails.bio}</p>
          </Card>
        </>
      )}
    </Card>
  );
};

export default InstructorDetails;