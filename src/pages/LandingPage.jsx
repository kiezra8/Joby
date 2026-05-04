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

const HERO_IMAGES = [
    { url: '/images/hero/hero_dev.png', title: 'Tech Professionals' },
    { url: '/images/hero/hero_design.png', title: 'Creative Designers' },
    { url: '/images/hero/hero_engineer.png', title: 'Skilled Engineers' },
    { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920&h=1080&fit=crop', title: 'Business Leaders' },
]

const FEATURES = [
    { icon: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop', title: 'Smart Matching', desc: 'AI-powered recommendations tailored to your skills and preferences.' },
    { icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop', title: 'Instant Apply', desc: 'Apply to any job in seconds with your saved profile.' },
    { icon: 'https://images.unsplash.com/photo-1507679799987-c7377ec48696?w=100&h=100&fit=crop', title: 'Verified Profiles', desc: 'Every employer and seeker is verified for your safety.' },
    { icon: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&h=100&fit=crop', title: 'Direct Messaging', desc: 'Chat with employers and candidates in real-time.' },
]

export default function LandingPage() {
    const [search, setSearch] = useState('')
    const [currentHero, setCurrentHero] = useState(0)
    const navigate = useNavigate()
    const { jobs } = useAppStore()
    const featured = jobs.filter(j => j.featured).slice(0, 3)

    // Carousel effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHero(prev => (prev + 1) % HERO_IMAGES.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/jobs?q=${encodeURIComponent(search)}`)
    }

    return (
        <div className="overflow-x-hidden">
            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-surface-950">
                {/* Carousel Background */}
                <div className="absolute inset-0">
                    {HERO_IMAGES.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: currentHero === idx ? 1 : 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0"
                        >
                            <img
                                src={img.url}
                                alt={img.title}
                                className="w-full h-full object-cover scale-105"
                            />
                            <div className="carousel-overlay" />
                        </motion.div>
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
                            <Zap size={14} className="text-accent-400" />
                            The #1 Premium Job Marketplace
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black font-display text-white leading-tight mb-6 drop-shadow-2xl">
                            Find Your{' '}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
                                    Dream Career
                                </span>
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                                    <path d="M2 9C50 3 150 1 298 9" stroke="url(#u)" strokeWidth="3" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="u" x1="0" y1="0" x2="300" y2="0">
                                            <stop stopColor="#a78bfa" />
                                            <stop offset="1" stopColor="#818cf8" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg font-medium">
                            Connect with world-class companies and top talent. JOBY makes hiring beautiful,
                            fast, and transparent — for everyone.
                        </p>

                        {/* Search bar */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
                            <div className="flex gap-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-2 shadow-2xl">
                                <div className="flex items-center gap-3 flex-1 px-3">
                                    <Search size={20} className="text-white/70 shrink-0" />
                                    <input
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        placeholder="Search jobs, companies, skills..."
                                        className="flex-1 bg-transparent text-white placeholder-white/50 text-base focus:outline-none"
                                    />
                                </div>
                                <button type="submit" className="btn bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary-900/20">
                                    Search Jobs
                                </button>
                            </div>
                        </form>

                        {/* Quick links */}
                        <div className="flex flex-wrap justify-center gap-2 text-sm text-white/70">
                            <span className="font-semibold text-white/90">Popular:</span>
                            {['React Developer', 'Nurse', 'Designer', 'Project Manager'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => navigate(`/jobs?q=${encodeURIComponent(t)}`)}
                                    className="text-white/80 hover:text-white hover:underline transition-colors px-2 py-0.5 rounded-lg hover:bg-white/10"
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
