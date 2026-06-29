import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function ProtectedRoute() {
  const { user } = useAuth()
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">กำลังโหลด...</p>
      </div>
    )
  }
  if (!user) return <Navigate to="/" replace />
  return <Outlet />
}
