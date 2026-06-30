import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function AdminRoute() {
  const { user, isAdmin, loading } = useAuth()
  if (loading || user === undefined) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">กำลังโหลด...</p></div>
  }
  if (!user) return <Navigate to="/" replace />
  if (!isAdmin) return <Navigate to="/meetings" replace />
  return <Outlet />
}
