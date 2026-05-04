/**
 * EditProfilePage – full profile edit form for both seekers and employers.
 * Supports tag-based skill input, experience/education entries, and avatar URL.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, X, Plus, Briefcase, GraduationCap, Save } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'
import toast from 'react-hot-toast'

export default function EditProfilePage() {
    const { user, updateUser } = useAuthStore()
    const { updateUserProfile } = useAppStore()
    const isEmployer = user?.role === 'employer'

    const [form, setForm] = useState({
        name: user?.name || '',
        title: user?.title || '',
        bio: user?.bio || '',
        description: user?.description || '',
        location: user?.location || '',
        website: user?.website || '',
        skills: user?.skills || [],
        experience: user?.experience || [],
        education: user?.education || [],
        avatar: user?.avatar || '',
        logo: user?.logo || '',
        companyName: user?.companyName || '',
    })
    const [skillInput, setSkillInput] = useState('')
    const [saving, setSaving] = useState(false)

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

    // Skills
    const addSkill = () => {
        const s = skillInput.trim()
        if (s && !form.skills.includes(s)) {
            set('skills', [...form.skills, s])
            setSkillInput('')
        }
    }
    const removeSkill = (s) => set('skills', form.skills.filter(x => x !== s))

    // Experience
    const addExp = () => set('experience', [...form.experience, { company: '', role: '', from: '', to: '' }])
    const updateExp = (i, k, v) => {
        const updated = form.experience.map((e, idx) => idx === i ? { ...e, [k]: v } : e)
        set('experience', updated)
    }
    const removeExp = (i) => set('experience', form.experience.filter((_, idx) => idx !== i))

    // Education
    const addEdu = () => set('education', [...form.education, { institution: '', degree: '', year: '' }])
    const updateEdu = (i, k, v) => {
        const updated = form.education.map((e, idx) => idx === i ? { ...e, [k]: v } : e)
        set('education', updated)
    }
    const removeEdu = (i) => set('education', form.education.filter((_, idx) => idx !== i))

    const handleSave = async () => {
        setSaving(true)
        await new Promise(r => setTimeout(r, 600))
        updateUserProfile(user.id, form)
        updateUser(form)
        toast.success('Profile updated successfully! ✅')
        setSaving(false)
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="section-title">Edit Profile</h1>
                <p className="section-subtitle">Keep your profile up-to-date to stand out</p>
            </motion.div>

            <div className="space-y-6">
                {/* Avatar preview */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
                    <h2 className="font-bold text-surface-900 dark:text-white mb-4">Profile Photo</h2>
                    <div className="flex items-center gap-5">
                        <img
                            src={isEmployer ? form.logo : form.avatar}
                            alt="Avatar"
                            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary-200 dark:ring-primary-800"
                            onError={e => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=6366f1&color=fff`}
                        />
                        <div className="flex-1">
                            <label className="label">{isEmployer ? 'Logo URL' : 'Avatar URL'}</label>
                            <input
                                value={isEmployer ? form.logo : form.avatar}
                                onChange={e => set(isEmployer ? 'logo' : 'avatar', e.target.value)}
                                placeholder="https://example.com/photo.jpg"
                                className="input"
                            />
                            <p className="text-xs text-surface-400 mt-1">Paste any image URL or use a service like ui-avatars.com</p>
                        </div>
                    </div>
                </motion.div>

                {/* Basic Info */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-6">
                    <h2 className="font-bold text-surface-900 dark:text-white mb-4">Basic Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">{isEmployer ? 'Company Name' : 'Full Name'}</label>
                            <input value={isEmployer ? form.companyName : form.name}
                                onChange={e => set(isEmployer ? 'companyName' : 'name', e.target.value)}
                                className="input" placeholder={isEmployer ? 'Acme Corp.' : 'Jane Smith'} />
                        </div>
                        {!isEmployer && (
                            <div>
                                <label className="label">Professional Title</label>
                                <input value={form.title} onChange={e => set('title', e.target.value)}
                                    className="input" placeholder="Senior React Developer" />
                            </div>
                        )}
                        <div>
                            <label className="label">Location</label>
                            <input value={form.location} onChange={e => set('location', e.target.value)}
                                className="input" placeholder="New York, NY" />
                        </div>
                        {isEmployer && (
                            <div>
                                <label className="label">Website</label>
                                <input value={form.website} onChange={e => set('website', e.target.value)}
                                    className="input" placeholder="https://yourcompany.com" />
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="label">{isEmployer ? 'Company Description' : 'Bio / About'}</label>
                        <textarea
                            value={isEmployer ? form.description : form.bio}
                            onChange={e => set(isEmployer ? 'description' : 'bio', e.target.value)}
                            rows={4}
                            className="input resize-none"
                            placeholder={isEmployer
                                ? 'What does your company do? What is your culture like?'
                                : 'Tell employers about yourself, your experience, and what you\'re looking for...'}
                        />
                    </div>
                </motion.div>

                {/* Skills (seeker only) */}
                {!isEmployer && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                        <h2 className="font-bold text-surface-900 dark:text-white mb-4">Skills</h2>
                        <div className="flex gap-2 mb-4">
                            <input
                                value={skillInput}
                                onChange={e => setSkillInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                className="input flex-1"
                                placeholder="Type a skill and press Enter"
                            />
                            <button onClick={addSkill} className="btn-primary btn gap-1"><Plus size={15} /> Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {form.skills.map(s => (
                                <span key={s} className="chip gap-2">
                                    {s}
                                    <button onClick={() => removeSkill(s)} className="hover:text-danger transition-colors"><X size={12} /></button>
                                </span>
                            ))}
                            {form.skills.length === 0 && <p className="text-sm text-surface-400">No skills added yet.</p>}
                        </div>
                    </motion.div>
                )}

                {/* Experience (seeker only) */}
                {!isEmployer && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-surface-900 dark:text-white flex items-center gap-2"><Briefcase size={18} className="text-primary-500" />Work Experience</h2>
                            <button onClick={addExp} className="btn-secondary btn-sm btn gap-1"><Plus size={13} /> Add</button>
                        </div>
                        {form.experience.length === 0 && <p className="text-sm text-surface-400">No experience added yet.</p>}
                        <div className="space-y-4">
                            {form.experience.map((exp, i) => (
                                <div key={i} className="p-4 bg-surface-50 dark:bg-surface-900/50 rounded-xl relative">
                                    <button onClick={() => removeExp(i)} className="absolute top-3 right-3 text-surface-400 hover:text-danger transition-colors"><X size={14} /></button>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <div><label className="label text-xs">Job Title</label><input value={exp.role} onChange={e => updateExp(i, 'role', e.target.value)} className="input" placeholder="Software Engineer" /></div>
                                        <div><label className="label text-xs">Company</label><input value={exp.company} onChange={e => updateExp(i, 'company', e.target.value)} className="input" placeholder="Google" /></div>
                                        <div><label className="label text-xs">From</label><input value={exp.from} onChange={e => updateExp(i, 'from', e.target.value)} className="input" placeholder="2020" /></div>
                                        <div><label className="label text-xs">To (leave blank if current)</label><input value={exp.to} onChange={e => updateExp(i, 'to', e.target.value)} className="input" placeholder="2024 or Present" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Education (seeker only) */}
                {!isEmployer && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-surface-900 dark:text-white flex items-center gap-2"><GraduationCap size={18} className="text-purple-500" />Education</h2>
                            <button onClick={addEdu} className="btn-secondary btn-sm btn gap-1"><Plus size={13} /> Add</button>
                        </div>
                        {form.education.length === 0 && <p className="text-sm text-surface-400">No education added yet.</p>}
                        <div className="space-y-4">
                            {form.education.map((edu, i) => (
                                <div key={i} className="p-4 bg-surface-50 dark:bg-surface-900/50 rounded-xl relative">
                                    <button onClick={() => removeEdu(i)} className="absolute top-3 right-3 text-surface-400 hover:text-danger transition-colors"><X size={14} /></button>
                                    <div className="grid sm:grid-cols-3 gap-3">
                                        <div><label className="label text-xs">Institution</label><input value={edu.institution} onChange={e => updateEdu(i, 'institution', e.target.value)} className="input" placeholder="Harvard University" /></div>
                                        <div><label className="label text-xs">Degree</label><input value={edu.degree} onChange={e => updateEdu(i, 'degree', e.target.value)} className="input" placeholder="B.Sc. Computer Science" /></div>
                                        <div><label className="label text-xs">Year</label><input value={edu.year} onChange={e => updateEdu(i, 'year', e.target.value)} className="input" placeholder="2022" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Save button */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <button
                        id="save-profile"
                        onClick={handleSave}
                        disabled={saving}
                        className="btn-primary btn btn-lg w-full gap-2"
                    >
                        {saving ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                                Saving...
                            </span>
                        ) : <><Save size={18} /> Save Changes</>}
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
