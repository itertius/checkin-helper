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
import { useRole } from '../hooks/useRole.js'
import { useUserProfile } from '../hooks/useUserProfile.js'

const AuthContext = createContext(null)

function isWebView() {
  const ua = navigator.userAgent || ''
  return /FBAN|FBAV|Instagram|Line|Twitter|MicroMessenger|WebView|wv/.test(ua)
}

function RoleWrapper({ user, children }) {
  const { isAdmin, loading: roleLoading } = useRole(user?.uid)
  const { profile, loading: profileLoading, saveProfile } = useUserProfile(user?.uid)

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      profile,
      saveProfile,
      loading: roleLoading || profileLoading,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    getRedirectResult(auth).catch(() => {})
    return onAuthStateChanged(auth, u => {
      setUser(u)
      setAuthLoading(false)
    })
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

  if (authLoading) {
    return (
      <AuthContext.Provider value={{ user: undefined, isAdmin: false, profile: undefined, loading: true, loginWithGoogle, logout }}>
        {children}
      </AuthContext.Provider>
    )
  }

  if (!user) {
    return (
      <AuthContext.Provider value={{ user: null, isAdmin: false, profile: null, loading: false, loginWithGoogle, logout }}>
        {children}
      </AuthContext.Provider>
    )
  }

  return (
    <RoleWrapper user={user}>
      <LogoutInjector logout={logout} loginWithGoogle={loginWithGoogle}>
        {children}
      </LogoutInjector>
    </RoleWrapper>
  )
}

function LogoutInjector({ logout, loginWithGoogle, children }) {
  const ctx = useContext(AuthContext)
  return (
    <AuthContext.Provider value={{ ...ctx, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
