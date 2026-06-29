import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '../firebase.js'

const AuthContext = createContext(null)

function isWebView() {
  const ua = navigator.userAgent || ''
  return /FBAN|FBAV|Instagram|Line|Twitter|MicroMessenger|WebView|wv/.test(ua)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    getRedirectResult(auth).catch(() => {})
    return onAuthStateChanged(auth, setUser)
  }, [])

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    if (isWebView()) {
      await signInWithRedirect(auth, provider)
    } else {
      try {
        await signInWithPopup(auth, provider)
      } catch (err) {
        if (err.code === 'auth/popup-blocked' || err.code === 'auth/cancelled-popup-request') {
          await signInWithRedirect(auth, provider)
        } else {
          throw err
        }
      }
    }
  }

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
