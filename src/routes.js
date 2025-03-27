




import React from 'react';
import PrivateRoute from './components/PrivateRoute'; // Import Private Route
import ManageBlog from './views/pages/ManageBlog';

const Dashboard = React.lazy(() => import('./views/pages/Dashboard/Dashboard'));
const Reports = React.lazy(() => import('./views/pages/Reports/Reports'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Report = React.lazy(() => import('./views/pages/Reports/Reports'));
const Course = React.lazy(() => import('./views/pages/Course/Course'));
const Videos = React.lazy(() => import('./views/pages/Course/Videos'));
const Category = React.lazy(() => import('./views/pages/Course/Category'));
const Topic = React.lazy(() => import('./views/pages/Course/Topic'));
const Ebook = React.lazy(() => import('./views/pages/Course/Ebook'));
const Private = React.lazy(() => import('./views/pages/Institutes/Private'));
const Badge =React.lazy(() => import('./views/pages/Badge/index'))
const ManageSubscription =React.lazy(() => import('./views/pages/ManageSubscription/index'))
const ManageStaff =React.lazy(() => import('./views/pages/ManageStaff/index'))




const routes = [
  // { path: '/', exact: true, name: 'Home', element: <PrivateRoute element={<Dashboard />} /> },
  { path: '/dashboard', name: 'Dashboard', element: <PrivateRoute element={<Dashboard />} /> },
  { path: '/table', name: 'Reports', element: <PrivateRoute element={<Reports />} /> },
  { path: '/widgets', name: 'Widgets', element: <PrivateRoute element={<Widgets />} /> },
  { path: '/reports', name: 'Report', element: <PrivateRoute element={<Report />} /> },
  { path: '/course', name: 'Course', element: <PrivateRoute element={<Course />} /> },
  { path: '/videos', name: 'Course', element: <PrivateRoute element={<Videos />} /> },
  { path: '/category', name: 'Course', element: <PrivateRoute element={<Category />} /> },
  { path: '/topic', name: 'Course', element: <PrivateRoute element={<Topic />} /> },
  { path: '/e-book', name: 'Course', element: <PrivateRoute element={<Ebook />} /> },
  { path: '/badge', name: 'Badge', element: <PrivateRoute element={<Badge />} /> },
  { path: '/private-Universities', name: 'Institutes', element: <PrivateRoute element={<Private />} /> },
  { path: '/managesubscription', name: 'ManageSubscription', element: <PrivateRoute element={<ManageSubscription />} /> },
  { path: '/managestaff', name: 'ManageStaff', element: <PrivateRoute element={<ManageStaff />} /> },
  { path: '/manageblogs', name: 'ManageBlog', element: <PrivateRoute element={<ManageBlog />} /> },
];

export default routes;




