import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row, Tag, Button, Typography } from "antd";
import { 
  UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, 
  EditOutlined, CameraOutlined, LockOutlined 
} from "@ant-design/icons";
import { handleProfileDetails } from "../../../utils/services";
import { ModalContext } from "../../../Context";
import EditProfile from "../../modals/EditProfile";
import ChangeAvatar from "../../modals/ChangeAvatar";
import PasswordUpdateForm from "../../modals/ChangePassword";
import { UserContext } from "../../../layout/GlobalContext";


const { Title, Text } = Typography;

const ProfilePage = () => {
  const { handleModalData } = useContext(ModalContext);
  const { user, handleGetProfile } = useContext(UserContext)

  const handleEditProfile = () => {
    const editProfileModal = <EditProfile user={user} handleGetProfile={handleGetProfile} />;
    handleModalData(editProfileModal, "lg");
  };

  const handleChangeProfileLogo = () => {
    const changeAvatarModal = <ChangeAvatar currentAvatar={user.image} handleGetProfile={handleGetProfile} />;
    handleModalData(changeAvatarModal, "sm");
  };

  const handleChangePassword = () => {
    const changePasswordModal = <PasswordUpdateForm handleGetProfile={handleGetProfile} />;
    handleModalData(changePasswordModal, "sm");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", animation: "fadeIn 1s ease-in-out" }}>
      {/* Banner Image */}
      <div style={{ position: "relative", width: "100%", height: "200px", borderRadius: "10px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", marginBottom: "20px" }}>
        {user.banner_image ? (
          <img src={user.banner_image} alt="Banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", backgroundColor: "#343a40", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "20px", fontWeight: "bold" }}>
            No Banner Image
          </div>
        )}
        <CameraOutlined 
          onClick={handleEditProfile} 
          style={{
            position: "absolute", bottom: "10px", right: "10px", fontSize: "24px", background: "white", padding: "8px", borderRadius: "50%", cursor: "pointer", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)"
          }} 
        />
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          {/* Profile Card */}
          <Card style={{ textAlign: "center", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", position: "relative" }}>
            <div style={{ width: "120px", height: "120px", margin: "auto", borderRadius: "50%", overflow: "hidden", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#f0f0f0", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "30px", fontWeight: "bold", position: "relative" }}>
              {user.image ? (
                <img src={user.image} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span>{user?.first_name?.slice(0, 1)}</span>
              )}
              <CameraOutlined 
                onClick={handleChangeProfileLogo} 
                style={{
                  position: "absolute", bottom: "5px", right: "5px", fontSize: "20px", background: "white", padding: "5px", borderRadius: "50%", cursor: "pointer", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)"
                }} 
              />
            </div>

            <Title level={3} style={{ marginTop: "15px" }}>{`${user.first_name} ${user.last_name}`}</Title>
            <Text type="secondary" style={{ fontSize: "14px" }}>{user.role === 1 ? "Admin" : "User"}</Text>

            <Button type="primary" icon={<EditOutlined />} style={{ marginTop: "15px", width: "100%" }} onClick={handleEditProfile}>
              Edit Profile
            </Button>

            {/* Change Password Button */}
            <Button type="default" icon={<LockOutlined />} style={{ marginTop: "10px", width: "100%" }} onClick={handleChangePassword}>
              Change Password
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={16}>
          {/* User Info */}
          <Card title="User Information" bordered={false} style={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <MailOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
                <Tag color="blue">{user.email}</Tag>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <PhoneOutlined style={{ fontSize: "18px", color: "#52c41a" }} />
                <Tag color="green">{user.phone1 || "Not Provided"}</Tag>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <EnvironmentOutlined style={{ fontSize: "18px", color: "#fa8c16" }} />
                <Tag color="orange">{user.city || "Not Provided"}, {user.state || "Not Provided"}, {user.pincode || "Not Provided"}, {user.country}</Tag>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
