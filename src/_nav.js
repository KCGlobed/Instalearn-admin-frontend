import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Badge',
    to: '/badge',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  
  },

 
  {
    component: CNavGroup,
    name: 'Course',
    to: '/course',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    
    items: [
      {
        component: CNavItem,
        name: 'Course ',
        to: '/course',
      },
      {
        component: CNavItem,
        name: 'Upload Videos ',
        to: '/videos',
      },
      {
        component: CNavItem,
        name: 'Category',
        to: '/category',
      },
      {
        component: CNavItem,
        name: 'Topic',
        to: '/topic',
      },
      {
        component: CNavItem,
        name: 'Manage E books',
        to: '/e-book',
      },
      
    ],
  },
  {
    component: CNavItem,
    name: 'Manage Subscription',
    to: '/managesubscription',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Staff',
    to: '/managestaff',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  
  },


  {
    component: CNavGroup,
    name: 'Institutes',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Central Universities',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'State Universities',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Private Universities',
        to: '/private-universities',
      },
      {
        component: CNavItem,
        name: 'Affiliated Colleges',
        to: '/buttons/dropdowns',
      },
      
    ],
  },


  {
    component: CNavItem,
    name: 'Manage Permissions',
    to: '/manage-permission',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },

  {
    component: CNavItem,
    name: 'Manage User Payments',
    to: '/user-payment',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Payment Plans',
    to: '/payment-plan',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Offers',
    to: '/offers',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Subscribe Users',
    to: '/subscribe-users',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Free Trail',
    to: '/free-trail',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  
  {
    component: CNavItem,
    name: 'Manage News',
    to: '/news',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Blogs',
    to: '/manageblogs',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Reels',
    to: '/managereel',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Events',
    to: '/event',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  
  
  
]

export default _nav
