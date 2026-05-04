/**
 * ApplicantsPage – employer view of all applicants for a specific job with accept/reject.
 */
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, Star, Zap, Maximize2 } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { useAuthStore } from '../../store/authStore'
import { timeAgo, getStatusConfig } from '../../utils/helpers'
import toast from 'react-hot-toast'

export default function ApplicantsPage() {
    const { jobId } = useParams()
    const { getJobById, getApplicationsByJob, updateApplicationStatus, getUserById } = useAppStore()
    const { user } = useAuthStore()

    const job = getJobById(jobId)
    const apps = getApplicationsByJob(jobId)

    if (!job) return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h2 className="text-xl font-bold mb-2">Job not found</h2>
            <Link to="/manage-jobs" className="btn-primary btn mt-4">Back to Jobs</Link>
        </div>
    )

    const handleStatus = (appId, status, seekerName, jobTitle) => {
        updateApplicationStatus(appId, status, user.id)
        toast.success(`${seekerName}'s application ${status === 'accepted' ? 'accepted ✅' : 'rejected'}!`)
    }

    const pending = apps.filter(a => a.status === 'pending')
    const decided = apps.filter(a => a.status !== 'pending')

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link to="/manage-jobs" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-primary-600 mb-6 transition-colors">
                <ArrowLeft size={16} /> Back to My Jobs
            </Link>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="section-title">Applicants</h1>
                <p className="section-subtitle">{job.title} · {apps.length} application{apps.length !== 1 ? 's' : ''}</p>
            </motion.div>

            {apps.length === 0 ? (
                <div className="card p-16 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                        <img 
                            src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=200&h=200&fit=crop" 
                            alt="No applicants" 
                            className="w-16 h-16 object-cover rounded-xl opacity-50 grayscale"
                        />
                    </div>
                    <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">No applicants yet</h3>
                    <p className="text-surface-500 dark:text-surface-400 text-sm">Share your job listing to attract top talent.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Pending */}
                    {pending.length > 0 && (
                        <div>
                            <h2 className="font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-warning inline-block" /> Pending Review ({pending.length})
                            </h2>
                            <div className="space-y-4">
                                {pending.map((app, i) => (
                                    <ApplicantCard key={app.id} app={app} index={i} onStatus={handleStatus} getUserById={getUserById} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Decided */}
                    {decided.length > 0 && (
                        <div>
                            <h2 className="font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-surface-400 inline-block" /> Decided ({decided.length})
                            </h2>
                            <div className="space-y-4">
                                {decided.map((app, i) => (
                                    <ApplicantCard key={app.id} app={app} index={i} onStatus={handleStatus} getUserById={getUserById} readonly />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function ApplicantCard({ app, index, onStatus, getUserById, readonly }) {
    const { getJobById } = useAppStore()
    const job = getJobById(app.jobId)
    const cfg = getStatusConfig(app.status)
    const seeker = getUserById(app.seekerId)
    const rating = seeker?.rating || 0

    // AI Matching Score (simulated)
    const matchingSkills = job?.skills?.filter(s => app.seekerSkills?.includes(s)) || []
    const score = job?.skills?.length > 0
        ? Math.round((matchingSkills.length / job.skills.length) * 100)
        : 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="card p-6"
        >
            <div className="flex flex-col sm:flex-row gap-5">
                {/* Avatar */}
                <Link to={`/profile/${app.seekerId}`}>
                    <img
                        src={app.seekerAvatar}
                        alt={app.seekerName}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-100 dark:ring-primary-900 hover:ring-primary-400 transition-all"
                    />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                            <div className="flex items-center gap-2">
                                <Link to={`/profile/${app.seekerId}`} className="font-bold text-surface-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    {app.seekerName}
                                </Link>
                                {score > 0 && (
                                    <span className={`badge text-[10px] ${score > 70 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'}`}>
                                        <Zap size={10} fill="currentColor" /> {score}% Match
                                    </span>
                                )}
                            </div>
                            {app.seekerTitle && <p className="text-sm text-surface-500 dark:text-surface-400">{app.seekerTitle}</p>}
                            {rating > 0 && (
                                <div className="flex items-center gap-1 mt-1">
                                    <Star size={12} fill="#f59e0b" stroke="#f59e0b" />
                                    <span className="text-xs font-semibold text-surface-600">{rating.toFixed(1)}</span>
                                    <span className="text-xs text-surface-400">({seeker?.reviewCount || 0} reviews)</span>
                                </div>
                            )}
                        </div>
                        <span className={cfg.color}>{cfg.label}</span>
                    </div>

                    {/* Skills */}
                    {app.seekerSkills?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {app.seekerSkills.slice(0, 6).map(s => <span key={s} className="chip text-[11px]">{s}</span>)}
                        </div>
                    )}

                    <p className="text-xs text-surface-400 mt-3">Applied {timeAgo(app.appliedAt)}</p>

                    {/* Portfolio Preview */}
                    {seeker?.portfolioImages?.length > 0 && (
                        <div className="portfolio-gallery">
                            {seeker.portfolioImages.slice(0, 3).map((img, i) => (
                                <div key={i} className="portfolio-item">
                                    <img src={img} alt="Work preview" />
                                    <div className="portfolio-overlay">
                                        <Maximize2 size={16} className="text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 items-center sm:items-end shrink-0">
                    <Link to={`/profile/${app.seekerId}`} className="btn-secondary btn-sm btn gap-1">
                        <ExternalLink size={12} /> Profile
                    </Link>
                    {!readonly && (
                        <>
                            <button
                                onClick={() => onStatus(app.id, 'accepted', app.seekerName, app.jobTitle)}
                                className="btn-success btn-sm btn gap-1"
                            >
                                <CheckCircle size={12} /> Accept
                            </button>
                            <button
                                onClick={() => onStatus(app.id, 'rejected', app.seekerName, app.jobTitle)}
                                className="btn-danger btn-sm btn gap-1"
                            >
                                <XCircle size={12} /> Reject
                            </button>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
