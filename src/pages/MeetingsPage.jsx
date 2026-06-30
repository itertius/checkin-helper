import { useState } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import MeetingCard from '../components/meetings/MeetingCard.jsx'
import CreateMeetingModal from '../components/meetings/CreateMeetingModal.jsx'
import { useMeetings } from '../hooks/useMeetings.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function MeetingsPage() {
  const { meetings, loading, createMeeting, deleteMeeting } = useMeetings()
  const { isAdmin } = useAuth()
  const [showModal, setShowModal] = useState(false)

  async function handleDelete(id) {
    if (!confirm('ต้องการลบประชุมนี้?')) return
    await deleteMeeting(id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6 mt-4">
          <h1 className="text-xl font-bold text-gray-900">รายการประชุม</h1>
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              + สร้างประชุมใหม่
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-12">กำลังโหลด...</p>
        ) : meetings.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">📅</div>
            <p>{isAdmin ? 'ยังไม่มีประชุม — กดปุ่ม "สร้างประชุมใหม่" เพื่อเริ่ม' : 'ยังไม่มีประชุม รอแอดมินสร้างประชุมก่อน'}</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {meetings.map(m => (
              <MeetingCard key={m.id} meeting={m} onDelete={isAdmin ? handleDelete : null} />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <CreateMeetingModal
          onCreate={createMeeting}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
