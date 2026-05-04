/**
 * ManageJobsPage – employer's list of all posted jobs with edit/delete.
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Eye, Trash2, MapPin, Users, DollarSign } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'
import { formatSalary, timeAgo, getCategoryColor, getTypeColor } from '../../utils/helpers'
import { JOB_CATEGORIES } from '../../data/dummyData'
import toast from 'react-hot-toast'

export default function ManageJobsPage() {
    const { user } = useAuthStore()
    const { getJobsByEmployer, deleteJob, applications } = useAppStore()
    const jobs = getJobsByEmployer(user.id)

    const handleDelete = (job) => {
        if (!window.confirm(`Delete "${job.title}"? This cannot be undone.`)) return
        deleteJob(job.id)
        toast.success('Job deleted.')
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-between mb-8">
                <div>
                    <h1 className="section-title">Manage Jobs</h1>
                    <p className="section-subtitle">{jobs.length} job{jobs.length !== 1 ? 's' : ''} posted</p>
                </div>
                <Link to="/post-job" className="btn-primary btn gap-2">
                    <Plus size={16} /> Post New Job
                </Link>
            </motion.div>

            {jobs.length === 0 ? (
                <div className="card p-16 text-center">
                    <div className="text-5xl mb-4">📋</div>
                    <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-2">No jobs posted yet</h3>
                    <p className="text-surface-400 text-sm mb-6">Start posting jobs to find the best talent.</p>
                    <Link to="/post-job" className="btn-primary btn mx-auto"><Plus size={16} /> Post Your First Job</Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {jobs.map((job, i) => {
                        const cat = JOB_CATEGORIES.find(c => c.id === job.category)
                        const jobApps = applications.filter(a => a.jobId === job.id)
                        return (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="card p-6 hover:border-primary-200 dark:hover:border-primary-800 transition-all"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                            <h2 className="font-bold text-surface-900 dark:text-white">{job.title}</h2>
                                            <span className={`badge text-[10px] ${getTypeColor(job.type)}`}>{job.type.replace('-', ' ')}</span>
                                            <span className={`badge text-[10px] ${getCategoryColor(job.category)}`}>{cat?.icon} {cat?.label}</span>
                                        </div>
                                        <div className="flex items-center flex-wrap gap-4 text-xs text-surface-500 dark:text-surface-400">
                                            <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                                            {job.salary && <span className="flex items-center gap-1 text-success font-medium"><DollarSign size={12} />{formatSalary(job.salary)}</span>}
                                            <span className="flex items-center gap-1"><Users size={12} />{jobApps.length} applicant{jobApps.length !== 1 ? 's' : ''}</span>
                                            <span>Posted {timeAgo(job.postedAt)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link to={`/applicants/${job.id}`} className="btn-secondary btn-sm btn gap-1">
                                            <Eye size={13} /> Applicants ({jobApps.length})
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(job)}
                                            className="btn-danger btn-sm btn gap-1"
                                        >
                                            <Trash2 size={13} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
