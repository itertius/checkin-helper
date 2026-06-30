import { useState, useEffect } from 'react'
import {
  collection, addDoc, updateDoc, getDoc, getDocs,
  doc, query, where, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase.js'
import { buildClassKey } from '../utils/classUtils.js'

export function usePublicCheckin(meetingId) {
  const [meeting, setMeeting] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!meetingId) return
    getDoc(doc(db, 'meetings', meetingId)).then(snap => {
      setMeeting(snap.exists() ? { id: snap.id, ...snap.data() } : null)
      setLoading(false)
    })
  }, [meetingId])

  async function addCheckin(data) {
    const classKey = buildClassKey(data.classNumber, data.classSection, data.session)
    const payload = {
      ...data,
      classKey,
      guardianAttended: true,
      source: 'public',
    }

    // ถ้ามี studentId → ค้นหา record เดิมที่โหลดจาก roster แล้ว update แทน create ใหม่
    if (data.studentId) {
      const q = query(
        collection(db, 'meetings', meetingId, 'checkins'),
        where('studentId', '==', data.studentId),
        where('classKey', '==', classKey)
      )
      const snap = await getDocs(q)
      if (!snap.empty) {
        await updateDoc(snap.docs[0].ref, {
          guardianFirstName: data.guardianFirstName,
          guardianLastName: data.guardianLastName,
          relationship: data.relationship,
          guardianAttended: true,
          source: 'public',
          recordedAt: serverTimestamp(),
        })
        return
      }
    }

    // ไม่เจอ record เดิม → create ใหม่
    await addDoc(collection(db, 'meetings', meetingId, 'checkins'), {
      ...payload,
      recordedAt: serverTimestamp(),
      recordedBy: null,
    })
  }

  return { meeting, loading, addCheckin }
}
