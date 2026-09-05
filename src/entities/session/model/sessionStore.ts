import { create } from "zustand";
import { persist } from 'zustand/middleware'
import type { SessionState } from './types'

export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            token: null,

            login: (token: string) => {
                set({ token })
            },

            logout: () => {
                set({ token: null })
            },
        }),
        {
            name: "session",
        },
    ),
)