export default function AttendanceToggle({ value, onChange }) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-300">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
          value
            ? 'bg-green-500 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        ✓ มา
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex-1 py-2 px-3 text-sm font-medium transition-colors border-l border-gray-300 ${
          !value
            ? 'bg-red-500 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        ✗ ไม่มา
      </button>
    </div>
  )
}
