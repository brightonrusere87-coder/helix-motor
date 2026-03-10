import React from 'react'

export function PageHeader({ title, subtitle, badge, actions }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        {badge && (
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase"
              style={{
                background: 'rgba(14,165,233,0.1)',
                border: '1px solid rgba(14,165,233,0.2)',
                color: '#0EA5E9',
              }}
            >
              {badge}
            </span>
          </div>
        )}
        <h1
          className="font-display text-4xl text-white tracking-wider"
          style={{ textShadow: '0 0 30px rgba(14,165,233,0.2)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-[#4A6080] text-sm mt-1">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}

export function StatCard({ label, value, unit, change, changeDir, color = '#0EA5E9', icon, delay = 0 }) {
  return (
    <div
      className="rounded-lg p-5 relative overflow-hidden hover-glow animate-slide-up cursor-default"
      style={{
        background: 'rgba(13, 21, 38, 0.9)',
        border: '1px solid #1A2A45',
        animationDelay: `${delay}s`,
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-10"
        style={{
          background: `radial-gradient(circle at top right, ${color}, transparent)`,
        }}
      />
      <div className="flex items-start justify-between mb-3">
        <span className="text-[#4A6080] text-xs font-mono tracking-wider uppercase">{label}</span>
        {icon && (
          <span style={{ color }}>{icon}</span>
        )}
      </div>
      <div className="flex items-end gap-1">
        <span
          className="text-3xl font-display tracking-wide"
          style={{ color }}
        >
          {value}
        </span>
        {unit && <span className="text-[#4A6080] text-sm mb-1 font-mono">{unit}</span>}
      </div>
      {change && (
        <div className="mt-2 flex items-center gap-1">
          <span
            className="text-xs font-mono"
            style={{ color: changeDir === 'up' ? '#10B981' : '#EF4444' }}
          >
            {changeDir === 'up' ? '↑' : '↓'} {change}
          </span>
          <span className="text-[#4A6080] text-xs">vs last month</span>
        </div>
      )}
    </div>
  )
}

export function Panel({ title, children, className = '', actions }) {
  return (
    <div
      className={`rounded-lg overflow-hidden animate-slide-up ${className}`}
      style={{
        background: 'rgba(13, 21, 38, 0.9)',
        border: '1px solid #1A2A45',
      }}
    >
      {title && (
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b border-[#1A2A45]"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-[#4A6080]">{title}</span>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}

export function Badge({ label, type = 'default' }) {
  const styles = {
    default: { bg: 'rgba(74,96,128,0.15)', border: 'rgba(74,96,128,0.3)', text: '#4A6080' },
    active: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#10B981' },
    pending: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#F59E0B' },
    danger: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#EF4444' },
    info: { bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.2)', text: '#0EA5E9' },
  }
  const s = styles[type] || styles.default
  return (
    <span
      className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
    >
      {label}
    </span>
  )
}

export function Button({ children, variant = 'primary', onClick, small, icon }) {
  const styles = {
    primary: {
      background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
      color: 'white',
      border: 'none',
      boxShadow: '0 0 16px rgba(14,165,233,0.3)',
    },
    secondary: {
      background: 'rgba(26,42,69,0.5)',
      color: '#CBD5E1',
      border: '1px solid #1A2A45',
    },
    ghost: {
      background: 'transparent',
      color: '#4A6080',
      border: '1px solid #1A2A45',
    },
    danger: {
      background: 'rgba(239,68,68,0.1)',
      color: '#EF4444',
      border: '1px solid rgba(239,68,68,0.3)',
    },
  }
  const s = styles[variant] || styles.primary
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md font-medium tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95 ${small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}
      style={s}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}

export function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#1A2A45]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left py-3 px-4 text-[10px] font-mono tracking-widest uppercase text-[#4A6080]"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[#1A2A45] border-opacity-50 hover:bg-[#0D1526] transition-colors cursor-pointer group"
            >
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4 text-[#CBD5E1]">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Input({ label, placeholder, type = 'text', value, onChange, monospace }) {
  return (
    <div>
      {label && (
        <label className="block text-[10px] font-mono tracking-widest uppercase text-[#4A6080] mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded-md text-sm text-[#CBD5E1] placeholder-[#2A3A50] outline-none transition-all duration-200 ${monospace ? 'font-mono' : ''}`}
        style={{
          background: 'rgba(8, 12, 20, 0.8)',
          border: '1px solid #1A2A45',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(14,165,233,0.5)'
          e.target.style.boxShadow = '0 0 0 2px rgba(14,165,233,0.1)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#1A2A45'
          e.target.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}

export function Select({ label, options, value, onChange }) {
  return (
    <div>
      {label && (
        <label className="block text-[10px] font-mono tracking-widest uppercase text-[#4A6080] mb-1.5">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-md text-sm text-[#CBD5E1] outline-none transition-all duration-200"
        style={{
          background: 'rgba(8, 12, 20, 0.8)',
          border: '1px solid #1A2A45',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: '#0D1526' }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function MiniChart({ data, color = '#0EA5E9', height = 48 }) {
  const max = Math.max(...data)
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - (v / max) * 90
    return `${x},${y}`
  }).join(' ')

  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={`url(#grad-${color.replace('#','')})`}
      />
    </svg>
  )
}
