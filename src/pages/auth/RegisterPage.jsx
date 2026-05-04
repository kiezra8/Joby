/**
 * RegisterPage – sign-up for seeker or employer with role selection.
 */
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Building2, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'
import { genId, isValidEmail } from '../../utils/helpers'
import toast from 'react-hot-toast'

export default function RegisterPage() {
    const [params] = useSearchParams()
    const [role, setRole] = useState(params.get('role') || 'seeker')
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [showPw, setShowPw] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const { login } = useAuthStore()
    const { registerUser, getUserByEmail } = useAppStore()
    const navigate = useNavigate()

    const handleChange = e => {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
        if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
    }

    const validate = () => {
        const errs = {}
        if (!form.name.trim()) errs.name = 'Name is required.'
        if (!isValidEmail(form.email)) errs.email = 'Enter a valid email.'
        if (getUserByEmail(form.email.trim().toLowerCase())) errs.email = 'Email already registered.'
        if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.'
        if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.'
        return errs
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        setLoading(true)
        await new Promise(r => setTimeout(r, 700))

        const newUser = {
            id: genId(role === 'employer' ? 'emp' : 'seek'),
            email: form.email.trim().toLowerCase(),
            password: form.password,
            role,
            name: form.name.trim(),
            ...(role === 'employer'
                ? {
                    companyName: form.name.trim(),
                    logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=6366f1&color=fff&size=128`,
                    description: '',
                    verified: false,
                    rating: 0,
                    reviewCount: 0,
                }
                : {
                    title: '',
                    bio: '',
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=818cf8&color=fff&size=128`,
                    skills: [],
                    experience: [],
                    education: [],
                    verified: false,
                    rating: 0,
                    reviewCount: 0,
                    cvUrl: null,
                    portfolioImages: [],
                }
            ),
            createdAt: new Date().toISOString(),
        }

        registerUser(newUser)
        login(newUser, `jwt-token-${newUser.id}`)
        toast.success(`Account created! Welcome to JOBY, ${newUser.name.split(' ')[0]} 🚀`)
        navigate('/profile/edit')
        setLoading(false)
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <div className="card p-8 shadow-card-hover">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-glow mb-4">
                            <Briefcase size={26} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-black font-display text-surface-900 dark:text-white">Create your account</h1>
                        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Join 180K+ professionals on JOBY</p>
                    </div>

                    {/* Role selector */}
                    <div className="grid grid-cols-2 gap-3 mb-8 p-1 bg-surface-100 dark:bg-surface-900 rounded-2xl">
                        <button
                            type="button"
                            onClick={() => setRole('seeker')}
                            className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-sm font-semibold transition-all ${role === 'seeker'
                                    ? 'bg-white dark:bg-surface-800 text-primary-600 shadow-sm'
                                    : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                                }`}
                        >
                            <User size={18} /> Job Seeker
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('employer')}
                            className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-sm font-semibold transition-all ${role === 'employer'
                                    ? 'bg-white dark:bg-surface-800 text-primary-600 shadow-sm'
                                    : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                                }`}
                        >
                            <Building2 size={18} /> Employer
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label">{role === 'employer' ? 'Company Name' : 'Full Name'}</label>
                            <div className="relative">
                                {role === 'employer' ? (
                                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                                ) : (
                                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                                )}
                                <input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder={role === 'employer' ? 'Acme Corp.' : 'Jane Smith'}
                                    className={`input pl-10 ${errors.name ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.name && <p className="error-msg"><AlertCircle size={12} />{errors.name}</p>}
                        </div>

                        <div>
                            <label className="label">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                                <input
                                    id="reg-email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.email && <p className="error-msg"><AlertCircle size={12} />{errors.email}</p>}
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                                <input
                                    id="reg-password"
                                    name="password"
                                    type={showPw ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="At least 6 characters"
                                    className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                                />
                                <button type="button" onClick={() => setShowPw(s => !s)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400">
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="error-msg"><AlertCircle size={12} />{errors.password}</p>}
                        </div>

                        <div>
                            <label className="label">Confirm Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                                <input
                                    id="confirm-password"
                                    name="confirmPassword"
                                    type={showPw ? 'text' : 'password'}
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`input pl-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.confirmPassword && <p className="error-msg"><AlertCircle size={12} />{errors.confirmPassword}</p>}
                        </div>

                        <button
                            id="register-submit"
                            type="submit"
                            disabled={loading}
                            className="btn-primary btn w-full btn-lg mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                                    Creating account...
                                </span>
                            ) : `Create ${role === 'employer' ? 'Employer' : 'Seeker'} Account`}
                        </button>
                    </form>

                    <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Sign in</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
