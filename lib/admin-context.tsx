'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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
    toggleEdit: () => { },
    login: () => { },
    logout: () => { },
    currentPath: '',
})

export function AdminProvider({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEditMode, setEditMode] = useState(false)
    const [currentPath, setCurrentPath] = useState('')

    useEffect(() => {
        // Detect admin mode from localStorage, URL parameter ?admin=true, or path starting with /admin
        const checkAdmin = () => {
            const params = new URLSearchParams(window.location.search)
            const path = window.location.pathname
            const isAdminByParam = params.get('admin') === 'true'
            const isAdminByPath = path.startsWith('/admin')
            const isAdminByStorage = localStorage.getItem('aam_admin_session') === 'true'

            setIsAdmin(isAdminByParam || isAdminByPath || isAdminByStorage)
            setCurrentPath(path)
        }

        checkAdmin()

        // Also listen for popstate (navigation)
        window.addEventListener('popstate', checkAdmin)
        return () => window.removeEventListener('popstate', checkAdmin)
    }, [])

    const toggleEdit = () => {
        if (isAdmin) {
            setEditMode(prev => !prev)
        }
    }

    const login = () => {
        localStorage.setItem('aam_admin_session', 'true')
        setIsAdmin(true)
    }

    const logout = () => {
        localStorage.removeItem('aam_admin_session')
        setIsAdmin(false)
        setEditMode(false)
        window.location.href = '/' // Force fresh reload to home
    }

    return (
        <AdminContext.Provider value={{ isAdmin, isEditMode, toggleEdit, login, logout, currentPath }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)
