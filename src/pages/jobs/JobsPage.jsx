/**
 * JobsPage – browse, search, and filter all job listings.
 */
import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { JOB_CATEGORIES, JOB_TYPES } from '../../data/dummyData'
import JobCard from '../../components/jobs/JobCard'

export default function JobsPage() {
    const { jobs } = useAppStore()
    const [params, setParams] = useSearchParams()
    const [showFilters, setShowFilters] = useState(false)

    const [q, setQ] = useState(params.get('q') || '')
    const [category, setCategory] = useState(params.get('category') || '')
    const [type, setType] = useState('')
    const [sort, setSort] = useState('newest')

    const filtered = useMemo(() => {
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

    const clearFilters = () => { setQ(''); setCategory(''); setType(''); setSort('newest') }
    const hasFilters = q || category || type || sort !== 'newest'

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Page header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="section-title">Browse Jobs</h1>
                <p className="section-subtitle">{filtered.length} opportunities available</p>
            </motion.div>

            {/* Search + filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                    <input
                        id="job-search"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="Search job title, skill, company..."
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
                                <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                            ))}
                        </select>
                    </div>
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
                    <div>
                        <label className="label">Sort By</label>
                        <select
                            id="filter-sort"
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="input"
                        >
                            <option value="newest">Newest First</option>
                            <option value="salary">Highest Salary</option>
                            <option value="popular">Most Applied</option>
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
                        className={`btn btn-sm gap-1 ${category === c.id ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        {c.icon} {c.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-24">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-1">No jobs found</h3>
                    <p className="text-sm text-surface-400">Try different keywords or clear your filters.</p>
                    <button onClick={clearFilters} className="btn-primary btn mt-4 mx-auto">Clear Filters</button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                </div>
            )}
        </div>
    )
}
