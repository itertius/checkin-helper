import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import ClassSummaryTable from '../components/dashboard/ClassSummaryTable.jsx'
import AbsentList from '../components/dashboard/AbsentList.jsx'
import AttendanceBarChart from '../components/dashboard/AttendanceBarChart.jsx'
import ExportCSVButton from '../components/dashboard/ExportCSVButton.jsx'
import ClassReportStatus from '../components/dashboard/ClassReportStatus.jsx'
import { useCheckins } from '../hooks/useCheckins.js'
import { useMeetings } from '../hooks/useMeetings.js'
import { useDashboard } from '../hooks/useDashboard.js'
import { useClassReports } from '../hooks/useClassReports.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { buildClassKey } from '../utils/classUtils.js'

export default function DashboardPage() {
  const { id } = useParams()
  const { meetings } = useMeetings()
  const { checkins, loading } = useCheckins(id)
  const { classReports } = useClassReports(id)
  const { isAdmin, profile } = useAuth()

  // Teachers only see their own class
  const visibleCheckins = useMemo(() => {
    if (isAdmin || !profile) return checkins
    const myKey = buildClassKey(profile.classNumber, profile.classSection, profile.session)
    return checkins.filter(c => c.classKey === myKey)
  }, [checkins, isAdmin, profile])

  const visibleReports = useMemo(() => {
    if (isAdmin || !profile) return classReports
    const myKey = buildClassKey(profile.classNumber, profile.classSection, profile.session)
    return classReports.filter(r => r.classKey === myKey)
  }, [classReports, isAdmin, profile])

  const { classSummary, absentList, totalStudents, totalAttended } = useDashboard(visibleCheckins)

  const meeting = meetings.find(m => m.id === id)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <p className="text-center text-gray-500 py-16">กำลังโหลด...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title={meeting?.title} />
      <main className="max-w-4xl mx-auto p-4 space-y-4">
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
          <span className="text-sm text-gray-700 font-medium">แดชบอร์ด</span>
          {!isAdmin && profile && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-1">
              {buildClassKey(profile.classNumber, profile.classSection, profile.session)}
            </span>
          )}
          <div className="ml-auto">
            <ExportCSVButton checkins={visibleCheckins} meetingTitle={meeting?.title} />
          </div>
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
            <p className="text-sm text-gray-500 mt-1">นักเรียนทั้งหมด</p>
          </div>
          <div className="bg-white rounded-xl border border-green-200 shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{totalAttended}</p>
            <p className="text-sm text-gray-500 mt-1">ผู้ปกครองมา</p>
          </div>
          <div className="bg-white rounded-xl border border-red-200 shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-red-500">{totalStudents - totalAttended}</p>
            <p className="text-sm text-gray-500 mt-1">ผู้ปกครองไม่มา</p>
          </div>
        </div>

        {/* สถานะการรายงานครู — admin sees all, teacher sees own */}
        <ClassReportStatus classReports={visibleReports} classSummary={classSummary} />

        {classSummary.length > 0 && (
          <>
            <AttendanceBarChart classSummary={classSummary} />
            <ClassSummaryTable classSummary={classSummary} />
            <AbsentList absentList={absentList} />
          </>
        )}
      </main>
    </div>
  )
}
