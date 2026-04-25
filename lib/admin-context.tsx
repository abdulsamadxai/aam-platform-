'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface AdminContextType {
    isAdmin: boolean
    isEditMode: boolean
    toggleEdit: () => void
    login: () => void
    logout: () => void
    currentPath: string
}

const AdminContext = createContext<AdminContextType>({
    isAdmin: false,
    isEditMode: false,
    toggleEdit: () => {},
    login: () => {},
    logout: () => {},
    currentPath: '',
})

export function AdminProvider({ children }: { children: ReactNode }) {
    const [isMounted, setIsMounted] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEditMode, setEditMode] = useState(false)
    const router = useRouter()
    const currentPath = usePathname() ?? ''

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
        setIsMounted(true)

        async function checkAdminStatus() {
            try {
                const supabase = createClient()
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                    const adminUser = user.app_metadata?.role === 'admin'
                    setIsAdmin(adminUser)
                }
            } catch {
                setIsAdmin(false)
            }
        }

        checkAdminStatus()
    }, [])

    const toggleEdit = () => {
        if (isAdmin) {
            setEditMode(prev => !prev)
        }
    }

    const login = () => {
        setIsAdmin(true)
    }

    const logout = async () => {
        try {
            const supabase = createClient()
            await supabase.auth.signOut()
        } catch {
            // ignore sign-out errors
        } finally {
            setIsAdmin(false)
            setEditMode(false)
            router.push('/')
        }
    }

    return (
        <AdminContext.Provider value={{
            isAdmin: isMounted ? isAdmin : false,
            isEditMode: isMounted ? isEditMode : false,
            toggleEdit,
            login,
            logout,
            currentPath
        }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)
