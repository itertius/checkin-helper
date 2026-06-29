import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function useMeetings() {
  const { user } = useAuth()
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'meetings'), orderBy('createdAt', 'desc'))
    return onSnapshot(q, snap => {
      setMeetings(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
  }, [user])

  async function createMeeting({ title }) {
    await addDoc(collection(db, 'meetings'), {
      title,
      createdBy: user.uid,
      createdByEmail: user.email,
      createdAt: serverTimestamp(),
    })
  }

  async function deleteMeeting(id) {
    await deleteDoc(doc(db, 'meetings', id))
  }

  return { meetings, loading, createMeeting, deleteMeeting }
}
