/**
 * SeekerCard – reusable card for displaying a job seeker/candidate profile.
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star, Briefcase, GraduationCap, ExternalLink, CheckCircle } from 'lucide-react'

export default function SeekerCard({ seeker, index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
        >
            <div className="card p-6 group h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="relative shrink-0">
                        <img
                            src={seeker.avatar}
                            alt={seeker.name}
                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary-50 dark:ring-primary-900/30"
                        />
                        {seeker.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-surface-800 rounded-full p-0.5 shadow-sm">
                                <CheckCircle size={14} className="text-success fill-success/10" />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-surface-900 dark:text-white text-base leading-tight">
                            {seeker.name}
                        </h3>
                        <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-0.5 truncate">
                            {seeker.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                            <Star size={12} fill="#f59e0b" stroke="#f59e0b" />
                            <span className="text-xs font-bold text-surface-700 dark:text-surface-200">{seeker.rating}</span>
                            <span className="text-xs text-surface-400">({seeker.reviewCount})</span>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400">
                        <Briefcase size={12} />
                        <span className="truncate">{seeker.experience[0]?.role} @ {seeker.experience[0]?.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400">
                        <GraduationCap size={12} />
                        <span className="truncate">{seeker.education[0]?.degree}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400">
                        <MapPin size={12} />
                        <span>{seeker.location}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {seeker.skills?.slice(0, 3).map(skill => (
                        <span key={skill} className="chip text-[10px] py-0.5">{skill}</span>
                    ))}
                    {seeker.skills?.length > 3 && (
                        <span className="chip text-[10px] py-0.5">+{seeker.skills.length - 3}</span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-surface-100 dark:border-surface-700/50">
                    <Link 
                        to={`/profile/${seeker.id}`} 
                        className="btn-secondary btn-sm flex-1 text-[11px]"
                    >
                        View Profile
                    </Link>
                    <a 
                        href={`https://wa.me/256754278976?text=Hi%20${encodeURIComponent(seeker.name)},%20I'm%20interested%20in%20your%20profile%20on%20JOBY!`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 btn-sm text-[11px] gap-1 px-3"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </motion.div>
    )
}
