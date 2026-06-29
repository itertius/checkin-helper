import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AttendanceToggle from './AttendanceToggle.jsx'

const RELATIONSHIPS = ['บิดา', 'มารดา', 'ปู่', 'ย่า', 'ตา', 'ยาย', 'พี่', 'น้อง', 'ผู้ปกครอง', 'อื่นๆ']
const SESSIONS = ['ไม่มีตอน', 'ก', 'ข']

export default function CheckInForm({ onSubmit }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      studentId: '',
      studentNumber: '',
      classNumber: '',
      classSection: '',
      session: 'ไม่มีตอน',
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

  const field = (hasError) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${hasError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-blue-50 border-b border-blue-100 px-5 py-3">
        <h2 className="text-sm font-semibold text-blue-800">บันทึกข้อมูลนักเรียน</h2>
      </div>

      <div className="p-5 space-y-5">
        {/* Section: นักเรียน */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">ข้อมูลนักเรียน</p>
          <div className="space-y-3">
            {/* เลขประจำตัว + เลขที่ */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">เลขประจำตัว</label>
                <input {...register('studentId', { required: true })} placeholder="เลขประจำตัว" className={field(errors.studentId)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">เลขที่</label>
                <input {...register('studentNumber', { required: true })} placeholder="เลขที่" className={field(errors.studentNumber)} />
              </div>
            </div>

            {/* ชั้น + ห้อง + ตอน */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">ชั้น</label>
                <input {...register('classNumber', { required: true })} placeholder="เช่น ม.1" className={field(errors.classNumber)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">ห้อง</label>
                <input {...register('classSection', { required: true })} placeholder="เช่น 1" className={field(errors.classSection)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">ตอน</label>
                <select {...register('session', { required: true })} className={field(errors.session)}>
                  {SESSIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* ชื่อ + นามสกุล */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">ชื่อนักเรียน</label>
                <input {...register('firstName', { required: true })} placeholder="ชื่อ" className={field(errors.firstName)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">นามสกุลนักเรียน</label>
                <input {...register('lastName', { required: true })} placeholder="นามสกุล" className={field(errors.lastName)} />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Section: ผู้ปกครอง */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">ข้อมูลผู้ปกครอง</p>
          <div className="space-y-3">
            {/* ชื่อ + นามสกุลผู้ปกครอง */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">ชื่อผู้ปกครอง</label>
                <input {...register('guardianFirstName', { required: true })} placeholder="ชื่อผู้ปกครอง" className={field(errors.guardianFirstName)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">นามสกุลผู้ปกครอง</label>
                <input {...register('guardianLastName', { required: true })} placeholder="นามสกุลผู้ปกครอง" className={field(errors.guardianLastName)} />
              </div>
            </div>

            {/* ความสัมพันธ์ + สถานะ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">ความสัมพันธ์</label>
                <select {...register('relationship', { required: true })} className={field(errors.relationship)}>
                  {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">สถานะผู้ปกครอง</label>
                <AttendanceToggle value={attended} onChange={setAttended} />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition-colors"
        >
          {saving ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
      </div>
    </form>
  )
}
