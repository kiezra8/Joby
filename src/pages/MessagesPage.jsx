/**
 * MessagesPage – simple real-time-like chat between users.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageSquare, Search } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useAppStore } from '../store/appStore'
import { genId, timeAgo, getInitials } from '../utils/helpers'
import { Link } from 'react-router-dom'

export default function MessagesPage() {
    const { user } = useAuthStore()
    const { users, messages, sendMessage, getConversation } = useAppStore()
    const [search, setSearch] = useState('')
    const [activeId, setActiveId] = useState(null)
    const [input, setInput] = useState('')

    // Contacts = all users except me
    const contacts = users.filter(u => u.id !== user?.id && (
        !search || u.name.toLowerCase().includes(search.toLowerCase())
    ))

    const activeUser = users.find(u => u.id === activeId)
    const convo = activeId ? getConversation(user.id, activeId) : []

    const handleSend = (e) => {
        e.preventDefault()
        if (!input.trim() || !activeId) return
        sendMessage({
            id: genId('msg'),
            senderId: user.id,
            receiverId: activeId,
            text: input.trim(),
            sentAt: new Date().toISOString(),
        })
        setInput('')
    }

    // Last message snippet per contact
    const lastMsg = (contactId) => {
        const cv = getConversation(user.id, contactId)
        return cv[cv.length - 1]
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                <h1 className="section-title">Messages</h1>
            </motion.div>

            <div className="card overflow-hidden" style={{ height: '70vh' }}>
                <div className="flex h-full">
                    {/* Sidebar */}
                    <div className="w-72 border-r border-surface-200 dark:border-surface-700 flex flex-col">
                        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                            <div className="relative">
                                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search contacts..."
                                    className="input pl-9 text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {contacts.length === 0 ? (
                                <p className="text-center text-sm text-surface-400 py-8">No contacts found</p>
                            ) : (
                                contacts.map(contact => {
                                    const last = lastMsg(contact.id)
                                    return (
                                        <button
                                            key={contact.id}
                                            onClick={() => setActiveId(contact.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors ${activeId === contact.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                                        >
                                            <div className="relative shrink-0">
                                                {contact.avatar || contact.logo ? (
                                                    <img src={contact.avatar || contact.logo} alt={contact.name}
                                                        className="w-10 h-10 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                                                        {getInitials(contact.name)}
                                                    </div>
                                                )}
                                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white dark:border-surface-900" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between">
                                                    <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">{contact.name}</p>
                                                    {last && <span className="text-[10px] text-surface-400 shrink-0">{timeAgo(last.sentAt)}</span>}
                                                </div>
                                                <p className="text-xs text-surface-400 truncate">
                                                    {last ? last.text : <span className="italic">Start a conversation</span>}
                                                </p>
                                            </div>
                                        </button>
                                    )
                                })
                            )}
                        </div>
                    </div>

                    {/* Chat area */}
                    <div className="flex-1 flex flex-col">
                        {activeId && activeUser ? (
                            <>
                                {/* Header */}
                                <div className="flex items-center gap-3 px-6 py-4 border-b border-surface-200 dark:border-surface-700">
                                    <Link to={`/profile/${activeUser.id}`}>
                                        <img src={activeUser.avatar || activeUser.logo}
                                            alt={activeUser.name}
                                            className="w-9 h-9 rounded-full object-cover hover:ring-2 hover:ring-primary-400 transition-all" />
                                    </Link>
                                    <div>
                                        <p className="font-semibold text-sm text-surface-900 dark:text-white">{activeUser.name}</p>
                                        <p className="text-xs text-success">● Online</p>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                                    {convo.length === 0 ? (
                                        <div className="text-center py-12">
                                            <MessageSquare size={32} className="mx-auto text-surface-300 dark:text-surface-600 mb-2" />
                                            <p className="text-sm text-surface-400">Send a message to start the conversation</p>
                                        </div>
                                    ) : (
                                        convo.map(msg => {
                                            const isMe = msg.senderId === user.id
                                            return (
                                                <motion.div
                                                    key={msg.id}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className={`max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl text-sm ${isMe
                                                            ? 'bg-primary-600 text-white rounded-br-md'
                                                            : 'bg-surface-100 dark:bg-surface-700 text-surface-900 dark:text-surface-100 rounded-bl-md'
                                                        }`}>
                                                        <p>{msg.text}</p>
                                                        <p className={`text-[10px] mt-0.5 ${isMe ? 'text-primary-200' : 'text-surface-400'}`}>
                                                            {timeAgo(msg.sentAt)}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )
                                        })
                                    )}
                                </div>

                                {/* Input */}
                                <form onSubmit={handleSend} className="p-4 border-t border-surface-200 dark:border-surface-700 flex gap-3">
                                    <input
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="input flex-1"
                                    />
                                    <button type="submit" className="btn-primary btn w-10 h-10 p-0 rounded-xl" disabled={!input.trim()}>
                                        <Send size={16} />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                                <MessageSquare size={48} className="text-surface-300 dark:text-surface-600 mb-4" />
                                <h3 className="font-semibold text-surface-700 dark:text-surface-300 mb-1">Your Messages</h3>
                                <p className="text-sm text-surface-400">Select a contact to start chatting</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
