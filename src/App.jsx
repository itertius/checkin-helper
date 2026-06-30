import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import MeetingsPage from './pages/MeetingsPage.jsx'
import MeetingDetailPage from './pages/MeetingDetailPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import TeacherReportPage from './pages/TeacherReportPage.jsx'
import ProfileSetupPage from './pages/ProfileSetupPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import PublicCheckinPage from './pages/PublicCheckinPage.jsx'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'
import AdminRoute from './components/layout/AdminRoute.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/public/:id" element={<PublicCheckinPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/meetings/:id" element={<MeetingDetailPage />} />
          <Route path="/meetings/:id/dashboard" element={<DashboardPage />} />
          <Route path="/meetings/:id/report" element={<TeacherReportPage />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
