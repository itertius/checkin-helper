import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AttendanceToggle from './AttendanceToggle.jsx'

const RELATIONSHIPS = ['บิดา', 'มารดา', 'ปู่', 'ย่า', 'ตา', 'ยาย', 'พี่', 'น้อง', 'ผู้ปกครอง', 'อื่นๆ']
const SESSIONS = ['ก', 'ข']

export default function CheckInForm({ onSubmit }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      studentId: '',
      studentNumber: '',
      classNumber: '',
      classSection: '',
      session: 'ก',
      firstName: '',
      lastName: '',
      guardianFirstName: '',
      guardianLastName: '',
      relationship: 'มารดา',
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

  const inputClass = (hasError) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${hasError ? 'border-red-400' : 'border-gray-300'}`

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-800 mb-4">บันทึกข้อมูลนักเรียน</h2>

      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">ข้อมูลนักเรียน</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">เลขประจำตัว</label>
          <input
            {...register('studentId', { required: true })}
            placeholder="เลขประจำตัว"
            className={inputClass(errors.studentId)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">เลขที่</label>
          <input
            {...register('studentNumber', { required: true })}
            placeholder="เลขที่"
            className={inputClass(errors.studentNumber)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">ชั้น</label>
          <input
            {...register('classNumber', { required: true })}
            placeholder="เช่น ม.1"
            className={inputClass(errors.classNumber)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">ห้อง</label>
          <input
            {...register('classSection', { required: true })}
            placeholder="เช่น 1"
            className={inputClass(errors.classSection)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">ตอน</label>
          <select
            {...register('session', { required: true })}
            className={inputClass(errors.session)}
          >
            {SESSIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">ชื่อนักเรียน</label>
          <input
            {...register('firstName', { required: true })}
            placeholder="ชื่อ"
            className={inputClass(errors.firstName)}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">นามสกุลนักเรียน</label>
          <input
            {...register('lastName', { required: true })}
            placeholder="นามสกุล"
            className={inputClass(errors.lastName)}
          />
        </div>
      </div>

      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">ข้อมูลผู้ปกครอง</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">ชื่อผู้ปกครอง</label>
          <input
            {...register('guardianFirstName', { required: true })}
            placeholder="ชื่อผู้ปกครอง"
            className={inputClass(errors.guardianFirstName)}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">นามสกุลผู้ปกครอง</label>
          <input
            {...register('guardianLastName', { required: true })}
            placeholder="นามสกุลผู้ปกครอง"
            className={inputClass(errors.guardianLastName)}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">ความสัมพันธ์</label>
          <select
            {...register('relationship', { required: true })}
            className={inputClass(errors.relationship)}
          >
            {RELATIONSHIPS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">สถานะ</label>
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
