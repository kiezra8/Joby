import { clsx } from 'clsx'

/** Merge class names conditionally */
export function cn(...args) {
    return clsx(...args)
}

/** Format a salary range */
export function formatSalary(salary) {
    if (!salary) return 'Salary not specified'
    const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: salary.currency || 'USD', maximumFractionDigits: 0 }).format(n)
    return `${fmt(salary.min)} – ${fmt(salary.max)}`
}

/** Format relative time */
export function timeAgo(dateStr) {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now - date
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days === 1) return 'Yesterday'
    if (days < 30) return `${days}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** Generate a unique ID */
export function genId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

/** Validate email */
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** Truncate text */
export function truncate(text, length = 120) {
    if (!text) return ''
    return text.length > length ? text.slice(0, length) + '...' : text
}

/** Get initials from a name */
export function getInitials(name = '') {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

/** Get category color classes */
export function getCategoryColor(categoryId) {
    const map = {
        tech: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        healthcare: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        finance: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        education: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
        engineering: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
        marketing: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
        design: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        legal: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
        hospitality: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
        construction: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
        sales: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
        remote: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    }
    return map[categoryId] || 'bg-surface-100 text-surface-700'
}

/** Get job type badge color */
export function getTypeColor(type) {
    const map = {
        'full-time': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        'part-time': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
        'contract': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        'freelance': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        'internship': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    }
    return map[type] || 'bg-surface-100 text-surface-600'
}

/** Application status config */
export function getStatusConfig(status) {
    const map = {
        pending: { label: 'Pending', color: 'badge-warning' },
        accepted: { label: 'Accepted', color: 'badge-success' },
        rejected: { label: 'Rejected', color: 'badge-danger' },
    }
    return map[status] || { label: status, color: 'badge-neutral' }
}
