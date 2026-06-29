import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import MeetingsPage from './pages/MeetingsPage.jsx'
import MeetingDetailPage from './pages/MeetingDetailPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/meetings/:id" element={<MeetingDetailPage />} />
          <Route path="/meetings/:id/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
