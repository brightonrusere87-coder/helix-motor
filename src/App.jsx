import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Sidebar from './components/Sidebar.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Quotations from './pages/Quotations.jsx'
import Reinsurance from './pages/Reinsurance.jsx'
import Claims from './pages/Claims.jsx'
import Policies from './pages/Policies.jsx'
import Notifications from './pages/Notifications.jsx'
import Placement from './pages/Placement.jsx'
import Reports from './pages/Reports.jsx'
import Placeholder from './pages/Placeholder.jsx'
import OpenMarket from './pages/OpenMarket.jsx'

const ALL_PAGES = {
  dashboard:     <Dashboard />,
  notifications: <Notifications />,
  quotations:    <Quotations />,
  placement:     <Placement />,
  policies:      <Policies />,
  reinsurance:   <Reinsurance />,
  claims:        <Claims />,
  reports:       <Reports />,
  clients:       <Placeholder title="Client Management" />,
  settings:      <Placeholder title="System Configuration" />,
  openmarket:    <OpenMarket />,
}

function AuthenticatedApp() {
  const { allowedPages } = useAuth()
  const defaultPage = allowedPages[0] ?? 'dashboard'
  const [activeTab, setActiveTab] = useState(defaultPage)
  const safeTab = allowedPages.includes(activeTab) ? activeTab : defaultPage

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={safeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {ALL_PAGES[safeTab]}
      </main>
    </div>
  )
}

function Root() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <AuthenticatedApp /> : <LoginPage />
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  )
}