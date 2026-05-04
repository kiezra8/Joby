/**
 * ProtectedRoute – guards routes by auth state and optional role.
 */
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function ProtectedRoute({ role }) {
    const { isAuthenticated, user } = useAuthStore()

    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (role && user?.role !== role) return <Navigate to="/dashboard" replace />

    return <Outlet />
}
