import React from 'react';
import { Tabs } from 'antd';
import { FileTextOutlined, BuildOutlined } from '@ant-design/icons';
import EditCourseForm from './EditCourseForm';
import EditNestedCourseBuilder from './EditCourseBuilder';


const EditCourseTab = () => {
  const items = [
    {
      key: '1',
      label: 'Edit Information',
      icon: <FileTextOutlined />,
      children: <EditCourseForm />,
    },
    {
      key: '2',
      label: 'Edit Course Builder',
      icon: <BuildOutlined />,
      children: <EditNestedCourseBuilder />,
      
    },
  ];

  return <Tabs defaultActiveKey="1" items={items}    className="custom-tabs" indicator={{ size: origin => origin + 20, align: "center" }} />;
};

export default EditCourseTab;
