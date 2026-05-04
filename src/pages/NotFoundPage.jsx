/**
 * NotFoundPage – 404 error page with navigation.
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Briefcase } from 'lucide-react'

export default function NotFoundPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md"
            >
                {/* Animated number */}
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-9xl font-black font-display text-gradient mb-4 select-none"
                >
                    404
                </motion.div>

                <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">
                    Page not found
                </h1>
                <p className="text-surface-500 dark:text-surface-400 mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/" className="btn-primary btn btn-lg gap-2">
                        <Home size={18} /> Go Home
                    </Link>
                    <Link to="/jobs" className="btn-secondary btn btn-lg gap-2">
                        <Briefcase size={18} /> Browse Jobs
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
