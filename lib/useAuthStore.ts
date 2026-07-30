import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'TENANT' | 'LANDLORD' | 'ADMIN';

interface UserInterface {
    id: string,
    name: string,
    email: string,
    role: UserRole
}

interface AuthState {
    user: UserInterface | null
    setUser: (user: UserInterface | null) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        { name: 'rentnest-auth-store' }
    )
)
