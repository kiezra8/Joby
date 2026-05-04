/**
 * ApplicationsPage – job seeker's tracker for all their applications.
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'
import { getStatusConfig, timeAgo } from '../../utils/helpers'

const FILTERS = ['all', 'pending', 'accepted', 'rejected']

export default function ApplicationsPage() {
    const { user } = useAuthStore()
    const { getApplicationsBySeeker, getJobById } = useAppStore()
    const [filter, setFilter] = useState('all')

    const apps = getApplicationsBySeeker(user.id)
    const filtered = filter === 'all' ? apps : apps.filter(a => a.status === filter)

    const counts = {
        all: apps.length,
        pending: apps.filter(a => a.status === 'pending').length,
        accepted: apps.filter(a => a.status === 'accepted').length,
        rejected: apps.filter(a => a.status === 'rejected').length,
    }

    const iconMap = {
        all: <Briefcase size={15} />,
        pending: <Clock size={15} />,
        accepted: <CheckCircle size={15} />,
        rejected: <XCircle size={15} />,
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="section-title">My Applications</h1>
                <p className="section-subtitle">Track the status of all your job applications</p>
            </motion.div>

            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap mb-8">
                {FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`btn btn-sm gap-1.5 capitalize ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        {iconMap[f]} {f} {counts[f] > 0 && <span className="ml-0.5 opacity-70">({counts[f]})</span>}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="card p-16 text-center">
                    <div className="text-5xl mb-4">
                        {filter === 'all' ? '📋' : filter === 'accepted' ? '🎉' : filter === 'rejected' ? '😔' : '⏳'}
                    </div>
                    <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-2">
                        {filter === 'all' ? "You haven't applied to any jobs yet" : `No ${filter} applications`}
                    </h3>
                    {filter === 'all' && (
                        <>
                            <p className="text-sm text-surface-400 mb-6">Find your next opportunity and apply with one click.</p>
                            <Link to="/jobs" className="btn-primary btn mx-auto">Browse Jobs</Link>
                        </>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((app, i) => {
                        const job = getJobById(app.jobId)
                        const cfg = getStatusConfig(app.status)
                        return (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="card p-5 flex items-start gap-4"
                            >
                                {/* Employer logo */}
                                <img
                                    src={job?.employerLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.employerName)}&background=6366f1&color=fff`}
                                    alt={app.employerName}
                                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-surface-100 dark:border-surface-700"
                                />

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3 flex-wrap">
                                        <div>
                                            <p className="font-bold text-surface-900 dark:text-white">{app.jobTitle}</p>
                                            <p className="text-sm text-surface-500 dark:text-surface-400">{app.employerName}</p>
                                        </div>
                                        <span className={cfg.color}>{cfg.label}</span>
                                    </div>
                                    <p className="text-xs text-surface-400 mt-2">Applied {timeAgo(app.appliedAt)}</p>

                                    {/* Status message */}
                                    {app.status === 'accepted' && (
                                        <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-xs text-success font-medium">
                                            🎉 Congratulations! Your application has been accepted.
                                        </div>
                                    )}
                                    {app.status === 'rejected' && (
                                        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-danger font-medium">
                                            This application was not successful. Keep applying!
                                        </div>
                                    )}
                                </div>

                                {/* Link */}
                                <Link to={`/jobs/${app.jobId}`} className="btn-ghost btn-sm btn shrink-0">
                                    <ExternalLink size={13} />
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
