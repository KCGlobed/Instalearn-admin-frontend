




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
const SubCategory = React.lazy(() => import('./views/pages/Course/SubCategory'));
const Topic = React.lazy(() => import('./views/pages/Course/Topic'));
const Ebook = React.lazy(() => import('./views/pages/Course/Ebook'));
const Private = React.lazy(() => import('./views/pages/Institutes/Private'));
const Badge =React.lazy(() => import('./views/pages/Badge/index'))
const ManageSubscription =React.lazy(() => import('./views/pages/ManageSubscription/index'))
const ManageStaff =React.lazy(() => import('./views/pages/ManageStaff/index'))
const Permission =React.lazy(() => import('./views/pages/ManagePermissions/Permission'))
const UserPayments =React.lazy(() => import('./views/pages/UserPayments/UserPayments'))
const PaymentPlan =React.lazy(() => import('./views/pages/PaymentPlan/PaymentPlan'))
const Offers =React.lazy(() => import('./views/pages/ManageOffers/offers'))
const ManageReel =React.lazy(() => import('./views/pages/ManageReels/index'))
const ManageNews =React.lazy(() => import('./views/pages/News/index'))
const FreeTrail =React.lazy(() => import('./views/pages/FreeTrail/index'))
const SubscribeUser =React.lazy(() => import('./views/pages/SubscribeUser/index'))
const Event =React.lazy(() => import('./views/pages/Event/index'))
const ManagePermissions =React.lazy(() => import('./views/pages/ManageStaff/ManagePermission'))
const MyProfile =React.lazy(() => import('./views/pages/Profile/index'))
const Chapter =React.lazy(() => import('./views/pages/Course/Chapter'))




const routes = [
  // { path: '/', exact: true, name: 'Home', element: <PrivateRoute element={<Dashboard />} /> },
  { path: '/dashboard', name: 'Dashboard', element: <PrivateRoute element={<Dashboard />} /> },
  { path: '/reports', name: 'Reports', element: <PrivateRoute element={<Reports />} /> },
  { path: '/widgets', name: 'Widgets', element: <PrivateRoute element={<Widgets />} /> },
  { path: '/reports', name: 'Report', element: <PrivateRoute element={<Report />} /> },
  { path: '/course', name: 'Course', element: <PrivateRoute element={<Course />} /> },
  { path: '/videos', name: 'Course', element: <PrivateRoute element={<Videos />} /> },
  { path: '/category', name: 'Course', element: <PrivateRoute element={<Category />} /> },
  { path: '/sub-category', name: 'Course', element: <PrivateRoute element={<SubCategory />} /> },
  { path: '/topic', name: 'Course', element: <PrivateRoute element={<Topic />} /> },
  { path: '/e-book', name: 'Course', element: <PrivateRoute element={<Ebook />} /> },
  { path: '/badge', name: 'Badge', element: <PrivateRoute element={<Badge />} /> },
  { path: '/private-Universities', name: 'Institutes', element: <PrivateRoute element={<Private />} /> },
  { path: '/managesubscription', name: 'ManageSubscription', element: <PrivateRoute element={<ManageSubscription />} /> },
  { path: '/managestaff', name: 'ManageStaff', element: <PrivateRoute element={<ManageStaff />} /> },
  { path: '/manageblogs', name: 'ManageBlog', element: <PrivateRoute element={<ManageBlog />} /> },
  { path: '/manage-permission', name: 'Manage Permissions', element: <PrivateRoute element={<Permission />} /> },
  { path: '/user-payment', name: 'User Payments', element: <PrivateRoute element={<UserPayments />} /> },
  { path: '/payment-plan', name: 'Payment Plan', element: <PrivateRoute element={<PaymentPlan />} /> },
  { path: '/offers', name: 'Payment Plan', element: <PrivateRoute element={<Offers />} /> },
  { path: '/managereel', name: 'Payment Plan', element: <PrivateRoute element={<ManageReel />} /> },
  { path: '/news', name: 'News', element: <PrivateRoute element={<ManageNews />} /> },
  { path: '/free-trail', name: 'Free Trail', element: <PrivateRoute element={<FreeTrail />} /> },
  { path: '/subscribe-users', name: 'Subscribe User', element: <PrivateRoute element={<SubscribeUser />} /> },
  { path: '/event', name: 'Subscribe User', element: <PrivateRoute element={<Event />} /> },
  { path: '/staff/manage-permission/:id', name: 'Subscribe User', element: <PrivateRoute element={<ManagePermissions />} /> },
  { path: '/my-profile', name: 'My Profile', element: <PrivateRoute element={<MyProfile />} /> },
  { path: '/chapters', name: 'My Profile', element: <PrivateRoute element={<Chapter />} /> },
];


export default routes;




