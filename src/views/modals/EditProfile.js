import React, { useState, useContext } from "react";
import { Form, Input, Button, Spin } from "antd";
import { handleEditPafileApi } from "../../utils/services";
import { ModalContext } from "../../Context";


const ProfilePage = ({ user,handleGetProfile }) => {
  const { closeModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await handleEditPafileApi({...values,"phone_1":values.phone1,"phone_2":values.phone2});
      closeModal();
      handleGetProfile()
      console.log(values);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Form layout="vertical" onFinish={onFinish} initialValues={user} style={{ width: "100%", maxWidth: "900px" }}>
        {loading && (
          <div className="d-flex justify-content-center mb-3">
            <Spin size="large" />
          </div>
        )}

        <div className="row">
          <div className="col-md-4 mb-3">
            <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: "First name is required" }]}>
              <Input disabled={loading} />
            </Form.Item>
          </div>
          <div className="col-md-4 mb-3">
            <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: "Last name is required" }]}>
              <Input disabled={loading} />
            </Form.Item>
          </div>
          <div className="col-md-4 mb-3">
            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
              <Input disabled={loading} />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <Form.Item label="Phone 1" name="phone1" rules={[{ pattern: /^\d{10}$/, message: "Enter a valid 10-digit phone number" }]}>
              <Input disabled={loading} />
            </Form.Item>
          </div>
          <div className="col-md-4 mb-3">
            <Form.Item label="Phone 2" name="phone2" rules={[{ pattern: /^\d{10}$/, message: "Enter a valid 10-digit phone number" }]}>
              <Input disabled={loading} />
            </Form.Item>
          </div>
          <div className="col-md-4 mb-3">
            <Form.Item label="Pincode" name="pincode" rules={[{ pattern: /^\d{6}$/, message: "Enter a valid 6-digit pincode" }]}>
              <Input disabled={loading} />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <Form.Item label="Address" name="address">
              <Input disabled={loading} />
            </Form.Item>
          </div>
          <div className="col-md-4 mb-3">
            <Form.Item label="City" name="city">
              <Input disabled={loading} />
            </Form.Item>
          </div>
          <div className="col-md-4 mb-3">
            <Form.Item label="State" name="state">
              <Input disabled={loading} />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <Form.Item label="Country" name="country">
              <Input disabled={loading} />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
