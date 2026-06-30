import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function ProtectedRoute() {
  const { user, isAdmin, profile, loading } = useAuth()
  const location = useLocation()

  if (loading || user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">กำลังโหลด...</p>
      </div>
    )
  }
  if (!user) return <Navigate to="/" replace />

  // Non-admin teachers must set up profile before accessing anything
  const onSetup = location.pathname === '/profile-setup'
  if (!isAdmin && profile === null && !onSetup) {
    return <Navigate to="/profile-setup" replace />
  }

  return <Outlet />
}
