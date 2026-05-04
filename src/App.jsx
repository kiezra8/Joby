/**
 * App.jsx – Root component with routing and theme management.
 */
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useAuthStore } from './store/authStore'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import JobsPage from './pages/jobs/JobsPage'
import JobDetailPage from './pages/jobs/JobDetailPage'
import SeekerDashboard from './pages/dashboard/SeekerDashboard'
import EmployerDashboard from './pages/dashboard/EmployerDashboard'
import ProfilePage from './pages/profile/ProfilePage'
import EditProfilePage from './pages/profile/EditProfilePage'
import PostJobPage from './pages/employer/PostJobPage'
import ManageJobsPage from './pages/employer/ManageJobsPage'
import ApplicantsPage from './pages/employer/ApplicantsPage'
import ApplicationsPage from './pages/seeker/ApplicationsPage'
import MessagesPage from './pages/MessagesPage'
import NotFoundPage from './pages/NotFoundPage'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/auth/ProtectedRoute'

function AppContent() {
    const { isAuthenticated, user } = useAuthStore()

    return (
        <div className="min-h-screen transition-colors duration-300 dark bg-surface-950 text-surface-100">
            <Navbar />

            <div className="dark flex-1">
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
                    <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
                    <Route path="/jobs" element={<JobsPage />} />
                    <Route path="/jobs/:id" element={<JobDetailPage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />

                    {/* Protected – any authenticated user */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/profile/edit" element={<EditProfilePage />} />
                    </Route>

                    {/* Protected – Job Seeker only */}
                    <Route element={<ProtectedRoute role="seeker" />}>
                        <Route path="/dashboard" element={<SeekerDashboard />} />
                        <Route path="/my-applications" element={<ApplicationsPage />} />
                    </Route>

                    {/* Protected – Employer only */}
                    <Route element={<ProtectedRoute role="employer" />}>
                        <Route path="/dashboard" element={<EmployerDashboard />} />
                        <Route path="/post-job" element={<PostJobPage />} />
                        <Route path="/manage-jobs" element={<ManageJobsPage />} />
                        <Route path="/applicants/:jobId" element={<ApplicantsPage />} />
                    </Route>

                    {/* Redirect /dashboard to role-specific */}
                    <Route path="/dashboard" element={
                        isAuthenticated
                            ? user?.role === 'employer'
                                ? <EmployerDashboard />
                                : <SeekerDashboard />
                            : <Navigate to="/login" />
                    } />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>

                <Footer />
            </div>

            {/* Global Toast notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#1e293b',
                        color: '#f1f5f9',
                        border: '1px solid #334155',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '500',
                    },
                }}
            />
        </div>
    )
}

function App() {
    // Remove global dark mode class that might have been applied to document root, we use the wrapper class
    useEffect(() => {
        document.documentElement.classList.remove('dark')
    }, [])

    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App
