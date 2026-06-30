import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function MeetingCard({ meeting, onDelete }) {
  const { isAdmin } = useAuth()

  const date = meeting.createdAt?.toDate?.()?.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) || '—'

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg truncate">{meeting.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{date}</p>
          <p className="text-xs text-gray-400 mt-0.5">สร้างโดย: {meeting.createdByEmail}</p>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(meeting.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0"
            title="ลบประชุม"
          >
            ✕
          </button>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <Link
          to={`/meetings/${meeting.id}/report`}
          className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          📝 รายงานครู
        </Link>
        {isAdmin && (
          <Link
            to={`/meetings/${meeting.id}`}
            className="flex-1 text-center bg-gray-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            เช็คชื่อ
          </Link>
        )}
        <Link
          to={`/meetings/${meeting.id}/dashboard`}
          className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          แดชบอร์ด
        </Link>
      </div>
    </div>
  )
}
