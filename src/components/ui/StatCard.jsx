/**
 * StatCard – dashboard summary card with icon, value, and trend.
 */
import { motion } from 'framer-motion'

export default function StatCard({ icon, label, value, trend, color = 'primary', index = 0 }) {
    const colorMap = {
        primary: 'from-primary-500 to-primary-600',
        accent: 'from-accent-500 to-accent-600',
        success: 'from-green-500 to-green-600',
        warning: 'from-amber-500 to-amber-600',
        danger: 'from-red-500 to-red-600',
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="card p-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400 font-medium">{label}</p>
                    <p className="text-3xl font-bold text-surface-900 dark:text-white mt-1 font-display">{value}</p>
                    {trend !== undefined && (
                        <p className={`text-xs mt-1 font-medium ${trend >= 0 ? 'text-success' : 'text-danger'}`}>
                            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% this month
                        </p>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-white shadow-glow`}>
                    {icon}
                </div>
            </div>
        </motion.div>
    )
}
