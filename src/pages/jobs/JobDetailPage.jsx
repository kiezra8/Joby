/**
 * JobDetailPage – full job listing with apply button and employer info.
 */
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, Users, Building2, ArrowLeft, Zap, CheckCircle, Share2 } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { useAuthStore } from '../../store/authStore'
import { formatSalary, timeAgo, getCategoryColor, getTypeColor, genId } from '../../utils/helpers'
import { JOB_CATEGORIES } from '../../data/dummyData'
import toast from 'react-hot-toast'

export default function JobDetailPage() {
    const { id } = useParams()
    const { getJobById, applyToJob, getApplicationsBySeeker } = useAppStore()
    const { isAuthenticated, user } = useAuthStore()
    const navigate = useNavigate()

    const job = getJobById(id)

    if (!job) return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="text-xl font-bold mb-2">Job not found</h2>
            <Link to="/jobs" className="btn-primary btn mt-4">Back to Jobs</Link>
        </div>
    )

    const category = JOB_CATEGORIES.find(c => c.id === job.category)
    const myApps = isAuthenticated && user?.role === 'seeker'
        ? getApplicationsBySeeker(user.id)
        : []
    const alreadyApplied = myApps.some(a => a.jobId === id)

    const handleApply = () => {
        if (!isAuthenticated) { navigate('/login'); return }
        if (user.role !== 'seeker') { toast.error('Only job seekers can apply.'); return }
        const success = applyToJob({
            id: genId('app'),
            jobId: id,
            jobTitle: job.title,
            employerId: job.employerId,
            employerName: job.employerName,
            seekerId: user.id,
            seekerName: user.name,
            seekerAvatar: user.avatar,
            seekerTitle: user.title || '',
            seekerSkills: user.skills || [],
            status: 'pending',
            appliedAt: new Date().toISOString(),
        })
        if (success) {
            toast.success(`Applied to "${job.title}" successfully! 🎉`)
        } else {
            toast('You have already applied to this job.', { icon: 'ℹ️' })
        }
    }

    const handleShare = () => {
        navigator.clipboard?.writeText(window.location.href)
        toast.success('Link copied to clipboard!')
    }

    // Format description markdown-lite
    const renderDescription = (text) => {
        const lines = text.split('\n')
        return lines.map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <h4 key={i} className="font-bold text-surface-800 dark:text-surface-200 mt-4 mb-1">{line.replace(/\*\*/g, '')}</h4>
            }
            if (line.startsWith('- ')) {
                return <li key={i} className="flex items-start gap-2 text-surface-600 dark:text-surface-400 text-sm py-0.5"><CheckCircle size={14} className="text-success mt-0.5 shrink-0" />{line.slice(2)}</li>
            }
            if (!line.trim()) return <div key={i} className="h-1" />
            return <p key={i} className="text-surface-600 dark:text-surface-400 text-sm">{line}</p>
        })
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-primary-600 transition-colors mb-6">
                <ArrowLeft size={16} /> Back to Jobs
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
                        {/* Header */}
                        <div className="flex items-start gap-5 mb-6">
                            <Link to={`/profile/${job.employerId}`}>
                                <img src={job.employerLogo} alt={job.employerName}
                                    className="w-16 h-16 rounded-2xl object-cover border border-surface-100 dark:border-surface-700 hover:ring-2 hover:ring-primary-400 transition-all" />
                            </Link>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h1 className="text-2xl font-black font-display text-surface-900 dark:text-white leading-tight">{job.title}</h1>
                                    {job.featured && <span className="badge badge-primary"><Zap size={10} /> Featured</span>}
                                </div>
                                <Link to={`/profile/${job.employerId}`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">{job.employerName}</Link>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className={`badge ${getCategoryColor(job.category)}`}>{category?.icon} {category?.label}</span>
                                    <span className={`badge ${getTypeColor(job.type)}`}>{job.type.replace('-', ' ')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Meta row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-surface-50 dark:bg-surface-900/50 rounded-xl mb-6">
                            {[
                                { icon: <MapPin size={15} />, label: 'Location', value: job.location },
                                { icon: <DollarSign size={15} />, label: 'Salary', value: formatSalary(job.salary) },
                                { icon: <Clock size={15} />, label: 'Posted', value: timeAgo(job.postedAt) },
                                { icon: <Users size={15} />, label: 'Applicants', value: `${job.applicationCount}+` },
                            ].map((m, i) => (
                                <div key={i} className="text-center">
                                    <div className="flex items-center justify-center text-primary-500 mb-1">{m.icon}</div>
                                    <div className="text-[10px] text-surface-400 mb-0.5 uppercase tracking-wide">{m.label}</div>
                                    <div className="text-xs font-semibold text-surface-700 dark:text-surface-200">{m.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="font-bold text-lg text-surface-900 dark:text-white mb-3">Job Description</h2>
                            <div className="space-y-0.5">{renderDescription(job.description)}</div>
                        </div>
                    </motion.div>

                    {/* Skills */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                        <h2 className="font-bold text-surface-900 dark:text-white mb-4">Required Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills?.map(s => <span key={s} className="chip">{s}</span>)}
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                    {/* Apply card */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card p-6 sticky top-24">
                        <div className="text-center mb-5">
                            <div className="text-2xl font-black font-display text-surface-900 dark:text-white">
                                {formatSalary(job.salary)}
                            </div>
                            <div className="text-xs text-surface-500 mt-1">per year</div>
                        </div>

                        {alreadyApplied ? (
                            <div className="flex items-center justify-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-success font-semibold">
                                <CheckCircle size={16} /> Application Submitted
                            </div>
                        ) : (
                            <button
                                id="apply-btn"
                                onClick={handleApply}
                                className="btn-primary btn w-full btn-lg"
                                disabled={user?.role === 'employer'}
                            >
                                {user?.role === 'employer' ? 'Employers cannot apply' : 'Apply Now ⚡'}
                            </button>
                        )}

                        <button onClick={handleShare} className="btn-secondary btn w-full mt-3 gap-2">
                            <Share2 size={16} /> Share Job
                        </button>

                        {/* Quick deadline */}
                        {job.deadline && (
                            <p className="text-xs text-center text-surface-400 mt-3">
                                Apply before {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        )}
                    </motion.div>

                    {/* Company card */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                        <h3 className="font-bold text-surface-900 dark:text-white mb-4">About the Company</h3>
                        <Link to={`/profile/${job.employerId}`} className="flex items-center gap-3 group mb-4">
                            <img src={job.employerLogo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                                <p className="font-semibold text-sm group-hover:text-primary-600 transition-colors">{job.employerName}</p>
                                <div className="flex items-center gap-1 text-xs text-surface-400"><Building2 size={12} /> View Profile</div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
