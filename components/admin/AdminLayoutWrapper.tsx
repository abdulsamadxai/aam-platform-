'use client'

import { useAdmin } from '@/lib/admin-context'
import { ReactNode } from 'react'
import { AdminToolbar } from './AdminToolbar'
import { Toaster } from 'react-hot-toast'

export function AdminLayoutWrapper({ children }: { children: ReactNode }) {
    const { isAdmin } = useAdmin()

    return (
        <div className={isAdmin ? 'pt-[44px]' : ''}>
            <AdminToolbar />
            {children}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#0a0a0a',
                        color: '#fff',
                        border: '1px solid #222',
                        borderRadius: '0px',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 'bold',
                    },
                }}
            />
        </div>
    )
}
