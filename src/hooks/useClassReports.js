import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function useClassReports(meetingId) {
  const { user } = useAuth()
  const [classReports, setClassReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!meetingId) return
    return onSnapshot(
      collection(db, 'meetings', meetingId, 'classReports'),
      snap => {
        setClassReports(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
      }
    )
  }, [meetingId])

  async function submitReport({ classKey, classNumber, classSection, session, totalStudents, attendedCount }) {
    await setDoc(doc(db, 'meetings', meetingId, 'classReports', classKey), {
      classKey,
      classNumber,
      classSection,
      session,
      totalStudents,
      attendedCount,
      absentCount: totalStudents - attendedCount,
      submittedBy: user.uid,
      submittedByEmail: user.email,
      submittedAt: serverTimestamp(),
    })
  }

  function isSubmitted(classKey) {
    return classReports.some(r => r.classKey === classKey)
  }

  return { classReports, loading, submitReport, isSubmitted }
}
