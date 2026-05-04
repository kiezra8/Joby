/**
 * Zustand store for jobs, applications, notifications.
 * Simulates a full backend with localStorage persistence.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DUMMY_JOBS, DUMMY_USERS } from '../data/dummyData'

export const useAppStore = create(
    persist(
        (set, get) => ({
            // ─── Jobs ────────────────────────────────────────────────────────────
            jobs: DUMMY_JOBS,

            addJob: (job) => {
                set(state => ({ jobs: [job, ...state.jobs] }))
            },

            updateJob: (jobId, updates) => {
                set(state => ({
                    jobs: state.jobs.map(j => j.id === jobId ? { ...j, ...updates } : j)
                }))
            },

            deleteJob: (jobId) => {
                set(state => ({ jobs: state.jobs.filter(j => j.id !== jobId) }))
            },

            getJobById: (jobId) => {
                return get().jobs.find(j => j.id === jobId)
            },

            getJobsByEmployer: (employerId) => {
                return get().jobs.filter(j => j.employerId === employerId)
            },

            // ─── Applications ─────────────────────────────────────────────────────
            applications: [],

            applyToJob: (application) => {
                const exists = get().applications.find(
                    a => a.jobId === application.jobId && a.seekerId === application.seekerId
                )
                if (exists) return false
                set(state => ({
                    applications: [application, ...state.applications],
                }))
                // auto-notify seeker
                get().addNotification({
                    id: `notif-${Date.now()}`,
                    userId: application.seekerId,
                    type: 'application_submitted',
                    message: `Your application for "${application.jobTitle}" has been submitted successfully.`,
                    read: false,
                    createdAt: new Date().toISOString(),
                    jobId: application.jobId,
                })
                return true
            },

            updateApplicationStatus: (applicationId, status, employerId) => {
                const app = get().applications.find(a => a.id === applicationId)
                if (!app) return
                set(state => ({
                    applications: state.applications.map(a =>
                        a.id === applicationId ? { ...a, status } : a
                    )
                }))
                const label = status === 'accepted' ? 'accepted' : 'rejected'
                get().addNotification({
                    id: `notif-${Date.now()}-${Math.random()}`,
                    userId: app.seekerId,
                    type: status === 'accepted' ? 'application_accepted' : 'application_rejected',
                    message: `Your application for "${app.jobTitle}" has been ${label} by the employer.`,
                    read: false,
                    createdAt: new Date().toISOString(),
                    jobId: app.jobId,
                })
            },

            getApplicationsBySeeker: (seekerId) => {
                return get().applications.filter(a => a.seekerId === seekerId)
            },

            getApplicationsByJob: (jobId) => {
                return get().applications.filter(a => a.jobId === jobId)
            },

            // ─── Users / Profiles ─────────────────────────────────────────────────
            users: DUMMY_USERS,

            registerUser: (userObj) => {
                set(state => ({ users: [...state.users, userObj] }))
            },

            updateUserProfile: (userId, updates) => {
                set(state => ({
                    users: state.users.map(u => u.id === userId ? { ...u, ...updates } : u)
                }))
            },

            getUserById: (userId) => {
                return get().users.find(u => u.id === userId)
            },

            getUserByEmail: (email) => {
                return get().users.find(u => u.email === email)
            },

            // ─── Notifications ────────────────────────────────────────────────────
            notifications: [],

            addNotification: (notif) => {
                set(state => ({
                    notifications: [notif, ...state.notifications]
                }))
            },

            markNotificationRead: (notifId) => {
                set(state => ({
                    notifications: state.notifications.map(n =>
                        n.id === notifId ? { ...n, read: true } : n
                    )
                }))
            },

            markAllRead: (userId) => {
                set(state => ({
                    notifications: state.notifications.map(n =>
                        n.userId === userId ? { ...n, read: true } : n
                    )
                }))
            },

            getNotificationsByUser: (userId) => {
                return get().notifications.filter(n => n.userId === userId)
            },

            // ─── Chat ─────────────────────────────────────────────────────────────
            messages: [],

            sendMessage: (msg) => {
                set(state => ({ messages: [...state.messages, msg] }))
            },

            getConversation: (userAId, userBId) => {
                return get().messages.filter(
                    m => (m.senderId === userAId && m.receiverId === userBId) ||
                        (m.senderId === userBId && m.receiverId === userAId)
                )
            },

            // ─── Reviews ──────────────────────────────────────────────────────────
            reviews: [],

            addReview: (review) => {
                set(state => ({ reviews: [...state.reviews, review] }))
            },

            getReviewsForUser: (userId) => {
                return get().reviews.filter(r => r.targetId === userId)
            },
        }),
        {
            name: 'joby-app-data',
            partialize: (state) => ({
                jobs: state.jobs,
                applications: state.applications,
                users: state.users,
                notifications: state.notifications,
                messages: state.messages,
                reviews: state.reviews,
            }),
        }
    )
)
