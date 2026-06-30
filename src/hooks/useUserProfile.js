import { useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.js'

export function useUserProfile(uid) {
  const [profile, setProfile] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) { setLoading(false); return }
    return onSnapshot(doc(db, 'userProfiles', uid), snap => {
      setProfile(snap.exists() ? snap.data() : null)
      setLoading(false)
    })
  }, [uid])

  async function saveProfile(data, email) {
    await setDoc(doc(db, 'userProfiles', uid), {
      ...data,
      ...(email ? { email } : {}),
      updatedAt: serverTimestamp(),
    }, { merge: true })
  }

  return { profile, loading, saveProfile }
}
