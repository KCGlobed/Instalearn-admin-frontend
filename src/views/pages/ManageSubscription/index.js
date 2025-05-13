import React from 'react';
import { Tabs } from 'antd';
import { 
  TeamOutlined, 
  ApartmentOutlined, 
  AuditOutlined,
} from '@ant-design/icons';
import StudentSubsciptionPlan from './StudentSubsciptionPlan';
import CoprateSubsciptionPlan from './CoprateSubsciptionPlan';
import UniversityPlan from './UniversityPlan';

const ManageSubscription = () => {
  const [alignValue] = React.useState('center');
  
  const items = [
    {
      key: '1',
      label: 'Students',
      icon: <TeamOutlined />,
      children: <StudentSubsciptionPlan />,
    },
    {
      key: '2',
      label: 'Corporate',
      icon: <ApartmentOutlined />,
      children:<CoprateSubsciptionPlan />,
    },
    {
      key: '4',
      label: 'University',
      icon: <AuditOutlined />, 
      children: <UniversityPlan />,
    }
  ];

  return (
    <Tabs 
      // defaultActiveKey="1" 
      items={items} 
      className="custom-tabs"
      indicator={{ size: origin => origin + 20, align: alignValue }}
    />
  );
};

export default ManageSubscription;