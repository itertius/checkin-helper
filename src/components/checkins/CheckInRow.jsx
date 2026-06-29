export default function CheckInRow({ checkin, onToggle, onRemove }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-3 py-2 text-sm text-center text-gray-500">{checkin.studentId}</td>
      <td className="px-3 py-2 text-sm text-center text-gray-500">{checkin.studentNumber}</td>
      <td className="px-3 py-2 text-sm text-center text-gray-500">{checkin.classKey}</td>
      <td className="px-3 py-2 text-sm text-gray-800 whitespace-nowrap">{checkin.firstName} {checkin.lastName}</td>
      <td className="px-3 py-2 text-sm text-gray-700 whitespace-nowrap">
        {checkin.guardianFirstName} {checkin.guardianLastName}
        <span className="ml-1 text-xs text-gray-400">({checkin.relationship})</span>
      </td>
      <td className="px-3 py-2 text-center">
        <button
          onClick={() => onToggle(checkin.id, checkin.guardianAttended)}
          className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
            checkin.guardianAttended
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          {checkin.guardianAttended ? 'มา' : 'ไม่มา'}
        </button>
      </td>
      <td className="px-3 py-2 text-center">
        <button
          onClick={() => onRemove(checkin.id)}
          className="text-gray-400 hover:text-red-500 text-sm transition-colors"
          title="ลบ"
        >
          ✕
        </button>
      </td>
    </tr>
  )
}
