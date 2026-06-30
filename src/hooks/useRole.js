import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'

export function useRole(uid) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) { setLoading(false); return }
    return onSnapshot(doc(db, 'admins', uid), snap => {
      setIsAdmin(snap.exists())
      setLoading(false)
    })
  }, [uid])

  return { isAdmin, loading }
}
