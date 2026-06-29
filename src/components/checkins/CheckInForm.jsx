import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AttendanceToggle from './AttendanceToggle.jsx'

export default function CheckInForm({ onSubmit }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      studentNumber: '',
      classNumber: '',
      classSection: '',
      firstName: '',
      lastName: '',
    }
  })
  const [attended, setAttended] = useState(true)
  const [saving, setSaving] = useState(false)

  async function submit(data) {
    setSaving(true)
    await onSubmit({ ...data, guardianAttended: attended })
    reset()
    setAttended(true)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-800 mb-4">บันทึกข้อมูลนักเรียน</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">เลขที่</label>
          <input
            {...register('studentNumber', { required: true })}
            placeholder="เลขที่"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.studentNumber ? 'border-red-400' : 'border-gray-300'}`}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">ชั้น</label>
          <input
            {...register('classNumber', { required: true })}
            placeholder="เช่น ม.1"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.classNumber ? 'border-red-400' : 'border-gray-300'}`}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">ห้อง</label>
          <input
            {...register('classSection', { required: true })}
            placeholder="เช่น 1"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.classSection ? 'border-red-400' : 'border-gray-300'}`}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">ชื่อ</label>
          <input
            {...register('firstName', { required: true })}
            placeholder="ชื่อ"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-400' : 'border-gray-300'}`}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">นามสกุล</label>
          <input
            {...register('lastName', { required: true })}
            placeholder="นามสกุล"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-400' : 'border-gray-300'}`}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">สถานะผู้ปกครอง</label>
          <AttendanceToggle value={attended} onChange={setAttended} />
        </div>
      </div>
      <button
        type="submit"
        disabled={saving}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {saving ? 'กำลังบันทึก...' : 'บันทึก'}
      </button>
    </form>
  )
}
