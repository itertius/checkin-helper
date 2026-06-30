import { useState, useEffect } from 'react'
import { collection, onSnapshot, setDoc, deleteDoc, doc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import { Link } from 'react-router-dom'

export default function AdminPage() {
  const { user } = useAuth()
  const [admins, setAdmins] = useState([])
  const [email, setEmail] = useState('')
  const [uid, setUid] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    return onSnapshot(collection(db, 'admins'), snap => {
      setAdmins(snap.docs.map(d => ({ uid: d.id, ...d.data() })))
    })
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    let targetUid = uid.trim()

    if (!targetUid && email.trim()) {
      // ค้นหา uid จาก userProfiles ตาม email
      const q = query(collection(db, 'userProfiles'), where('email', '==', email.trim()))
      const snap = await getDocs(q)
      if (!snap.empty) {
        targetUid = snap.docs[0].id
      } else {
        // ลองค้นหาจาก admins เอง
        setMessage(`ไม่พบ uid สำหรับ ${email} — user ต้อง login ก่อน หรือกรอก uid ตรงๆ`)
        setSaving(false)
        return
      }
    }

    if (!targetUid) {
      setMessage('กรุณากรอก email หรือ uid')
      setSaving(false)
      return
    }

    await setDoc(doc(db, 'admins', targetUid), {
      email: email.trim() || '—',
      addedBy: user.uid,
      addedAt: serverTimestamp(),
    })
    setEmail('')
    setUid('')
    setMessage('เพิ่ม admin สำเร็จ')
    setSaving(false)
  }

  async function handleRemove(targetUid) {
    if (targetUid === user.uid) {
      if (!confirm('ลบตัวเองออกจาก admin?')) return
    }
    await deleteDoc(doc(db, 'admins', targetUid))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Admin Panel" />
      <main className="max-w-2xl mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2 mt-2">
          <Link to="/meetings" className="text-blue-600 hover:underline text-sm">← ประชุมทั้งหมด</Link>
          <span className="text-gray-400 text-sm">/</span>
          <span className="text-sm text-gray-700 font-medium">จัดการ Admin</span>
        </div>

        {/* เพิ่ม admin */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-purple-50 border-b border-purple-100 px-5 py-3">
            <p className="text-sm font-semibold text-purple-800">เพิ่ม Admin</p>
          </div>
          <form onSubmit={handleAdd} className="p-5 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email (ถ้า user เคย login แล้ว)</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@gmail.com"
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">หรือ UID ตรงๆ (จาก Firebase Console)</label>
              <input
                value={uid}
                onChange={e => setUid(e.target.value)}
                placeholder="UID จาก Firebase Auth"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {message && (
              <p className={`text-xs ${message.includes('สำเร็จ') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>
            )}
            <button
              type="submit"
              disabled={saving || (!email.trim() && !uid.trim())}
              className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'กำลังเพิ่ม...' : '+ เพิ่ม Admin'}
            </button>
          </form>
        </div>

        {/* รายชื่อ admin */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 font-semibold text-gray-800">
            รายชื่อ Admin ({admins.length} คน)
          </div>
          {admins.length === 0 ? (
            <p className="text-center text-gray-400 py-6 text-sm">ยังไม่มี admin</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {admins.map(a => (
                <div key={a.uid} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">{a.email}</p>
                    <p className="text-xs text-gray-400 font-mono truncate">{a.uid}</p>
                  </div>
                  {a.uid === user.uid && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">คุณ</span>
                  )}
                  <button
                    onClick={() => handleRemove(a.uid)}
                    className="text-gray-400 hover:text-red-500 text-sm transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* UID ของตัวเอง */}
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-500 font-semibold mb-1">UID ของคุณ</p>
          <p className="text-xs font-mono text-gray-700 break-all">{user.uid}</p>
        </div>
      </main>
    </div>
  )
}
