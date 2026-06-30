import { useState, useEffect } from 'react'
import { collection, addDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore'
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
    await addDoc(collection(db, 'meetings', meetingId, 'checkins'), {
      ...data,
      classKey: buildClassKey(data.classNumber, data.classSection, data.session),
      guardianAttended: true,
      recordedAt: serverTimestamp(),
      recordedBy: null,
      source: 'public',
    })
  }

  return { meeting, loading, addCheckin }
}
