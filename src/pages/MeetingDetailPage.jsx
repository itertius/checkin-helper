import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import CheckInForm from '../components/checkins/CheckInForm.jsx'
import CheckInList from '../components/checkins/CheckInList.jsx'
import { useCheckins } from '../hooks/useCheckins.js'
import { useMeetings } from '../hooks/useMeetings.js'

export default function MeetingDetailPage() {
  const { id } = useParams()
  const { meetings } = useMeetings()
  const { checkins, loading, addCheckin, toggleAttended, removeCheckin } = useCheckins(id)

  const meeting = meetings.find(m => m.id === id)

  async function handleRemove(checkinId) {
    if (!confirm('ต้องการลบรายการนี้?')) return
    await removeCheckin(checkinId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title={meeting?.title} />
      <main className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2 mt-2">
          <Link to="/meetings" className="text-blue-600 hover:underline text-sm">← ประชุมทั้งหมด</Link>
          {meeting && (
            <>
              <span className="text-gray-400 text-sm">/</span>
              <span className="text-sm text-gray-700 font-medium truncate">{meeting.title}</span>
            </>
          )}
          {meeting && (
            <Link
              to={`/meetings/${id}/dashboard`}
              className="ml-auto bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              แดชบอร์ด →
            </Link>
          )}
        </div>

        <CheckInForm onSubmit={addCheckin} />
        <CheckInList
          checkins={checkins}
          loading={loading}
          onToggle={toggleAttended}
          onRemove={handleRemove}
        />
      </main>
    </div>
  )
}
