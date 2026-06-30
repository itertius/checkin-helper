import studentsData from '../data/students.json'
import teachersData from '../data/teachers.json'
import { buildClassKey } from './classUtils.js'

export function getStudents(classNumber, classSection, session) {
  const key = buildClassKey(classNumber, classSection, session)
  return studentsData[key] || []
}

export function findTeacher(classNumber, classSection, session) {
  return teachersData.find(
    t =>
      t.classNumber === classNumber &&
      t.classSection === String(classSection) &&
      t.session === (session || 'ไม่มีตอน')
  )
}

export function findTeacherByName(name) {
  const normalized = name.trim()
  return teachersData.find(t => {
    const full = `${t.firstName} ${t.lastName}`.trim()
    const firstOnly = t.firstName.trim()
    return full.includes(normalized) || normalized.includes(firstOnly)
  })
}

export const allTeachers = teachersData
