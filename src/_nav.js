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
    to: '/table',
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
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Topic',
        to: '/buttons/dropdowns',
      },
      {
        component: CNavItem,
        name: 'Manage E books',
        to: '/buttons/dropdowns',
      },
      
    ],
  },
  {
    component: CNavItem,
    name: 'Manage Subscription',
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Staff',
    to: '/badges',
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
        to: '/buttons/dropdowns',
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
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },

  {
    component: CNavItem,
    name: 'Manage User Payments',
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Payment Plans',
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Offers',
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Subscribe Users',
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Free Trail',
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  
  {
    component: CNavItem,
    name: 'Manage News',
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Blogs',
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Reels',
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Manage Events',
    to: '/badges',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  
  
  
]

export default _nav
