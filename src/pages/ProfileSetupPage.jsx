import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const SESSIONS = ['ไม่มีตอน', 'ก', 'ข']

export default function ProfileSetupPage() {
  const { user, saveProfile, profile, logout } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    displayName: profile?.displayName || user?.displayName || '',
    classNumber: profile?.classNumber || 'ม.3',
    classSection: profile?.classSection || '',
    session: profile?.session || 'ไม่มีตอน',
  })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.classSection.trim()) return
    setSaving(true)
    await saveProfile(form, user?.email)
    navigate('/meetings', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-4xl mb-3 text-center">🏫</div>
        <h1 className="text-xl font-bold text-gray-900 mb-1 text-center">ตั้งค่าข้อมูลครู</h1>
        <p className="text-sm text-gray-500 text-center mb-6">กรุณาระบุห้องของท่านก่อนใช้งาน</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ชื่อครู</label>
            <input
              value={form.displayName}
              onChange={e => setForm(p => ({ ...p, displayName: e.target.value }))}
              placeholder="ชื่อ-นามสกุล"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">ชั้น</label>
              <input
                value={form.classNumber}
                onChange={e => setForm(p => ({ ...p, classNumber: e.target.value }))}
                placeholder="ม.3"
                required
                className="w-full border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">ห้อง</label>
              <input
                value={form.classSection}
                onChange={e => setForm(p => ({ ...p, classSection: e.target.value }))}
                placeholder="1"
                required
                className="w-full border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">ตอน</label>
              <select
                value={form.session}
                onChange={e => setForm(p => ({ ...p, session: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SESSIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || !form.classSection.trim()}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? 'กำลังบันทึก...' : 'บันทึกและเข้าใช้งาน'}
          </button>
        </form>

        <button
          onClick={logout}
          className="mt-4 w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  )
}
