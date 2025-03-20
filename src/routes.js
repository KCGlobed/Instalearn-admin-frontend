import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/Dashboard/Dashboard'))
const Reports = React.lazy(() => import('./views/pages/Reports/Reports'))







// Icons


const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/table', name: 'Reports', element: Reports },
  
  
  { path: '/widgets', name: 'Widgets', element: widgets },
]

export default routes
