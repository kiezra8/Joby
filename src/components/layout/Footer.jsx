import { Link } from 'react-router-dom'
import { Briefcase, Twitter, Linkedin, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const links = {
        platform: [
            { label: 'Browse Jobs', to: '/jobs' },
            { label: 'Companies', to: '/jobs' },
            { label: 'Pricing', to: '#' },
            { label: 'Post a Job', to: '/post-job' },
        ],
        support: [
            { label: 'Help Center', to: '#' },
            { label: 'Safety Center', to: '#' },
            { label: 'Community', to: '#' },
            { label: 'Contact Us', to: '#' },
        ],
        legal: [
            { label: 'Privacy Policy', to: '#' },
            { label: 'Terms of Service', to: '#' },
            { label: 'Cookie Policy', to: '#' },
            { label: 'GDPR', to: '#' },
        ],
    }

    return (
        <footer className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">

                    {/* Brand */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2.5 mb-6 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
                                <Briefcase size={20} className="text-white" />
                            </div>
                            <span className="text-2xl font-black font-display text-surface-900 dark:text-white tracking-tight">
                                JO<span className="text-gradient">BY</span>
                            </span>
                        </Link>
                        <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed max-w-sm">
                            The world's most premium marketplace for top-tier talent and world-class employers.
                            Connecting the best with the best, beautifully.
                        </p>
                        <div className="flex gap-4 mt-6">
                            {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-wider mb-6">Platform</h4>
                        <ul className="space-y-4">
                            {links.platform.map(l => (
                                <li key={l.label}>
                                    <Link to={l.to} className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-wider mb-6">Support</h4>
                        <ul className="space-y-4">
                            {links.support.map(l => (
                                <li key={l.label}>
                                    <Link to={l.to} className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-wider mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-2 text-sm text-surface-500 dark:text-surface-400">
                                <MapPin size={14} className="mt-1 shrink-0 text-primary-500" />
                                <span>123 Design St, Silicon Valley, CA 94025</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
                                <Mail size={14} className="shrink-0 text-primary-500" />
                                <span>support@joby.io</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
                                <Phone size={14} className="shrink-0 text-primary-500" />
                                <span>+1 (555) 000-0000</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-surface-400">
                        © {currentYear} JOBY Technologies Inc. All rights reserved. Made with ❤️ for the future of work.
                    </p>
                    <div className="flex gap-6">
                        {links.legal.map(l => (
                            <Link key={l.label} to={l.to} className="text-xs text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
