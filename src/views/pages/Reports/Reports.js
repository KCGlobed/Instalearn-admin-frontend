import React from "react";
import { Tabs } from 'antd';
import { 
  UserOutlined,
  TeamOutlined,
  TagOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  ProfileOutlined,
  BellOutlined
} from '@ant-design/icons';
import UserReport from "./UserReport";
import CorporateReport from "./CorporateReport";
import DiscountReport from "./DiscountReport";
import PasswordReport from "./PasswordReport";
import BadgeReport from "./BadgeReport";
import ProfileReport from "./ProfileReport";

const Tableview = () => {
  const [alignValue] = React.useState('center');
  
  const items = [
    {
      key: "home",
      label: (
        <span>
          <UserOutlined style={{ marginRight: 8 }} />
          User
        </span>
      ),
      children: <UserReport />,
    },
    {
      key: "corporate",
      label: (
        <span>
          <TeamOutlined style={{ marginRight: 8 }} />
          Corp reg
        </span>
      ),
      children: <CorporateReport />,
    },
    {
      key: "discount",
      label: (
        <span>
          <TagOutlined style={{ marginRight: 8 }} />
          Discount coupon
        </span>
      ),
      children: <DiscountReport />,
    },
    {
      key: "change_pass",
      label: (
        <span>
          <LockOutlined style={{ marginRight: 8 }} />
          Change Password
        </span>
      ),
      children: <PasswordReport />,
    },
    {
      key: "badge",
      label: (
        <span>
          <SafetyCertificateOutlined style={{ marginRight: 8 }} />
          Badge Issue
        </span>
      ),
      children: <BadgeReport />,
    },
    {
      key: "profile",
      label: (
        <span>
          <ProfileOutlined style={{ marginRight: 8 }} />
          Profile
        </span>
      ),
      children: <ProfileReport />,
    },
    {
      key: "notifications",
      label: (
        <span>
          <BellOutlined style={{ marginRight: 8 }} />
          Notifications
        </span>
      ),
      children: <PasswordReport />, // Consider creating a NotificationsReport component
    },
  ];

  return (
    <Tabs
      defaultActiveKey="home"
      items={items}
      className="custom-tabs"
      indicator={{
        size: (origin) => origin + 20,
        align: alignValue
      }}
    />
  );
};

export default Tableview;