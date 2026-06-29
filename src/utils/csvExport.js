export function exportCSV(checkins, meetingTitle) {
  const header = 'เลขที่,ชั้น,ห้อง,ชื่อ,นามสกุล,ผู้ปกครองมา\n'
  const rows = checkins
    .map(c =>
      [
        c.studentNumber,
        c.classNumber,
        c.classSection,
        c.firstName,
        c.lastName,
        c.guardianAttended ? 'มา' : 'ไม่มา',
      ]
        .map(v => `"${String(v).replace(/"/g, '""')}"`)
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
