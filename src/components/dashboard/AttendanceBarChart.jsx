import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function AttendanceBarChart({ classSummary }) {
  const data = classSummary.map(c => ({
    name: c.classKey,
    มา: c.attended,
    ไม่มา: c.absent,
  }))

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <p className="font-semibold text-gray-800 mb-4">กราฟการเข้าร่วมรายห้อง</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="มา" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="ไม่มา" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
