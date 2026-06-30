import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function Navbar({ title }) {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between shadow">
      <Link to="/meetings" className="font-bold text-lg hover:opacity-80 transition-opacity">
        📋 {title || 'ระบบเช็คชื่อผู้ปกครอง'}
      </Link>
      <div className="flex items-center gap-3 text-sm">
        {isAdmin && (
          <Link
            to="/admin"
            className="hidden sm:block opacity-80 hover:opacity-100 transition-opacity bg-white/20 px-2 py-0.5 rounded text-xs font-medium"
          >
            ⚙ Admin
          </Link>
        )}
        <span className="hidden sm:block opacity-80">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 px-3 py-1 rounded font-medium hover:bg-blue-50 transition-colors"
        >
          ออกจากระบบ
        </button>
      </div>
    </nav>
  )
}
