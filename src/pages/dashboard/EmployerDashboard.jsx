/**
 * EmployerDashboard – overview of posted jobs, applicant counts, and quick actions.
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, Users, CheckCircle, Clock, Plus, Eye, ArrowRight, TrendingUp } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'
import StatCard from '../../components/ui/StatCard'
import { timeAgo, getCategoryColor, getTypeColor } from '../../utils/helpers'

export default function EmployerDashboard() {
    const { user } = useAuthStore()
    const { getJobsByEmployer, applications } = useAppStore()

    const myJobs = getJobsByEmployer(user.id)
    const myJobIds = myJobs.map(j => j.id)
    const myApps = applications.filter(a => myJobIds.includes(a.jobId))

    const pending = myApps.filter(a => a.status === 'pending').length
    const accepted = myApps.filter(a => a.status === 'accepted').length
    const openJobs = myJobs.filter(j => j.status === 'open').length

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="section-title">
                    Welcome, <span className="text-gradient">{user.companyName || user.name}</span>! 🏢
                </h1>
                <p className="section-subtitle">Manage your jobs and discover top talent.</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                <StatCard icon={<Briefcase size={22} />} label="Jobs Posted" value={myJobs.length} color="primary" index={0} />
                <StatCard icon={<TrendingUp size={22} />} label="Open Listings" value={openJobs} color="accent" index={1} />
                <StatCard icon={<Users size={22} />} label="Total Applicants" value={myApps.length} color="warning" index={2} />
                <StatCard icon={<CheckCircle size={22} />} label="Hired" value={accepted} color="success" index={3} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Jobs list */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-bold text-surface-900 dark:text-white">Your Job Listings</h2>
                            <Link to="/manage-jobs" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                                Manage All <ArrowRight size={14} />
                            </Link>
                        </div>

                        {myJobs.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                                    <img 
                                        src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=200&h=200&fit=crop" 
                                        alt="No jobs" 
                                        className="w-12 h-12 object-cover rounded-lg opacity-40 grayscale"
                                    />
                                </div>
                                <p className="text-surface-500 dark:text-surface-400 text-sm mb-6">You haven't posted any jobs yet.</p>
                                <Link to="/post-job" className="btn-primary btn mx-auto px-8"><Plus size={16} /> Post a Job</Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {myJobs.slice(0, 6).map(job => {
                                    const jobApps = applications.filter(a => a.jobId === job.id)
                                    const jobPending = jobApps.filter(a => a.status === 'pending').length
                                    return (
                                        <div key={job.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-900/50 hover:bg-surface-100 dark:hover:bg-surface-800/50 transition-colors">
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="font-semibold text-sm text-surface-900 dark:text-white truncate">{job.title}</p>
                                                    <span className={`badge text-[10px] ${getTypeColor(job.type)}`}>{job.type.replace('-', ' ')}</span>
                                                </div>
                                                <p className="text-xs text-surface-500 mt-0.5">
                                                    {jobApps.length} applicant{jobApps.length !== 1 ? 's' : ''}
                                                    {jobPending > 0 && <span className="text-warning ml-1">· {jobPending} pending</span>}
                                                    <span className="ml-1">· {timeAgo(job.postedAt)}</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 ml-3">
                                                <Link
                                                    to={`/applicants/${job.id}`}
                                                    className="btn-secondary btn-sm btn gap-1"
                                                >
                                                    <Eye size={12} /> View
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </motion.div>

                    {/* Recent applicants */}
                    {myApps.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                            <h2 className="font-bold text-surface-900 dark:text-white mb-5">Recent Applicants</h2>
                            <div className="space-y-3">
                                {myApps.slice(0, 5).map(app => (
                                    <div key={app.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-900/50">
                                        <img src={app.seekerAvatar} alt={app.seekerName}
                                            className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{app.seekerName}</p>
                                            <p className="text-xs text-surface-500 truncate">Applied to {app.jobTitle}</p>
                                        </div>
                                        <span className={`badge text-[10px] ${app.status === 'accepted' ? 'badge-success' :
                                                app.status === 'rejected' ? 'badge-danger' : 'badge-warning'
                                            }`}>{app.status}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right */}
                <div className="space-y-5">
                    {/* Employer profile card */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card p-6">
                        <div className="flex items-center gap-4 mb-5">
                            <img src={user.logo} alt={user.companyName}
                                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-200 dark:ring-primary-800" />
                            <div className="min-w-0">
                                <p className="font-bold text-surface-900 dark:text-white truncate">{user.companyName || user.name}</p>
                                <p className="text-xs text-surface-500">Employer</p>
                                {user.verified && <span className="badge badge-success mt-1"><CheckCircle size={10} /> Verified</span>}
                            </div>
                        </div>
                        <Link to="/profile/edit" className="btn-secondary btn w-full">Edit Company Profile</Link>
                    </motion.div>

                    {/* Quick actions */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                        <h3 className="font-bold text-surface-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            {[
                                { icon: <Plus size={15} />, label: 'Post a New Job', to: '/post-job' },
                                { icon: <Briefcase size={15} />, label: 'Manage All Jobs', to: '/manage-jobs' },
                                { icon: <Users size={15} />, label: 'View Applicants', to: myJobs[0] ? `/applicants/${myJobs[0].id}` : '/manage-jobs' },
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
