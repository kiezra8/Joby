/**
 * JobCard – reusable card for displaying a job listing.
 */
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, Users, Star, Zap } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { formatSalary, timeAgo, getCategoryColor, getTypeColor, truncate } from '../../utils/helpers'
import { JOB_CATEGORIES } from '../../data/dummyData'

export default function JobCard({ job, index = 0 }) {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuthStore()
    const category = JOB_CATEGORIES.find(c => c.id === job.category)

    // AI Matching Score (simulated)
    const matchingSkills = isAuthenticated && user?.role === 'seeker'
        ? job.skills?.filter(s => user.skills?.includes(s)) || []
        : []
    const score = job.skills?.length > 0
        ? Math.round((matchingSkills.length / job.skills.length) * 100)
        : 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
        >
            <div 
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="card-hover p-6 group cursor-pointer h-full flex flex-col relative"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={job.employerLogo}
                            alt={job.employerName}
                            className="w-12 h-12 rounded-xl object-cover border border-surface-100 dark:border-surface-700"
                        />
                        <div>
                            <h3 className="font-bold text-surface-900 dark:text-white text-base leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">{job.employerName}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        {score > 0 && (
                            <span className={`badge ${score > 70 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'}`}>
                                <Zap size={10} fill="currentColor" /> {score}% Match
                            </span>
                        )}
                        {job.featured && (
                            <span className="badge badge-primary">
                                <Star size={10} fill="currentColor" /> Featured
                            </span>
                        )}
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`badge flex items-center gap-1.5 ${getCategoryColor(job.category)}`}>
                        {category?.icon && (
                            <img src={category.icon} alt={category.label} className="w-3.5 h-3.5 rounded-sm object-cover" />
                        )}
                        {category?.label}
                    </span>
                    <span className={`badge ${getTypeColor(job.type)}`}>
                        {job.type.replace('-', ' ')}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-4 flex-1">
                    {truncate(job.description.replace(/\*\*/g, '').replace(/\n/g, ' '), 110)}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills?.slice(0, 4).map(skill => (
                        <span key={skill} className="chip text-[11px]">{skill}</span>
                    ))}
                    {job.skills?.length > 4 && (
                        <span className="chip text-[11px]">+{job.skills.length - 4}</span>
                    )}
                </div>

                {/* Info Footer */}
                <div className="flex items-center justify-between text-xs text-surface-400 dark:text-surface-500 pt-4 border-t border-surface-100 dark:border-surface-700/50 mb-4">
                    <div className="flex items-center gap-1">
                        <MapPin size={12} /> {job.location}
                    </div>
                    <div className="flex items-center gap-1 text-success font-semibold">
                        <DollarSign size={12} /> {formatSalary(job.salary).split(' – ')[0].replace('$', '')}+ / yr
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={12} /> {timeAgo(job.postedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                        <Users size={12} /> {job.applicationCount}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto">
                    <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job.id}`); }}
                        className="btn-secondary btn-sm flex-1 text-[11px]"
                    >
                        View Details
                    </button>
                    <a 
                        href={`https://wa.me/256754278976?text=Hi%20${encodeURIComponent(job.employerName)},%20I'm%20interested%20in%20the%20${encodeURIComponent(job.title)}%20role%20on%20JOBY!`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 btn-sm text-[11px] gap-1 px-3"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </motion.div>
    )
}
