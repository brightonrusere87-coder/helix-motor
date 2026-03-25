import React, { useState } from 'react'
import { Zap, Mail, Lock, Eye, EyeOff, Shield, Activity, Briefcase, AlertCircle, ChevronRight, User } from 'lucide-react'
import { useAuth, ROLES } from '../context/AuthContext.jsx'

const ROLE_OPTIONS = [
  {
    key: 'insurer',
    label: 'Insurer',
    desc: 'Underwrite, bind policies & process claims',
    icon: Shield,
    demo: { email: 'brighton@helixinsurance.co.zw', password: 'helix2026', name: 'Brighton Rusere' },
    accent: '#3d5eff',
    accentBg: 'rgba(61,94,255,0.08)',
    accentBorder: 'rgba(61,94,255,0.25)',
  },
  {
    key: 'reinsurer',
    label: 'Reinsurer',
    desc: 'Manage treaties, fac placements & recoveries',
    icon: Activity,
    demo: { email: 'k.mueller@swissre.com', password: 'swissre2026', name: 'Klaus Mueller' },
    accent: '#34d399',
    accentBg: 'rgba(52,211,153,0.08)',
    accentBorder: 'rgba(52,211,153,0.25)',
  },
  {
    key: 'broker',
    label: 'Broker',
    desc: 'Place risks, earn commission & serve clients',
    icon: Briefcase,
    demo: { email: 'tariro@marshzimbabwe.co.zw', password: 'marsh2026', name: 'Tariro Ndlovu' },
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.08)',
    accentBorder: 'rgba(251,191,36,0.25)',
  },
]

export default function LoginPage() {
  const { login, loginError, loginLoading } = useAuth()
  const [selectedRole, setSelectedRole] = useState('insurer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [demoFilled, setDemoFilled] = useState(false)

  const activeRole = ROLE_OPTIONS.find(r => r.key === selectedRole)

  const handleRoleSelect = (key) => {
    setSelectedRole(key)
    setEmail('')
    setPassword('')
    setDemoFilled(false)
  }

  const fillDemo = () => {
    setEmail(activeRole.demo.email)
    setPassword(activeRole.demo.password)
    setDemoFilled(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: '#020617',
      backgroundImage: `
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(30,58,255,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 80% 90%, rgba(13,37,230,0.07) 0%, transparent 50%)
      `
    }}>
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-helix-600 flex items-center justify-center glow-blue">
              <Zap size={22} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-display text-3xl font-bold text-white leading-none tracking-wide">HELIX</div>
              <div className="text-[11px] text-slate-500 tracking-widest uppercase mt-0.5">Motor & Reinsurance Platform</div>
            </div>
          </div>
          <p className="text-slate-500 text-sm">Sign in to access your workspace</p>
        </div>

        <div className="grid grid-cols-5 gap-6">

          {/* Role selector — left panel */}
          <div className="col-span-2 space-y-3">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-4">Sign in as</p>
            {ROLE_OPTIONS.map(role => {
              const Icon = role.icon
              const active = selectedRole === role.key
              return (
                <button
                  key={role.key}
                  onClick={() => handleRoleSelect(role.key)}
                  className="w-full text-left p-4 rounded-2xl border transition-all duration-200"
                  style={{
                    background: active ? role.accentBg : 'rgba(15,23,42,0.6)',
                    borderColor: active ? role.accentBorder : 'rgba(255,255,255,0.06)',
                    boxShadow: active ? `0 0 0 1px ${role.accentBorder}` : 'none',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: active ? `${role.accent}22` : 'rgba(255,255,255,0.04)', border: `1px solid ${active ? role.accentBorder : 'transparent'}` }}>
                      <Icon size={15} style={{ color: active ? role.accent : '#64748b' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold" style={{ color: active ? role.accent : '#cbd5e1' }}>
                          {role.label}
                        </span>
                        {active && <ChevronRight size={13} style={{ color: role.accent }} />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{role.desc}</p>
                    </div>
                  </div>
                </button>
              )
            })}

            {/* Demo hint */}
            <div className="mt-4 p-3 rounded-xl border border-slate-800/60" style={{ background: 'rgba(15,23,42,0.4)' }}>
              <p className="text-[10px] text-slate-600 font-medium uppercase tracking-wider mb-2">Demo access</p>
              <button onClick={fillDemo}
                className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-xs transition-all hover:bg-slate-800/60"
                style={{ color: activeRole.accent, border: `1px solid ${activeRole.accentBorder}`, background: activeRole.accentBg }}>
                <User size={11} />
                Fill as {activeRole.demo.name}
              </button>
            </div>
          </div>

          {/* Login form — right panel */}
          <div className="col-span-3">
            <div className="glass rounded-2xl p-8">
              {/* Role badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: activeRole.accent }} />
                <span className="text-xs font-medium uppercase tracking-widest" style={{ color: activeRole.accent }}>
                  {activeRole.label} Portal
                </span>
              </div>

              <h2 className="font-display text-2xl text-white font-bold mb-1">Welcome back</h2>
              <p className="text-slate-500 text-sm mb-8">Enter your credentials to continue</p>

              {/* Error */}
              {loginError && (
                <div className="flex items-center gap-3 p-3 rounded-xl mb-5 bg-rose-500/10 border border-rose-500/20">
                  <AlertCircle size={15} className="text-rose-400 flex-shrink-0" />
                  <p className="text-sm text-rose-300">{loginError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="you@organisation.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                      style={{
                        background: 'rgba(15,23,42,0.8)',
                        border: `1px solid ${email ? activeRole.accentBorder : 'rgba(255,255,255,0.07)'}`,
                      }}
                      onFocus={e => e.target.style.borderColor = activeRole.accentBorder}
                      onBlur={e => e.target.style.borderColor = email ? activeRole.accentBorder : 'rgba(255,255,255,0.07)'}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-11 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                      style={{
                        background: 'rgba(15,23,42,0.8)',
                        border: `1px solid ${password ? activeRole.accentBorder : 'rgba(255,255,255,0.07)'}`,
                      }}
                      onFocus={e => e.target.style.borderColor = activeRole.accentBorder}
                      onBlur={e => e.target.style.borderColor = password ? activeRole.accentBorder : 'rgba(255,255,255,0.07)'}
                    />
                    <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                  style={{
                    background: loginLoading ? 'rgba(61,94,255,0.4)' : `linear-gradient(135deg, ${activeRole.accent}, ${activeRole.accent}cc)`,
                    boxShadow: loginLoading ? 'none' : `0 0 24px ${activeRole.accent}33`,
                    opacity: loginLoading ? 0.7 : 1,
                  }}
                >
                  {loginLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>Sign in as {activeRole.label} <ChevronRight size={15} /></>
                  )}
                </button>
              </form>

              {/* Divider + IRA note */}
              <div className="mt-8 pt-5 border-t border-slate-800/60">
                <p className="text-[11px] text-slate-600 text-center leading-relaxed">
                  Access is governed by IRA Zimbabwe regulations.<br />
                  Unauthorised access is a criminal offence.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-700 mt-8">
          Helix Motor Insurance & Reinsurance Platform · IRA Reg. No. IRA-0012-ZW · © 2026
        </p>
      </div>
    </div>
  )
}
