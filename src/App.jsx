import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Quotations from './pages/Quotations.jsx'
import Reinsurance from './pages/Reinsurance.jsx'
import Claims from './pages/Claims.jsx'
import Policies from './pages/Policies.jsx'
import Notifications from './pages/Notifications.jsx'
import Placement from './pages/Placement.jsx'
import Reports from './pages/Reports.jsx'
import Placeholder from './pages/Placeholder.jsx'

const pages = {
  dashboard: <Dashboard />,
  notifications: <Notifications />,
  quotations: <Quotations />,
  placement: <Placement />,
  policies: <Policies />,
  reinsurance: <Reinsurance />,
  claims: <Claims />,
  reports: <Reports />,
  clients: <Placeholder title="Client Management" />,
  settings: <Placeholder title="System Configuration" />,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {pages[activeTab]}
      </main>
    </div>
  )
}
