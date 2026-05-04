/**
 * PostJobPage – employer form to create a new job listing.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, X, Briefcase, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'
import { JOB_CATEGORIES, JOB_TYPES } from '../../data/dummyData'
import { genId } from '../../utils/helpers'
import toast from 'react-hot-toast'

export default function PostJobPage() {
    const { user } = useAuthStore()
    const { addJob } = useAppStore()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: '', category: '', type: '', location: '',
        salaryMin: '', salaryMax: '', description: '',
    })
    const [skillInput, setSkillInput] = useState('')
    const [skills, setSkills] = useState([])
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)

    const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: '' })) }

    const addSkill = () => {
        const s = skillInput.trim()
        if (s && !skills.includes(s)) { setSkills(sk => [...sk, s]); setSkillInput('') }
    }

    const validate = () => {
        const e = {}
        if (!form.title.trim()) e.title = 'Job title is required.'
        if (!form.category) e.category = 'Please select a category.'
        if (!form.type) e.type = 'Please select a job type.'
        if (!form.description.trim()) e.description = 'Description is required.'
        if (form.salaryMin && form.salaryMax && Number(form.salaryMin) > Number(form.salaryMax))
            e.salaryMax = 'Max salary must be greater than min.'
        return e
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        setSaving(true)
        await new Promise(r => setTimeout(r, 700))
        const job = {
            id: genId('job'),
            employerId: user.id,
            employerName: user.companyName || user.name,
            employerLogo: user.logo,
            title: form.title,
            category: form.category,
            type: form.type,
            location: form.location || 'Remote',
            salary: form.salaryMin
                ? { min: Number(form.salaryMin), max: Number(form.salaryMax) || Number(form.salaryMin), currency: 'USD' }
                : null,
            description: form.description,
            skills,
            postedAt: new Date().toISOString(),
            deadline: null,
            status: 'open',
            featured: false,
            applicationCount: 0,
        }
        addJob(job)
        toast.success('Job posted successfully! 🎉')
        navigate('/manage-jobs')
        setSaving(false)
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="section-title flex items-center gap-3"><Briefcase className="text-primary-500" />Post a Job</h1>
                <p className="section-subtitle">Reach thousands of qualified candidates</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
                    <h2 className="font-bold text-surface-900 dark:text-white mb-4">Job Details</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="label">Job Title *</label>
                            <input id="job-title" value={form.title} onChange={e => set('title', e.target.value)}
                                className={`input ${errors.title ? 'input-error' : ''}`} placeholder="Senior React Developer" />
                            {errors.title && <p className="error-msg"><AlertCircle size={12} />{errors.title}</p>}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="label">Category *</label>
                                <select id="job-category" value={form.category} onChange={e => set('category', e.target.value)}
                                    className={`input ${errors.category ? 'input-error' : ''}`}>
                                    <option value="">Select category...</option>
                                    {JOB_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                                </select>
                                {errors.category && <p className="error-msg"><AlertCircle size={12} />{errors.category}</p>}
                            </div>
                            <div>
                                <label className="label">Job Type *</label>
                                <select id="job-type" value={form.type} onChange={e => set('type', e.target.value)}
                                    className={`input ${errors.type ? 'input-error' : ''}`}>
                                    <option value="">Select type...</option>
                                    {JOB_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                                </select>
                                {errors.type && <p className="error-msg"><AlertCircle size={12} />{errors.type}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="label">Location</label>
                            <input value={form.location} onChange={e => set('location', e.target.value)}
                                className="input" placeholder="New York, NY or Remote" />
                        </div>
                    </div>
                </motion.div>

                {/* Salary */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-6">
                    <h2 className="font-bold text-surface-900 dark:text-white mb-4">Salary Range (USD/year)</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Minimum</label>
                            <input type="number" value={form.salaryMin} onChange={e => set('salaryMin', e.target.value)}
                                className="input" placeholder="60000" min="0" />
                        </div>
                        <div>
                            <label className="label">Maximum</label>
                            <input type="number" value={form.salaryMax} onChange={e => set('salaryMax', e.target.value)}
                                className={`input ${errors.salaryMax ? 'input-error' : ''}`} placeholder="120000" min="0" />
                            {errors.salaryMax && <p className="error-msg"><AlertCircle size={12} />{errors.salaryMax}</p>}
                        </div>
                    </div>
                </motion.div>

                {/* Skills */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                    <h2 className="font-bold text-surface-900 dark:text-white mb-4">Required Skills</h2>
                    <div className="flex gap-2 mb-3">
                        <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                            className="input flex-1" placeholder="Type a skill and press Enter" />
                        <button type="button" onClick={addSkill} className="btn-primary btn gap-1"><Plus size={15} />Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(s => (
                            <span key={s} className="chip gap-2">{s}
                                <button type="button" onClick={() => setSkills(sk => sk.filter(x => x !== s))}><X size={12} /></button>
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Description */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-6">
                    <h2 className="font-bold text-surface-900 dark:text-white mb-4">Job Description *</h2>
                    <textarea
                        id="job-description"
                        value={form.description}
                        onChange={e => set('description', e.target.value)}
                        rows={10}
                        className={`input resize-none ${errors.description ? 'input-error' : ''}`}
                        placeholder={`Describe the role, responsibilities, and requirements...\n\n**Responsibilities:**\n- ...\n\n**Requirements:**\n- ...`}
                    />
                    {errors.description && <p className="error-msg"><AlertCircle size={12} />{errors.description}</p>}
                    <p className="text-xs text-surface-400 mt-2">You can use **bold** and - bullet formatting.</p>
                </motion.div>

                <button type="submit" id="post-job-submit" disabled={saving} className="btn-primary btn btn-lg w-full">
                    {saving ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                            Publishing...
                        </span>
                    ) : '🚀 Publish Job Listing'}
                </button>
            </form>
        </div>
    )
}
