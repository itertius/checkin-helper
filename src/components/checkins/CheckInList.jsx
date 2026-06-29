import CheckInRow from './CheckInRow.jsx'

export default function CheckInList({ checkins, loading, onToggle, onRemove }) {
  if (loading) {
    return <p className="text-center text-gray-500 py-8">กำลังโหลด...</p>
  }
  if (checkins.length === 0) {
    return <p className="text-center text-gray-400 py-8">ยังไม่มีข้อมูล — กรอกข้อมูลนักเรียนด้านบน</p>
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <span className="font-semibold text-gray-800">รายการ ({checkins.length} คน)</span>
        <span className="text-sm text-gray-500">
          มา {checkins.filter(c => c.guardianAttended).length} /
          ไม่มา {checkins.filter(c => !c.guardianAttended).length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-3 py-2">เลขประจำตัว</th>
              <th className="px-3 py-2">เลขที่</th>
              <th className="px-3 py-2">ชั้น/ห้อง</th>
              <th className="px-3 py-2">ตอน</th>
              <th className="px-3 py-2 text-left">ชื่อ-สกุลนักเรียน</th>
              <th className="px-3 py-2 text-left">ผู้ปกครอง</th>
              <th className="px-3 py-2">สถานะ</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {checkins.map(c => (
              <CheckInRow
                key={c.id}
                checkin={c}
                onToggle={onToggle}
                onRemove={onRemove}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
