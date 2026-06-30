export default function ReportStudentList({ students, onToggle, onRemove }) {
  if (students.length === 0) {
    return (
      <p className="text-center text-gray-400 py-6 text-sm">
        ยังไม่มีรายชื่อ — เพิ่มนักเรียนด้านบน
      </p>
    )
  }

  const sorted = [...students].sort((a, b) =>
    Number(a.studentNumber || 999) - Number(b.studentNumber || 999)
  )

  return (
    <div className="divide-y divide-gray-100">
      {sorted.map(s => (
        <div key={s.id} className="flex items-center gap-3 py-2.5 px-1">
          <span className="text-xs text-gray-400 w-8 text-center shrink-0">{s.studentNumber}</span>
          <span className="flex-1 text-sm text-gray-800">{s.firstName} {s.lastName}</span>
          <button
            onClick={() => onToggle(s.id, s.guardianAttended)}
            className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors shrink-0 ${
              s.guardianAttended
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            {s.guardianAttended ? '✓ มา' : '✗ ไม่มา'}
          </button>
          <button
            onClick={() => onRemove(s.id)}
            className="text-gray-300 hover:text-red-400 text-xs transition-colors shrink-0"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
