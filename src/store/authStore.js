/**
 * Global Zustand store for authentication state.
 * Uses localStorage for persistence.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: (user, token) => {
                set({ user, token, isAuthenticated: true })
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false })
            },

            updateUser: (updatedFields) => {
                set(state => ({
                    user: { ...state.user, ...updatedFields }
                }))
            },
        }),
        {
            name: 'joby-auth',
        }
    )
)
