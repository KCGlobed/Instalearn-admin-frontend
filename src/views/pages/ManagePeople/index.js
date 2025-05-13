import React from 'react';
import { Tabs } from 'antd';
import { FileTextOutlined, BuildOutlined } from '@ant-design/icons';
import ManageInstructor from '../ManageInstructor';
import ManageStaff from '../ManageStaff';

const ManagePeople = () => {
  const items = [
    {
      key: '1',
      label: 'Manage Staff',
      icon: <FileTextOutlined />,
      children:<ManageStaff /> ,
    },
    {
      key: '2',
      label: 'Manage Instructors',
      icon: <BuildOutlined />,

      children:<ManageInstructor />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} className="custom-tabs" indicator={{ size: origin => origin + 20, align: "center" }} />;
};

export default ManagePeople;
