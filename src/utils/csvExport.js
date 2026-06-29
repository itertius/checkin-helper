export function exportCSV(checkins, meetingTitle) {
  const header = 'เลขประจำตัว,เลขที่,ชั้น,ห้อง,ตอน,ชื่อนักเรียน,นามสกุลนักเรียน,ชื่อผู้ปกครอง,นามสกุลผู้ปกครอง,ความสัมพันธ์,ผู้ปกครองมา\n'
  const rows = checkins
    .map(c =>
      [
        c.studentId,
        c.studentNumber,
        c.classNumber,
        c.classSection,
        c.session,
        c.firstName,
        c.lastName,
        c.guardianFirstName,
        c.guardianLastName,
        c.relationship,
        c.guardianAttended ? 'มา' : 'ไม่มา',
      ]
        .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    )
    .join('\n')

  const bom = '﻿'
  const blob = new Blob([bom + header + rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${meetingTitle || 'checkin'}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
