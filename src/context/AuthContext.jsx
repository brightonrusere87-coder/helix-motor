import React, { createContext, useContext, useState, useCallback } from 'react'

// ─── Role definitions ─────────────────────────────────────────────────────────
// Each role defines which nav pages are visible and what actions are permitted.
export const ROLES = {
  insurer: {
    label: 'Insurer',
    color: 'text-helix-400',
    bg: 'bg-helix-600/20',
    border: 'border-helix-600/30',
    dot: 'bg-helix-400',
    pages: ['dashboard', 'notifications', 'quotations', 'placement', 'policies', 'claims', 'clients', 'reports', 'openmarket', 'premium', 'settings'],
    permissions: {
      canBindPolicy: true,
      canIssueQuote: true,
      canViewReinsurance: false,
      canEditTreaty: false,
      canPlaceFacultative: false,
      canViewAllPolicies: true,
      canProcessClaims: true,
      canViewBrokerCommission: false,
      canSignAsInsurer: true,
      canSignAsReinsurer: false,
      canSignAsBroker: false,
    },
  },
  reinsurer: {
    label: 'Reinsurer',
    color: 'text-emerald-400',
    bg: 'bg-emerald-600/20',
    border: 'border-emerald-600/30',
    dot: 'bg-emerald-400',
    pages: ['dashboard', 'reinsurance', 'placement', 'policies', 'notifications', 'reports', 'openmarket', 'premium'],
    permissions: {
      canBindPolicy: false,
      canIssueQuote: false,
      canViewReinsurance: true,
      canEditTreaty: true,
      canPlaceFacultative: true,
      canViewAllPolicies: true,
      canProcessClaims: false,
      canViewBrokerCommission: false,
      canSignAsInsurer: false,
      canSignAsReinsurer: true,
      canSignAsBroker: false,
    },
  },
  broker: {
    label: 'Broker',
    color: 'text-amber-400',
    bg: 'bg-amber-600/20',
    border: 'border-amber-600/30',
    dot: 'bg-amber-400',
    pages: ['dashboard', 'notifications', 'quotations', 'placement', 'policies', 'reinsurance', 'claims', 'clients', 'reports', 'openmarket', 'premium'],
    permissions: {
      canBindPolicy: false,
      canIssueQuote: true,
      canViewReinsurance: true,
      canEditTreaty: false,
      canPlaceFacultative: true,
      canViewAllPolicies: false,
      canProcessClaims: false,
      canViewBrokerCommission: true,
      canSignAsInsurer: false,
      canSignAsReinsurer: false,
      canSignAsBroker: true,
    },
  },
}

// ─── Demo users ───────────────────────────────────────────────────────────────
// In production replace this with an API call / JWT validation.
const DEMO_USERS = [
  {
    id: 'USR-001',
    name: 'Brighton Rusere',
    initials: 'BR',
    email: 'brighton@helixinsurance.co.zw',
    password: 'helix2026',
    role: 'insurer',
    title: 'Senior Underwriter',
    organisation: 'Helix Insurance Company',
    orgRef: 'HLX-INS-001',
    licenceNo: 'IRA-UW-2024-0412',
    phone: '+263 242 123 456',
  },
  {
    id: 'USR-002',
    name: 'Klaus Mueller',
    initials: 'KM',
    email: 'k.mueller@swissre.com',
    password: 'swissre2026',
    role: 'reinsurer',
    title: 'Regional Underwriting Manager',
    organisation: 'Swiss Re Africa',
    orgRef: 'SR-ZW-RI-001',
    licenceNo: 'IRA-RI-2024-0089',
    phone: '+41 43 285 2121',
  },
  {
    id: 'USR-003',
    name: 'Tariro Ndlovu',
    initials: 'TN',
    email: 'tariro@marshzimbabwe.co.zw',
    password: 'marsh2026',
    role: 'broker',
    title: 'Account Executive',
    organisation: 'Marsh Zimbabwe',
    orgRef: 'MZW-BRK-001',
    licenceNo: 'IRA-BRK-2024-0221',
    phone: '+263 77 456 7890',
  },
]

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoginLoading(true)
    setLoginError('')
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800))
    const found = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (found) {
      const { password: _, ...safeUser } = found
      setUser(safeUser)
      setLoginLoading(false)
      return true
    } else {
      setLoginError('Invalid email or password. Please try again.')
      setLoginLoading(false)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setLoginError('')
  }, [])

  const can = useCallback((permission) => {
    if (!user) return false
    return ROLES[user.role]?.permissions[permission] ?? false
  }, [user])

  const roleConfig = user ? ROLES[user.role] : null
  const allowedPages = roleConfig?.pages ?? []

  return (
    <AuthContext.Provider value={{
      user, login, logout, loginError, loginLoading,
      can, roleConfig, allowedPages,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
