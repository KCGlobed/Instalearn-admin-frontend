import React from "react";
import { Card, Col, Row, Tag, Button } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";


const ProfilePage = () => {
  const user = {
    id: 1,
    first_name: "Kcglobed",
    last_name: "Admin",
    email: "info@kcglobed.com",
    phone1: "",
    phone2: "",
    address: "",
    city: "",
    state: "",
    country: "",
    image: null,
    banner_image: null,
    pincode: "",
    role: 1,
  };

  return (
    <div className="container mt-5">
      {/* Banner Image */}
      <div className="mb-4 animate__animated animate__fadeIn animate__delay-1s">
        <div className="banner-image">
          {user.banner_image ? (
            <img src={user.banner_image} alt="Banner" className="w-100 h-40 object-cover" />
          ) : (
            <div className="d-flex justify-content-center align-items-center text-white" style={{ height: "200px", backgroundColor: "#343a40" }}>
              <span className="text-2xl font-weight-bold">No Banner Image</span>
            </div>
          )}
        </div>
      </div>

      <Row gutter={24}>
        <Col xs={24} sm={8}>
          {/* Profile Card */}
          <Card className="profile-card" hoverable>
            <div className="d-flex justify-content-center mb-4">
              <div className="rounded-circle profile-img">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-100 h-100 object-cover rounded-circle"
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center bg-secondary text-white w-100 h-100 rounded-circle">
                    <span className="text-xl">{user.first_name[0]}</span>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-center">{`${user.first_name} ${user.last_name}`}</h3>
            <p className="text-center">{user.role === 1 ? "Admin" : "User"}</p>

            <div className="text-center">
              <Button type="primary" icon={<UserOutlined />} className="mt-3">
                Edit Profile
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={16}>
          {/* User Info */}
          <Card title="User Information" bordered={false} className="animate__animated animate__fadeIn animate__delay-2s">
            <div className="mb-3">
              <Tag icon={<MailOutlined />} color="blue">
                {user.email}
              </Tag>
            </div>
            <div className="mb-3">
              <Tag icon={<PhoneOutlined />} color="green">
                {user.phone1 || "Not Provided"}
              </Tag>
            </div>
            <div className="mb-3">
              <Tag icon={<EnvironmentOutlined />} color="orange">
                {user.city || "Not Provided"}, {user.state || "Not Provided"}
              </Tag>
            </div>
            <div className="mb-3">
              <Tag color="magenta">
                {user.pincode || "Not Provided"}
              </Tag>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
