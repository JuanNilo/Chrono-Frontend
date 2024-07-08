import { create } from 'zustand'
import {persist} from 'zustand/middleware'

interface UserState {
    id_user: number
    email_user: string
    role_user: string

    setIdUser: (id_user: number) => void
    setEmailUser: (email_user: string) => void
    setRoleUser: (role_user: string) => void

    clearUser: () => void
}

export const useUserStore = create<UserState>()(
 
        persist(
            (set) => ({
                id_user: -1,
                email_user: '',
                role_user: '',

                setIdUser: (id_user) => set({ id_user }),
                setEmailUser: (email_user) => set({ email_user }),
                setRoleUser: (role_user) => set({ role_user }),

                clearUser: () => set({ id_user: -1, email_user: '', role_user: '' }),
            }),
            {
                name: 'user-storage',
            },
        ),
    )

