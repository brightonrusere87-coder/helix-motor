import React, { useState, lazy, Suspense } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Sidebar from './components/Sidebar.jsx'
import LoginPage from './pages/LoginPage.jsx'

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Quotations = lazy(() => import('./pages/Quotations.jsx'))
const Reinsurance = lazy(() => import('./pages/Reinsurance.jsx'))
const Claims = lazy(() => import('./pages/Claims.jsx'))
const Policies = lazy(() => import('./pages/Policies.jsx'))
const Notifications = lazy(() => import('./pages/Notifications.jsx'))
const Placement = lazy(() => import('./pages/Placement.jsx'))
const Reports = lazy(() => import('./pages/Reports.jsx'))
const Placeholder = lazy(() => import('./pages/Placeholder.jsx'))
const OpenMarket = lazy(() => import('./pages/OpenMarket.jsx'))
const Clients = lazy(() => import('./pages/Clients.jsx'))

const ALL_PAGES = {
  dashboard:     <Dashboard />,
  notifications: <Notifications />,
  quotations:    <Quotations />,
  placement:     <Placement />,
  policies:      <Policies />,
  reinsurance:   <Reinsurance />,
  claims:        <Claims />,
  clients:       <Clients />,
  reports:       <Reports />,
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
        <Suspense fallback={<div className="text-white">Loading module…</div>}>
          {ALL_PAGES[safeTab]}
        </Suspense>
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