/**
 * JobsPage – browse, search, and filter all job listings.
 */
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, X, SlidersHorizontal, Briefcase, Users } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { JOB_CATEGORIES, JOB_TYPES, DUMMY_USERS } from '../../data/dummyData'
import JobCard from '../../components/jobs/JobCard'
import SeekerCard from '../../components/seeker/SeekerCard'

export default function JobsPage() {
    const { jobs } = useAppStore()
    const [params, setParams] = useSearchParams()
    const [showFilters, setShowFilters] = useState(false)
    const [tab, setTab] = useState(params.get('tab') || 'jobs') // 'jobs' or 'talent'

    const [q, setQ] = useState(params.get('q') || '')
    const [category, setCategory] = useState(params.get('category') || '')
    const [type, setType] = useState('')
    const [sort, setSort] = useState('newest')

    // Sync tab with URL
    useEffect(() => {
        const urlTab = params.get('tab')
        if (urlTab && urlTab !== tab) setTab(urlTab)
    }, [params])

    const seekers = useMemo(() => DUMMY_USERS.filter(u => u.role === 'seeker'), [])

    const filteredJobs = useMemo(() => {
        let result = [...jobs]
        if (q) {
            const lower = q.toLowerCase()
            result = result.filter(j =>
                j.title.toLowerCase().includes(lower) ||
                j.employerName.toLowerCase().includes(lower) ||
                j.skills?.some(s => s.toLowerCase().includes(lower)) ||
                j.description.toLowerCase().includes(lower)
            )
        }
        if (category) result = result.filter(j => j.category === category)
        if (type) result = result.filter(j => j.type === type)
        if (sort === 'newest') result = [...result].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
        if (sort === 'salary') result = [...result].sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0))
        if (sort === 'popular') result = [...result].sort((a, b) => b.applicationCount - a.applicationCount)
        return result
    }, [jobs, q, category, type, sort])

    const filteredTalent = useMemo(() => {
        let result = [...seekers]
        if (q) {
            const lower = q.toLowerCase()
            result = result.filter(u =>
                u.name.toLowerCase().includes(lower) ||
                u.title.toLowerCase().includes(lower) ||
                u.skills?.some(s => s.toLowerCase().includes(lower)) ||
                u.bio.toLowerCase().includes(lower)
            )
        }
        if (category) result = result.filter(u => u.category === category)
        if (sort === 'newest') result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        if (sort === 'popular') result = [...result].sort((a, b) => b.reviewCount - a.reviewCount)
        return result
    }, [seekers, q, category, sort])

    const clearFilters = () => { setQ(''); setCategory(''); setType(''); setSort('newest') }
    const hasFilters = q || category || type || sort !== 'newest'

    const activeCategoryLabel = useMemo(() => {
        if (!category) return ''
        const catObj = JOB_CATEGORIES.find(c => c.id === category)
        return catObj ? catObj.label : ''
    }, [category])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="section-title flex items-center gap-2">
                        {tab === 'jobs' ? 'Browse' : 'Discover'}
                        {activeCategoryLabel && <span className="text-primary-600 dark:text-primary-400">{activeCategoryLabel}</span>}
                        {tab === 'jobs' ? 'Jobs' : 'Talent'}
                    </h1>
                    <p className="section-subtitle">
                        {tab === 'jobs' ? `${filteredJobs.length} opportunities available` : `${filteredTalent.length} professionals found`}
                    </p>
                </motion.div>

                {/* Tab switcher */}
                <div className="flex bg-surface-100 dark:bg-surface-800 p-1 rounded-2xl w-fit self-start shadow-inner">
                    <button
                        onClick={() => { setTab('jobs'); setParams({ ...Object.fromEntries(params), tab: 'jobs' }) }}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'jobs' ? 'bg-white dark:bg-surface-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-surface-500'}`}
                    >
                        <Briefcase size={16} /> Jobs
                    </button>
                    <button
                        onClick={() => { setTab('talent'); setParams({ ...Object.fromEntries(params), tab: 'talent' }) }}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'talent' ? 'bg-white dark:bg-surface-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-surface-500'}`}
                    >
                        <Users size={16} /> Talent
                    </button>
                </div>
            </div>

            {/* Search + filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                    <input
                        id="job-search"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder={tab === 'jobs' ? "Search job title, skill, company..." : "Search name, title, expertise..."}
                        className="input input-lg pl-12"
                    />
                    {q && (
                        <button onClick={() => setQ('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600">
                            <X size={16} />
                        </button>
                    )}
                </div>
                <button
                    onClick={() => setShowFilters(f => !f)}
                    className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'} gap-2`}
                >
                    <SlidersHorizontal size={16} />
                    Filters
                    {hasFilters && <span className="w-2 h-2 rounded-full bg-accent-400 ml-1" />}
                </button>
                {hasFilters && (
                    <button onClick={clearFilters} className="btn-ghost btn text-sm">
                        <X size={14} /> Clear
                    </button>
                )}
            </div>

            {/* Expanded filters */}
            {showFilters && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="card p-5 mb-6 grid sm:grid-cols-3 gap-4"
                >
                    <div>
                        <label className="label">Category</label>
                        <select
                            id="filter-category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="input"
                        >
                            <option value="">All Categories</option>
                            {JOB_CATEGORIES.map(c => (
                                <option key={c.id} value={c.id}>{c.label}</option>
                            ))}
                        </select>
                    </div>
                    {tab === 'jobs' && (
                        <div>
                            <label className="label">Job Type</label>
                            <select
                                id="filter-type"
                                value={type}
                                onChange={e => setType(e.target.value)}
                                className="input"
                            >
                                <option value="">All Types</option>
                                {JOB_TYPES.map(t => (
                                    <option key={t.id} value={t.id}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div>
                        <label className="label">Sort By</label>
                        <select
                            id="filter-sort"
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="input"
                        >
                            <option value="newest">Newest First</option>
                            {tab === 'jobs' && <option value="salary">Highest Salary</option>}
                            <option value="popular">Most {tab === 'jobs' ? 'Applied' : 'Reviews'}</option>
                        </select>
                    </div>
                </motion.div>
            )}

            {/* Category quick pills */}
            <div className="flex gap-2 flex-wrap mb-8">
                <button
                    onClick={() => setCategory('')}
                    className={`btn btn-sm ${!category ? 'btn-primary' : 'btn-secondary'}`}
                >
                    All
                </button>
                {JOB_CATEGORIES.map(c => (
                    <button
                        key={c.id}
                        onClick={() => setCategory(cat => cat === c.id ? '' : c.id)}
                        className={`btn btn-sm gap-1.5 ${category === c.id ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        <img src={c.icon} alt="" className="w-3.5 h-3.5 rounded-sm object-cover" />
                        {c.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {(tab === 'jobs' ? filteredJobs : filteredTalent).length === 0 ? (
                <div className="text-center py-24">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-3xl">
                        🔍
                    </div>
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-1">
                        No {tab === 'jobs' ? 'jobs' : 'candidates'} found
                    </h3>
                    <p className="text-sm text-surface-500">Try different keywords or clear your filters.</p>
                    <button onClick={clearFilters} className="btn-primary btn mt-4 mx-auto">Clear Filters</button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tab === 'jobs' 
                        ? filteredJobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)
                        : filteredTalent.map((seeker, i) => <SeekerCard key={seeker.id} seeker={seeker} index={i} />)
                    }
                </div>
            )}
        </div>
    )
}
