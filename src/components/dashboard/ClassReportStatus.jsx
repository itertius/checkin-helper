import { sortClassKeys } from '../../utils/classUtils.js'

export default function ClassReportStatus({ classReports, classSummary }) {
  const allKeys = sortClassKeys([
    ...new Set([
      ...classReports.map(r => r.classKey),
      ...classSummary.map(c => c.classKey),
    ])
  ])

  const reportMap = Object.fromEntries(classReports.map(r => [r.classKey, r]))
  const summaryMap = Object.fromEntries(classSummary.map(c => [c.classKey, c]))

  const totalClasses = allKeys.length
  const submittedCount = classReports.length
  const submitRate = totalClasses > 0 ? Math.round((submittedCount / totalClasses) * 100) : 0

  const totalStudents = classSummary.reduce((s, c) => s + c.total, 0)
  const totalAttended = classSummary.reduce((s, c) => s + c.attended, 0)
  const attendRate = totalStudents > 0 ? Math.round((totalAttended / totalStudents) * 100) : 0

  return (
    <div className="space-y-4">
      {/* Overall percentages */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{submitRate}%</p>
          <p className="text-xs text-gray-500 mt-1">ครูกรอกข้อมูลแล้ว</p>
          <p className="text-xs text-gray-400">{submittedCount}/{totalClasses} ห้อง/ตอน</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{attendRate}%</p>
          <p className="text-xs text-gray-500 mt-1">ผู้ปกครองเข้าร่วม</p>
          <p className="text-xs text-gray-400">{totalAttended}/{totalStudents} คน</p>
        </div>
      </div>

      {/* Per-class status table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 font-semibold text-gray-800 flex items-center justify-between">
          <span>สถานะการรายงานรายห้อง</span>
          <span className="text-xs text-gray-400">{submittedCount}/{totalClasses} กรอกแล้ว</span>
        </div>
        {allKeys.length === 0 ? (
          <p className="text-center text-gray-400 py-6 text-sm">ยังไม่มีข้อมูล</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-2 text-left">ห้อง/ตอน</th>
                  <th className="px-4 py-2">นักเรียน</th>
                  <th className="px-4 py-2">มา</th>
                  <th className="px-4 py-2">ไม่มา</th>
                  <th className="px-4 py-2">%</th>
                  <th className="px-4 py-2">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {allKeys.map(key => {
                  const report = reportMap[key]
                  const summary = summaryMap[key]
                  const total = summary?.total ?? report?.totalStudents ?? 0
                  const attended = summary?.attended ?? report?.attendedCount ?? 0
                  const rate = total > 0 ? Math.round((attended / total) * 100) : 0
                  return (
                    <tr key={key} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium text-gray-800">{key}</td>
                      <td className="px-4 py-2 text-center text-gray-600">{total || '—'}</td>
                      <td className="px-4 py-2 text-center text-green-600 font-medium">{attended || '—'}</td>
                      <td className="px-4 py-2 text-center text-red-500 font-medium">{total ? total - attended : '—'}</td>
                      <td className="px-4 py-2 text-center">
                        {total ? (
                          <span className={`font-semibold ${rate >= 80 ? 'text-green-600' : rate >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                            {rate}%
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {report ? (
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                            ✓ กรอกแล้ว
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full">
                            ยังไม่กรอก
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
