export default function AbsentList({ absentList }) {
  if (absentList.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <p className="font-semibold text-gray-800 mb-2">รายชื่อผู้ปกครองที่ยังไม่มา</p>
        <p className="text-green-600 text-sm">ผู้ปกครองมาครบทุกคน!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100 font-semibold text-gray-800">
        รายชื่อผู้ปกครองที่ยังไม่มา ({absentList.length} คน)
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-2">เลขประจำตัว</th>
              <th className="px-4 py-2">เลขที่</th>
              <th className="px-4 py-2 text-left">ชั้น/ห้อง</th>
              <th className="px-4 py-2">ตอน</th>
              <th className="px-4 py-2 text-left">ชื่อ-สกุลนักเรียน</th>
              <th className="px-4 py-2 text-left">ผู้ปกครอง</th>
              <th className="px-4 py-2">ความสัมพันธ์</th>
            </tr>
          </thead>
          <tbody>
            {absentList.map(c => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 text-center text-gray-500">{c.studentId}</td>
                <td className="px-4 py-2 text-center text-gray-500">{c.studentNumber}</td>
                <td className="px-4 py-2 text-gray-600">{c.classKey}</td>
                <td className="px-4 py-2 text-center text-gray-500">{c.session}</td>
                <td className="px-4 py-2 text-gray-800">{c.firstName} {c.lastName}</td>
                <td className="px-4 py-2 text-gray-700">{c.guardianFirstName} {c.guardianLastName}</td>
                <td className="px-4 py-2 text-center text-gray-500">{c.relationship}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
