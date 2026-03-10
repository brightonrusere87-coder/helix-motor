import React from 'react'
import { Construction } from 'lucide-react'

export default function Placeholder({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
        <Construction size={28} className="text-slate-600" />
      </div>
      <h2 className="font-display text-2xl font-bold text-slate-400 mb-2">{title}</h2>
      <p className="text-slate-600 text-sm max-w-xs">This module is under active development. Backend integration coming soon.</p>
    </div>
  )
}
