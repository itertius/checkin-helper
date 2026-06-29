import { exportCSV } from '../../utils/csvExport.js'

export default function ExportCSVButton({ checkins, meetingTitle }) {
  return (
    <button
      onClick={() => exportCSV(checkins, meetingTitle)}
      disabled={checkins.length === 0}
      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2"
    >
      ⬇ ดาวน์โหลด CSV
    </button>
  )
}
