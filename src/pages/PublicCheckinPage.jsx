import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { usePublicCheckin } from '../hooks/usePublicCheckin.js'

const RELATIONSHIPS = ['บิดา', 'มารดา', 'ปู่', 'ย่า', 'ตา', 'ยาย', 'พี่', 'น้อง', 'ผู้ปกครอง', 'อื่นๆ']
const SESSIONS = ['ไม่มีตอน', 'ก', 'ข']

export default function PublicCheckinPage() {
  const { id } = useParams()
  const { meeting, loading, addCheckin } = usePublicCheckin(id)
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

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

  const field = (hasError) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${hasError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`

  async function onSubmit(data) {
    setSaving(true)
    await addCheckin(data)
    setSubmitted(true)
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-gray-500">กำลังโหลด...</p>
      </div>
    )
  }

  if (!meeting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full">
          <div className="text-4xl mb-3">❌</div>
          <p className="text-gray-700 font-semibold">ไม่พบการประชุมนี้</p>
          <p className="text-sm text-gray-400 mt-1">Link อาจหมดอายุหรือไม่ถูกต้อง</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full">
          <div className="text-5xl mb-3">✅</div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">ลงทะเบียนสำเร็จ</h2>
          <p className="text-sm text-gray-500 mb-6">{meeting.title}</p>
          <button
            onClick={() => { setSubmitted(false); reset() }}
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            ลงทะเบียนคนถัดไป
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📋</div>
          <h1 className="text-xl font-bold text-gray-900">ลงทะเบียนเข้าร่วมประชุม</h1>
          <p className="text-blue-700 font-medium mt-1">{meeting.title}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 space-y-5">
            {/* ข้อมูลนักเรียน */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">ข้อมูลนักเรียน</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">เลขประจำตัว</label>
                    <input {...register('studentId', { required: true })} placeholder="เลขประจำตัว" className={field(errors.studentId)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">เลขที่</label>
                    <input {...register('studentNumber', { required: true })} placeholder="เลขที่" className={field(errors.studentNumber)} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ชั้น</label>
                    <input {...register('classNumber', { required: true })} placeholder="ม.3" className={field(errors.classNumber)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ห้อง</label>
                    <input {...register('classSection', { required: true })} placeholder="1" className={field(errors.classSection)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ตอน</label>
                    <select {...register('session')} className={field(false)}>
                      {SESSIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ชื่อนักเรียน</label>
                    <input {...register('firstName', { required: true })} placeholder="ชื่อ" className={field(errors.firstName)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">นามสกุล</label>
                    <input {...register('lastName', { required: true })} placeholder="นามสกุล" className={field(errors.lastName)} />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* ข้อมูลผู้ปกครอง */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">ข้อมูลผู้ปกครอง</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ชื่อผู้ปกครอง</label>
                    <input {...register('guardianFirstName', { required: true })} placeholder="ชื่อ" className={field(errors.guardianFirstName)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">นามสกุล</label>
                    <input {...register('guardianLastName', { required: true })} placeholder="นามสกุล" className={field(errors.guardianLastName)} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">ความสัมพันธ์กับนักเรียน</label>
                  <select {...register('relationship')} className={field(false)}>
                    {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-base hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition-colors"
            >
              {saving ? 'กำลังบันทึก...' : 'ยืนยันการเข้าร่วม'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
