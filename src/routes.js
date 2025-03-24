




import React from 'react';
import PrivateRoute from './components/PrivateRoute'; // Import Private Route

const Dashboard = React.lazy(() => import('./views/pages/Dashboard/Dashboard'));
const Reports = React.lazy(() => import('./views/pages/Reports/Reports'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Report = React.lazy(() => import('./views/pages/Reports/Reports'));
const Course = React.lazy(() => import('./views/pages/Course/Course'));
const Videos = React.lazy(() => import('./views/pages/Course/Videos'));
const Dashboard = React.lazy(() => import('./views/pages/Dashboard/Dashboard'))
const Reports = React.lazy(() => import('./views/pages/Reports/Reports'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const Report = React.lazy(() => import('./views/pages/Reports/Reports'))
const Badge = React.lazy(() => import('./views/pages/Badge/index'))


const routes = [
  // { path: '/', exact: true, name: 'Home', element: <PrivateRoute element={<Dashboard />} /> },
  { path: '/dashboard', name: 'Dashboard', element: <PrivateRoute element={<Dashboard />} /> },
  { path: '/table', name: 'Reports', element: <PrivateRoute element={<Reports />} /> },
  { path: '/widgets', name: 'Widgets', element: <PrivateRoute element={<Widgets />} /> },
  { path: '/reports', name: 'Report', element: <PrivateRoute element={<Report />} /> },
  { path: '/course', name: 'Course', element: <PrivateRoute element={<Course />} /> },
  { path: '/videos', name: 'Course', element: <PrivateRoute element={<Videos />} /> },
];
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/table', name: 'Reports', element: Reports },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/table', name: 'Report', element: Report },
  { path: '/badge', name: 'Badge', element: Badge },
]

export default routes;




