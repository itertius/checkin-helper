import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { buildClassKey } from '../utils/classUtils.js'

export function useCheckins(meetingId) {
  const { user } = useAuth()
  const [checkins, setCheckins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!meetingId) return
    const q = query(
      collection(db, 'meetings', meetingId, 'checkins'),
      orderBy('recordedAt', 'desc')
    )
    return onSnapshot(q, snap => {
      setCheckins(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
  }, [meetingId])

  async function addCheckin(data) {
    await addDoc(collection(db, 'meetings', meetingId, 'checkins'), {
      ...data,
      classKey: buildClassKey(data.classNumber, data.classSection),
      guardianAttended: data.guardianAttended ?? true,
      recordedAt: serverTimestamp(),
      recordedBy: user.uid,
    })
  }

  async function toggleAttended(checkinId, current) {
    await updateDoc(doc(db, 'meetings', meetingId, 'checkins', checkinId), {
      guardianAttended: !current,
    })
  }

  async function removeCheckin(checkinId) {
    await deleteDoc(doc(db, 'meetings', meetingId, 'checkins', checkinId))
  }

  return { checkins, loading, addCheckin, toggleAttended, removeCheckin }
}
