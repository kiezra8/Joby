/**
 * ProfilePage – public profile view for both seekers and employers.
 */
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star, CheckCircle, Briefcase, GraduationCap, MessageSquare, ArrowLeft, Shield } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { useAuthStore } from '../../store/authStore'
import { formatSalary, timeAgo } from '../../utils/helpers'
import JobCard from '../../components/jobs/JobCard'

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={14} fill={s <= Math.round(rating) ? '#f59e0b' : 'none'} stroke="#f59e0b" />
            ))}
            <span className="text-sm font-semibold text-surface-700 dark:text-surface-300 ml-1">{rating.toFixed(1)}</span>
        </div>
    )
}

export default function ProfilePage() {
    const { id } = useParams()
    const { getUserById, getJobsByEmployer, getReviewsForUser } = useAppStore()
    const { user: me } = useAuthStore()
    const profile = getUserById(id)

    if (!profile) return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="text-5xl mb-4">👤</div>
            <h2 className="text-xl font-bold mb-2">Profile not found</h2>
            <Link to="/jobs" className="btn-primary btn mt-4">Back to Jobs</Link>
        </div>
    )

    const isEmployer = profile.role === 'employer'
    const employerJobs = isEmployer ? getJobsByEmployer(id).slice(0, 4) : []
    const reviews = getReviewsForUser(id)
    const isMe = me?.id === id

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-primary-600 mb-6 transition-colors">
                <ArrowLeft size={16} /> Back
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left – profile card */}
                <div className="space-y-5">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8 text-center">
                        <div className="relative inline-block mb-4">
                            <img
                                src={profile.avatar || profile.logo}
                                alt={profile.name}
                                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-primary-100 dark:ring-primary-900 mx-auto"
                            />
                            {profile.verified && (
                                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-surface-800">
                                    <Shield size={14} className="text-white" />
                                </div>
                            )}
                        </div>

                        <h1 className="text-xl font-black font-display text-surface-900 dark:text-white">{profile.name}</h1>
                        {profile.title && <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">{profile.title}</p>}
                        {profile.location && <p className="text-xs text-surface-500 flex items-center justify-center gap-1 mt-2"><MapPin size={12} />{profile.location}</p>}

                        {profile.rating > 0 && (
                            <div className="flex justify-center mt-3">
                                <StarRating rating={profile.rating} />
                            </div>
                        )}

                        {profile.verified && (
                            <div className="mt-3">
                                <span className="badge badge-success"><CheckCircle size={10} /> Verified Profile</span>
                            </div>
                        )}

                        {!isMe && me && (
                            <Link to="/messages" className="btn-primary btn w-full mt-5 gap-2">
                                <MessageSquare size={15} /> Send Message
                            </Link>
                        )}
                        {isMe && (
                            <Link to="/profile/edit" className="btn-secondary btn w-full mt-5">Edit Profile</Link>
                        )}
                    </motion.div>

                    {/* Skills (seeker) */}
                    {!isEmployer && profile.skills?.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                            <h3 className="font-bold text-surface-900 dark:text-white mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map(s => <span key={s} className="chip">{s}</span>)}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right – main content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Bio / Description */}
                    {(profile.bio || profile.description) && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-6">
                            <h2 className="font-bold text-surface-900 dark:text-white mb-3">{isEmployer ? 'About the Company' : 'About Me'}</h2>
                            <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                                {profile.bio || profile.description || 'No bio provided yet.'}
                            </p>
                        </motion.div>
                    )}

                    {/* Experience (seeker) */}
                    {!isEmployer && profile.experience?.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                            <h2 className="font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                                <Briefcase size={18} className="text-primary-500" /> Work Experience
                            </h2>
                            <div className="space-y-4">
                                {profile.experience.map((exp, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                                            <Briefcase size={16} className="text-primary-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-surface-900 dark:text-white">{exp.role}</p>
                                            <p className="text-sm text-primary-600 dark:text-primary-400">{exp.company}</p>
                                            <p className="text-xs text-surface-500">{exp.from} – {exp.to || 'Present'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Education (seeker) */}
                    {!isEmployer && profile.education?.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-6">
                            <h2 className="font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                                <GraduationCap size={18} className="text-primary-500" /> Education
                            </h2>
                            <div className="space-y-4">
                                {profile.education.map((edu, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                                            <GraduationCap size={16} className="text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-surface-900 dark:text-white">{edu.degree}</p>
                                            <p className="text-sm text-primary-600 dark:text-primary-400">{edu.institution}</p>
                                            <p className="text-xs text-surface-500">Class of {edu.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Employer's active jobs */}
                    {isEmployer && employerJobs.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <h2 className="font-bold text-surface-900 dark:text-white mb-4">Open Positions</h2>
                            <div className="grid sm:grid-cols-2 gap-5">
                                {employerJobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                            </div>
                        </motion.div>
                    )}

                    {/* Reviews */}
                    {reviews.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                            <h2 className="font-bold text-surface-900 dark:text-white mb-4">Reviews</h2>
                            <div className="space-y-4">
                                {reviews.map(r => (
                                    <div key={r.id} className="p-4 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="font-semibold text-sm">{r.reviewerName}</p>
                                            <StarRating rating={r.rating} />
                                        </div>
                                        <p className="text-sm text-surface-600 dark:text-surface-400">{r.comment}</p>
                                        <p className="text-xs text-surface-400 mt-2">{timeAgo(r.createdAt)}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
