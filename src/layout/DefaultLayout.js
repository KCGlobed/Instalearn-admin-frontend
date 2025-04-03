import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { UserProvider } from './GlobalContext'

const DefaultLayout = () => {
  return (
    <div>
      <UserProvider >
      <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      </UserProvider>
    </div>
  )
}

export default DefaultLayout
