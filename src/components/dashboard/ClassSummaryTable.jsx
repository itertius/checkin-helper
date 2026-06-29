export default function ClassSummaryTable({ classSummary }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100 font-semibold text-gray-800">
        สรุปรายห้อง
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-2 text-left">ชั้น/ห้อง</th>
              <th className="px-4 py-2">ทั้งหมด</th>
              <th className="px-4 py-2">มา</th>
              <th className="px-4 py-2">ไม่มา</th>
              <th className="px-4 py-2">%</th>
            </tr>
          </thead>
          <tbody>
            {classSummary.map(row => (
              <tr key={row.classKey} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-800">{row.classKey}</td>
                <td className="px-4 py-2 text-center text-gray-600">{row.total}</td>
                <td className="px-4 py-2 text-center text-green-600 font-medium">{row.attended}</td>
                <td className="px-4 py-2 text-center text-red-500 font-medium">{row.absent}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`font-semibold ${row.rate >= 80 ? 'text-green-600' : row.rate >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                    {row.rate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
