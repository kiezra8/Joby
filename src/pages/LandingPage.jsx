/**
 * LandingPage – premium hero + category grid + featured jobs + CTA.
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Star, Users, Briefcase, TrendingUp, CheckCircle, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { JOB_CATEGORIES } from '../data/dummyData'
import { useAppStore } from '../store/appStore'
import JobCard from '../components/jobs/JobCard'
import SeekerCard from '../components/seeker/SeekerCard'
import { DUMMY_USERS } from '../data/dummyData'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920&h=1080&fit=crop';

const FEATURES = [
    {
        title: 'Verified Profiles',
        desc: 'Every employer and talent profile is verified to ensure a safe and trustworthy environment.',
        icon: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop'
    },
    {
        title: 'Smart Matching',
        desc: 'Our AI-powered algorithm connects you with the most relevant opportunities and candidates.',
        icon: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop'
    },
    {
        title: 'Instant Messaging',
        desc: 'Communicate directly with hiring managers or candidates through our built-in chat system.',
        icon: 'https://images.unsplash.com/photo-1577563906417-45a11b3f9f7c?w=300&h=300&fit=crop'
    },
    {
        title: 'Career Growth',
        desc: 'Access exclusive resources and insights to help you level up your career or business.',
        icon: 'https://images.unsplash.com/photo-1454165833767-027ff33027ef?w=300&h=300&fit=crop'
    }
];

export default function LandingPage() {
    const navigate = useNavigate()
    const { jobs } = useAppStore()
    const featured = jobs.filter(j => j.featured).slice(0, 3)

    return (
        <div className="overflow-x-hidden">
            {/* ===== HERO ===== */}
            <section className="relative h-[45vh] min-h-[400px] flex items-center overflow-hidden bg-surface-900">
                {/* Static Background */}
                <div className="absolute inset-0">
                    <img
                        src={HERO_IMAGE}
                        alt="Professionals"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-sm text-white mb-4 shadow-sm">
                            <Zap size={14} className="text-accent-300" />
                            <span className="font-semibold text-white">The #1 Premium Job Marketplace</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black font-display text-white leading-tight mb-4 drop-shadow-lg">
                            Find Your{' '}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent drop-shadow-md">
                                    Dream Career
                                </span>
                            </span>
                        </h1>

                        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow-md font-medium">
                            Connect with world-class companies and top talent. JOBY makes hiring beautiful,
                            fast, and transparent — for everyone.
                        </p>

                        {/* Quick links */}
                        <div className="flex flex-wrap justify-center gap-2 text-sm text-white/90 drop-shadow-md">
                            <span className="font-semibold text-white">Popular:</span>
                            {['React Developer', 'Nurse', 'Designer', 'Project Manager'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => navigate(`/jobs?q=${encodeURIComponent(t)}`)}
                                    className="text-white hover:text-accent-200 transition-colors px-2 py-0.5 rounded-lg hover:bg-white/10"
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg viewBox="0 0 1440 80" fill="none" className="w-full">
                        <path d="M0 80L1440 80L1440 20C1200 70 840 10 720 30C600 50 240 80 0 40L0 80Z" className="fill-surface-50 dark:fill-surface-950" />
                    </svg>
                </div>
            </section>

            {/* ===== CATEGORIES ===== */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title">Browse by Category</h2>
                    <p className="section-subtitle">Find jobs in your field across every industry</p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {JOB_CATEGORIES.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <Link
                                 to={`/jobs?category=${cat.id}`}
                                 className="card-hover p-5 flex flex-col items-center gap-2 text-center group"
                             >
                                 <img src={cat.icon} alt={cat.label} className="w-12 h-12 rounded-xl object-cover mb-1 group-hover:scale-110 transition-transform" />
                                 <span className="text-xs font-bold text-surface-700 dark:text-surface-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                                     {cat.label}
                                 </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== FEATURED JOBS ===== */}
            <section className="py-20 bg-surface-100/50 dark:bg-surface-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-end justify-between mb-12"
                    >
                        <div>
                            <h2 className="section-title">Featured Jobs</h2>
                            <p className="section-subtitle">Hand-picked opportunities from top companies</p>
                        </div>
                        <Link to="/jobs" className="btn-primary btn hidden sm:flex">
                            View All Jobs <ArrowRight size={16} />
                        </Link>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featured.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                    </div>

                    <div className="text-center mt-8 sm:hidden">
                        <Link to="/jobs" className="btn-primary btn">
                            View All Jobs <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== FEATURED CANDIDATES ===== */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-end justify-between mb-12"
                    >
                        <div>
                            <h2 className="section-title">Top Talent</h2>
                            <p className="section-subtitle">Highly skilled professionals ready for their next challenge</p>
                        </div>
                        <Link to="/jobs?tab=talent" className="btn-secondary btn hidden sm:flex">
                            Browse All Talent <ArrowRight size={14} />
                        </Link>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {DUMMY_USERS
                            .filter(u => u.role === 'seeker' && u.featured)
                            .slice(0, 4)
                            .map((seeker, i) => (
                                <SeekerCard key={seeker.id} seeker={seeker} index={i} />
                            ))
                        }
                    </div>

                    <div className="text-center mt-10 sm:hidden">
                        <Link to="/jobs?tab=talent" className="btn-secondary btn">
                            Browse All Talent <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="section-title">Why Choose JOBY?</h2>
                    <p className="section-subtitle">Everything you need to hire or get hired — in one place</p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="card p-6 hover:border-primary-200 dark:hover:border-primary-800 transition-colors"
                        >
                            <div className="w-16 h-16 rounded-2xl overflow-hidden mb-5 ring-4 ring-primary-50 dark:ring-primary-900/20">
                                <img src={f.icon} alt={f.title} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold text-surface-900 dark:text-white mb-2">{f.title}</h3>
                            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20 bg-hero-gradient relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                />
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black font-display text-white mb-6">
                            Ready to take the next step?
                        </h2>
                        <p className="text-white/65 text-lg mb-10">
                            Join over 180,000 professionals and 5,000 companies already using JOBY.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/register?role=seeker"
                                className="btn bg-white text-primary-700 hover:bg-surface-100 font-bold px-8 py-3.5 text-base rounded-2xl shadow-lg"
                            >
                                Find a Job
                            </Link>
                            <Link
                                to="/register?role=employer"
                                className="btn bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-bold px-8 py-3.5 text-base rounded-2xl"
                            >
                                Hire Talent
                            </Link>
                        </div>
                        <div className="flex justify-center gap-6 mt-8 text-sm text-white/50">
                            {['Free to join', 'No credit card needed', 'Cancel anytime'].map(t => (
                                <div key={t} className="flex items-center gap-1.5">
                                    <CheckCircle size={14} className="text-green-400" /> {t}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="bg-surface-900 dark:bg-surface-950 text-surface-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <Briefcase size={16} className="text-white" />
                            </div>
                            <span className="font-black font-display text-white text-lg">JO<span className="text-gradient">BY</span></span>
                        </div>
                        <p className="text-sm">© 2025 JOBY. All rights reserved. The premium job marketplace.</p>
                        <div className="flex gap-4 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
