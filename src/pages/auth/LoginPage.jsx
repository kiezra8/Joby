/**
 * LoginPage – email/password sign in with role detection.
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Briefcase, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { login } = useAuthStore()
    const { getUserByEmail } = useAppStore()
    const navigate = useNavigate()

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
        setLoading(true)
        await new Promise(r => setTimeout(r, 600)) // simulate network
        const user = getUserByEmail(form.email.trim().toLowerCase())
        if (!user || user.password !== form.password) {
            setError('Invalid email or password. Try: alice@example.com / password')
            setLoading(false)
            return
        }
        login(user, `jwt-token-${user.id}`)
        toast.success(`Welcome back, ${user.name.split(' ')[0]}! 🎉`)
        navigate('/dashboard')
        setLoading(false)
    }

    // Quick-fill demo accounts
    const demoAccounts = [
        { label: 'Job Seeker', email: 'alice@example.com' },
        { label: 'Employer', email: 'hr@techcorp.io' },
    ]

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                {/* Card */}
                <div className="card p-8 shadow-card-hover">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-glow mb-4">
                            <Briefcase size={26} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-black font-display text-surface-900 dark:text-white">Welcome back</h1>
                        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Sign in to your JOBY account</p>
                    </div>

                    {/* Demo quick-fill */}
                    <div className="flex gap-2 mb-6">
                        {demoAccounts.map(d => (
                            <button
                                key={d.email}
                                type="button"
                                onClick={() => setForm({ email: d.email, password: 'password' })}
                                className="flex-1 py-1.5 text-xs font-medium rounded-lg border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                            >
                                Demo {d.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-200 dark:border-surface-700" /></div>
                        <div className="relative flex justify-center"><span className="bg-white dark:bg-surface-800 px-3 text-xs text-surface-400">or sign in manually</span></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-danger">
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />{error}
                            </div>
                        )}

                        <div>
                            <label className="label">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="input pl-10"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPw ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="input pl-10 pr-10"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(s => !s)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                                >
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="btn-primary btn w-full btn-lg mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                            Create one free
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
