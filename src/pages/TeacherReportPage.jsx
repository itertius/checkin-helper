import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import QuickAddStudent from '../components/report/QuickAddStudent.jsx'
import ReportStudentList from '../components/report/ReportStudentList.jsx'
import { useCheckins } from '../hooks/useCheckins.js'
import { useClassReports } from '../hooks/useClassReports.js'
import { useMeetings } from '../hooks/useMeetings.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { buildClassKey } from '../utils/classUtils.js'
import { getStudents } from '../utils/roster.js'

const SESSIONS = ['ไม่มีตอน', 'ก', 'ข']

export default function TeacherReportPage() {
  const { id } = useParams()
  const { meetings } = useMeetings()
  const { checkins, loading: checkinsLoading, addCheckin, toggleAttended, removeCheckin } = useCheckins(id)
  const { submitReport, isSubmitted } = useClassReports(id)
  const { isAdmin, profile } = useAuth()

  const [classNumber, setClassNumber] = useState('ม.3')
  const [classSection, setClassSection] = useState('')
  const [session, setSession] = useState('ไม่มีตอน')
  const [selected, setSelected] = useState(false)
  const [saving, setSaving] = useState(false)
  const [rosterLoaded, setRosterLoaded] = useState(false)

  // Non-admin teachers: auto-fill and auto-select from profile
  useEffect(() => {
    if (!isAdmin && profile) {
      setClassNumber(profile.classNumber || 'ม.3')
      setClassSection(profile.classSection || '')
      setSession(profile.session || 'ไม่มีตอน')
      if (profile.classSection) setSelected(true)
    }
  }, [isAdmin, profile])

  const meeting = meetings.find(m => m.id === id)
  const classKey = buildClassKey(classNumber, classSection, session)

  const students = useMemo(
    () => selected ? checkins.filter(c => c.classKey === classKey) : [],
    [checkins, classKey, selected]
  )

  const attended = students.filter(s => s.guardianAttended).length
  const absent = students.length - attended
  const alreadySubmitted = selected && isSubmitted(classKey)

  // Auto-load roster when class is selected and Firestore confirms no students yet
  useEffect(() => {
    if (!selected || checkinsLoading || rosterLoaded) return
    if (students.length > 0) { setRosterLoaded(true); return }
    const roster = getStudents(classNumber, classSection, session)
    if (roster.length === 0) { setRosterLoaded(true); return }
    setRosterLoaded(true)
    ;(async () => {
      for (const s of roster) {
        await addCheckin({
          studentNumber: String(s.studentNumber),
          studentId: s.studentId,
          firstName: s.firstName,
          lastName: s.lastName,
          classNumber,
          classSection,
          session,
          guardianFirstName: '',
          guardianLastName: '',
          relationship: '',
          guardianAttended: false,
        })
      }
    })()
  }, [selected, checkinsLoading, rosterLoaded, students.length, classSection])

  function handleSelect(e) {
    e.preventDefault()
    if (!classSection.trim()) return
    setRosterLoaded(false)
    setSelected(true)
  }

  function handleReset() {
    if (!isAdmin) return
    setSelected(false)
    setRosterLoaded(false)
    setClassSection('')
  }

  async function handleAddStudent(data) {
    await addCheckin({
      ...data,
      classNumber,
      classSection,
      session,
      guardianFirstName: '',
      guardianLastName: '',
      relationship: '',
      studentId: '',
    })
  }

  async function handleRemove(checkinId) {
    if (!confirm('ลบรายการนี้?')) return
    await removeCheckin(checkinId)
  }

  async function handleSubmit() {
    if (students.length === 0) return
    if (!confirm(`บันทึกรายงานห้อง ${classKey} ใช่ไหม?`)) return
    setSaving(true)
    await submitReport({
      classKey,
      classNumber,
      classSection,
      session,
      totalStudents: students.length,
      attendedCount: attended,
    })
    setSaving(false)
  }

  const locked = !isAdmin

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title={meeting?.title} />
      <main className="max-w-2xl mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2 mt-2">
          {isAdmin ? (
            <>
              <Link to={`/meetings/${id}`} className="text-blue-600 hover:underline text-sm">← เช็คชื่อ</Link>
              <span className="text-gray-400 text-sm">/</span>
            </>
          ) : (
            <>
              <Link to="/meetings" className="text-blue-600 hover:underline text-sm">← ประชุมทั้งหมด</Link>
              <span className="text-gray-400 text-sm">/</span>
            </>
          )}
          <span className="text-sm text-gray-700 font-medium">รายงานครูที่ปรึกษา</span>
        </div>

        {/* Step 1: เลือกห้อง/ตอน — locked for teachers */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className={`border-b px-5 py-3 ${locked ? 'bg-gray-50 border-gray-100' : 'bg-blue-50 border-blue-100'}`}>
            <p className={`text-sm font-semibold ${locked ? 'text-gray-600' : 'text-blue-800'}`}>
              {locked ? `ห้องของท่าน: ${classKey}` : 'เลือกห้อง / ตอน ของท่าน'}
            </p>
          </div>
          {locked ? (
            <div className="px-5 py-3">
              <p className="text-xs text-gray-400">ห้องกำหนดจากโปรไฟล์ครู — หากต้องการเปลี่ยน ไปที่การตั้งค่าโปรไฟล์</p>
              <Link to="/profile-setup" className="text-xs text-blue-500 hover:underline">แก้ไขโปรไฟล์</Link>
            </div>
          ) : (
            <form onSubmit={handleSelect} className="p-5">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">ชั้น</label>
                  <input
                    value={classNumber}
                    onChange={e => { setClassNumber(e.target.value); setSelected(false) }}
                    placeholder="เช่น ม.3"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">ห้อง</label>
                  <input
                    value={classSection}
                    onChange={e => { setClassSection(e.target.value); setSelected(false) }}
                    placeholder="เช่น 1"
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">ตอน</label>
                  <select
                    value={session}
                    onChange={e => { setSession(e.target.value); setSelected(false) }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {SESSIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                เลือกห้อง {classNumber}/{classSection}{session !== 'ไม่มีตอน' ? ` ตอน${session}` : ''}
              </button>
            </form>
          )}
        </div>

        {/* Step 2: รายชื่อนักเรียน */}
        {selected && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 px-5 py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">
                  {classKey}
                  {alreadySubmitted && (
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-normal">
                      ✓ บันทึกแล้ว
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  ทั้งหมด {students.length} คน · มา {attended} · ไม่มา {absent}
                </p>
              </div>
              {!locked && (
                <button onClick={handleReset} className="text-xs text-gray-400 hover:text-gray-600">
                  เปลี่ยนห้อง
                </button>
              )}
            </div>

            {/* Quick add */}
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <p className="text-xs font-medium text-gray-500 mb-2">เพิ่มนักเรียน</p>
              <QuickAddStudent onAdd={handleAddStudent} />
            </div>

            {/* Student list */}
            <div className="px-5 py-2">
              <ReportStudentList
                students={students}
                onToggle={toggleAttended}
                onRemove={handleRemove}
              />
            </div>

            {/* Stats bar */}
            {students.length > 0 && (
              <div className="mx-5 mb-4 rounded-lg overflow-hidden bg-gray-100 h-2">
                <div
                  className="bg-green-500 h-full transition-all"
                  style={{ width: `${Math.round((attended / students.length) * 100)}%` }}
                />
              </div>
            )}

            {/* Submit */}
            <div className="px-5 pb-5">
              <button
                onClick={handleSubmit}
                disabled={saving || students.length === 0}
                className={`w-full py-2.5 rounded-lg font-medium transition-colors text-sm ${
                  alreadySubmitted
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-50`}
              >
                {saving ? 'กำลังบันทึก...' : alreadySubmitted ? '✓ บันทึกซ้ำ/แก้ไข' : 'บันทึกรายงาน'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
