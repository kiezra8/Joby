/**
 * Navbar – top navigation bar with auth state, notifications, and dark mode toggle.
 */
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Briefcase, Bell, Sun, Moon, Menu, X, ChevronDown,
    User, LayoutDashboard, LogOut, MessageSquare, Settings,
    Plus, ClipboardList
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'
import { getInitials, timeAgo } from '../../utils/helpers'

export default function Navbar({ darkMode, onToggleDark }) {
    const { isAuthenticated, user, logout } = useAuthStore()
    const { getNotificationsByUser, markAllRead } = useAppStore()
    const navigate = useNavigate()
    const location = useLocation()

    const [mobileOpen, setMobileOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const profileRef = useRef(null)
    const notifRef = useRef(null)

    const notifications = isAuthenticated ? getNotificationsByUser(user?.id) : []
    const unread = notifications.filter(n => !n.read).length

    // Close dropdowns on outside click
    useEffect(() => {
        function handleClick(e) {
            if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
            if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/')
        setProfileOpen(false)
    }

    const navLinks = [
        { to: '/jobs', label: 'Browse Jobs' },
        ...(isAuthenticated && user?.role === 'employer'
            ? [{ to: '/manage-jobs', label: 'My Jobs' }, { to: '/post-job', label: 'Post a Job' }]
            : []),
        ...(isAuthenticated && user?.role === 'seeker'
            ? [{ to: '/my-applications', label: 'My Applications' }]
            : []),
    ]

    const isActive = (path) => location.pathname === path

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200/60 dark:border-surface-700/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
                            <Briefcase size={18} className="text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-black font-display text-surface-900 dark:text-white tracking-tight">
                            JO<span className="text-gradient">BY</span>
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.to)
                                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                        : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-2">
                        {/* Dark mode toggle */}
                        <button
                            onClick={onToggleDark}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {isAuthenticated ? (
                            <>
                                {/* Messages */}
                                <Link
                                    to="/messages"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                                >
                                    <MessageSquare size={18} />
                                </Link>

                                {/* Notifications */}
                                <div className="relative" ref={notifRef}>
                                    <button
                                        onClick={() => { setNotifOpen(o => !o); setProfileOpen(false) }}
                                        className="w-9 h-9 rounded-xl flex items-center justify-center text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all relative"
                                    >
                                        <Bell size={18} />
                                        {unread > 0 && (
                                            <span className="absolute top-1 right-1 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                                {unread > 9 ? '9+' : unread}
                                            </span>
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {notifOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-80 card shadow-card-hover z-50 overflow-hidden"
                                            >
                                                <div className="flex items-center justify-between p-4 border-b border-surface-100 dark:border-surface-700">
                                                    <h3 className="font-semibold text-sm">Notifications</h3>
                                                    {unread > 0 && (
                                                        <button
                                                            onClick={() => markAllRead(user.id)}
                                                            className="text-xs text-primary-600 hover:underline"
                                                        >
                                                            Mark all read
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="max-h-72 overflow-y-auto">
                                                    {notifications.length === 0 ? (
                                                        <p className="text-center text-sm text-surface-400 py-8">No notifications yet</p>
                                                    ) : (
                                                        notifications.slice(0, 10).map(n => (
                                                            <div
                                                                key={n.id}
                                                                className={`px-4 py-3 border-b border-surface-100 dark:border-surface-700/50 last:border-0 ${!n.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}
                                                            >
                                                                <p className={`text-xs leading-relaxed ${!n.read ? 'text-surface-800 dark:text-surface-100 font-medium' : 'text-surface-500 dark:text-surface-400'}`}>
                                                                    {n.message}
                                                                </p>
                                                                <p className="text-[10px] text-surface-400 mt-1">{timeAgo(n.createdAt)}</p>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Profile dropdown */}
                                <div className="relative" ref={profileRef}>
                                    <button
                                        onClick={() => { setProfileOpen(o => !o); setNotifOpen(false) }}
                                        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                                    >
                                        {user?.avatar || user?.logo ? (
                                            <img src={user.avatar || user.logo} alt={user.name}
                                                className="w-7 h-7 rounded-full object-cover ring-2 ring-primary-200 dark:ring-primary-800" />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                                                {getInitials(user?.name || 'U')}
                                            </div>
                                        )}
                                        <ChevronDown size={14} className={`text-surface-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {profileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-56 card shadow-card-hover z-50 py-1 overflow-hidden"
                                            >
                                                <div className="px-4 py-3 border-b border-surface-100 dark:border-surface-700">
                                                    <p className="font-semibold text-sm truncate">{user?.name}</p>
                                                    <p className="text-xs text-surface-500 capitalize">{user?.role}</p>
                                                </div>
                                                <div className="py-1">
                                                    <DropItem icon={<LayoutDashboard size={15} />} label="Dashboard" to="/dashboard" onClick={() => setProfileOpen(false)} />
                                                    <DropItem icon={<User size={15} />} label="My Profile" to={`/profile/${user?.id}`} onClick={() => setProfileOpen(false)} />
                                                    <DropItem icon={<Settings size={15} />} label="Edit Profile" to="/profile/edit" onClick={() => setProfileOpen(false)} />
                                                    {user?.role === 'employer' && (
                                                        <>
                                                            <DropItem icon={<Plus size={15} />} label="Post a Job" to="/post-job" onClick={() => setProfileOpen(false)} />
                                                            <DropItem icon={<ClipboardList size={15} />} label="Manage Jobs" to="/manage-jobs" onClick={() => setProfileOpen(false)} />
                                                        </>
                                                    )}
                                                    {user?.role === 'seeker' && (
                                                        <DropItem icon={<ClipboardList size={15} />} label="My Applications" to="/my-applications" onClick={() => setProfileOpen(false)} />
                                                    )}
                                                </div>
                                                <div className="border-t border-surface-100 dark:border-surface-700 py-1">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-danger hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                    >
                                                        <LogOut size={15} /> Sign Out
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <Link to="/login" className="btn-ghost btn text-sm px-4 py-2">Sign In</Link>
                                <Link to="/register" className="btn-primary btn text-sm px-4 py-2">Get Started</Link>
                            </div>
                        )}

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileOpen(o => !o)}
                            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-surface-200 dark:border-surface-700 py-3 space-y-1 overflow-hidden"
                        >
                            {navLinks.map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.to)
                                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                            : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {!isAuthenticated && (
                                <div className="flex gap-2 pt-2">
                                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 btn-secondary btn text-sm justify-center">Sign In</Link>
                                    <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 btn-primary btn text-sm justify-center">Get Started</Link>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

function DropItem({ icon, label, to, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="flex items-center gap-3 px-4 py-2 text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
            {icon} {label}
        </Link>
    )
}
