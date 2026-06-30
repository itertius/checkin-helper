import { useState } from 'react'

export default function QuickAddStudent({ onAdd }) {
  const [form, setForm] = useState({ studentNumber: '', firstName: '', lastName: '' })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.firstName.trim()) return
    setSaving(true)
    await onAdd({ ...form, guardianAttended: true })
    setForm({ studentNumber: '', firstName: '', lastName: '' })
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap sm:flex-nowrap">
      <input
        value={form.studentNumber}
        onChange={e => setForm(p => ({ ...p, studentNumber: e.target.value }))}
        placeholder="เลขที่"
        className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        value={form.firstName}
        onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
        placeholder="ชื่อ"
        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        value={form.lastName}
        onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
        placeholder="นามสกุล"
        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors whitespace-nowrap"
      >
        + เพิ่ม
      </button>
    </form>
  )
}
