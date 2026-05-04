/**
 * SeekerDashboard – overview of applications, recommendations, and profile completion.
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, Clock, CheckCircle, XCircle, TrendingUp, User, FileText, ArrowRight } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'
import StatCard from '../../components/ui/StatCard'
import JobCard from '../../components/jobs/JobCard'
import { getStatusConfig, timeAgo } from '../../utils/helpers'

export default function SeekerDashboard() {
    const { user } = useAuthStore()
    const { getApplicationsBySeeker, jobs } = useAppStore()
    const apps = getApplicationsBySeeker(user.id)

    const pending = apps.filter(a => a.status === 'pending').length
    const accepted = apps.filter(a => a.status === 'accepted').length
    const rejected = apps.filter(a => a.status === 'rejected').length

    // Basic AI "recommendation" – jobs matching user skills
    const recommended = jobs.filter(j =>
        j.skills?.some(s => user.skills?.includes(s))
    ).slice(0, 3)

    // Profile completion score
    const fields = [user.title, user.bio, user.skills?.length, user.experience?.length, user.cvUrl]
    const completed = fields.filter(Boolean).length
    const profilePct = Math.round((completed / fields.length) * 100)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="section-title">
                    Welcome back, <span className="text-gradient">{user.name.split(' ')[0]}</span>! 👋
                </h1>
                <p className="section-subtitle">Here's what's happening with your job search.</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                <StatCard icon={<Briefcase size={22} />} label="Total Applications" value={apps.length} color="primary" index={0} />
                <StatCard icon={<Clock size={22} />} label="Pending" value={pending} color="warning" index={1} />
                <StatCard icon={<CheckCircle size={22} />} label="Accepted" value={accepted} color="success" index={2} />
                <StatCard icon={<XCircle size={22} />} label="Rejected" value={rejected} color="danger" index={3} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Applications */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-bold text-surface-900 dark:text-white">Recent Applications</h2>
                            <Link to="/my-applications" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                                View All <ArrowRight size={14} />
                            </Link>
                        </div>

                        {apps.length === 0 ? (
                            <div className="text-center py-10">
                                <div className="text-4xl mb-3">📋</div>
                                <p className="text-surface-500 dark:text-surface-400 text-sm mb-4">You haven't applied to any jobs yet.</p>
                                <Link to="/jobs" className="btn-primary btn mx-auto">Browse Jobs</Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {apps.slice(0, 5).map(app => {
                                    const cfg = getStatusConfig(app.status)
                                    return (
                                        <div key={app.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-900/50 hover:bg-surface-100 dark:hover:bg-surface-800/50 transition-colors">
                                            <div>
                                                <p className="font-semibold text-sm text-surface-900 dark:text-white">{app.jobTitle}</p>
                                                <p className="text-xs text-surface-500 mt-0.5">{app.employerName} · {timeAgo(app.appliedAt)}</p>
                                            </div>
                                            <span className={cfg.color}>{cfg.label}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </motion.div>

                    {/* AI Recommendations */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="font-bold text-surface-900 dark:text-white flex items-center gap-2">
                                    <span className="text-gradient">AI</span> Job Recommendations
                                </h2>
                                <p className="text-xs text-surface-500 mt-0.5">Based on your skills and profile</p>
                            </div>
                            <Link to="/jobs" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                                View All <ArrowRight size={14} />
                            </Link>
                        </div>
                        {recommended.length === 0 ? (
                            <div className="card p-6 text-center">
                                <p className="text-surface-500 dark:text-surface-400 text-sm">Complete your profile with skills for personalised recommendations.</p>
                                <Link to="/profile/edit" className="btn-primary btn mt-4 mx-auto">Add Skills</Link>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-5">
                                {recommended.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Right column */}
                <div className="space-y-5">
                    {/* Profile card */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card p-6">
                        <div className="flex items-center gap-4 mb-5">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-200 dark:ring-primary-800"
                            />
                            <div className="min-w-0">
                                <p className="font-bold text-surface-900 dark:text-white truncate">{user.name}</p>
                                <p className="text-xs text-surface-500 truncate">{user.title || 'Add your title'}</p>
                                {user.verified && (
                                    <span className="badge badge-success mt-1"><CheckCircle size={10} /> Verified</span>
                                )}
                            </div>
                        </div>

                        {/* Profile completion */}
                        <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-surface-500">Profile Completion</span>
                                <span className="font-bold text-primary-600">{profilePct}%</span>
                            </div>
                            <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${profilePct}%` }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                                />
                            </div>
                        </div>

                        <Link to="/profile/edit" className="btn-secondary btn w-full gap-2">
                            <User size={15} /> Edit Profile
                        </Link>
                    </motion.div>

                    {/* Quick actions */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                        <h3 className="font-bold text-surface-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            {[
                                { icon: <Briefcase size={15} />, label: 'Browse All Jobs', to: '/jobs' },
                                { icon: <FileText size={15} />, label: 'My Applications', to: '/my-applications' },
                                { icon: <User size={15} />, label: 'Edit Profile', to: '/profile/edit' },
                            ].map(a => (
                                <Link key={a.to} to={a.to}
                                    className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all">
                                    {a.icon} {a.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
