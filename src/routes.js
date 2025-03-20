import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/Dashboard/Dashboard'))
const Reports = React.lazy(() => import('./views/pages/Reports/Reports'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const Report = React.lazy(() => import('./views/pages/Reports/Reports'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/table', name: 'Reports', element: Reports },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/table', name: 'Report', element: Report },
]

export default routes
