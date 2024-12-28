'use client'

import { ReactNode } from 'react'
import { useSidebar } from '@/store/use-sidebar'
import { cn } from '@/lib/utils'

interface WrapperProps {
    children: ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    const { collapsed } = useSidebar((state) => state)
    return (
        <aside
            className={cn(
                'fixed bg-blue-50 left-0 flex flex-col w-60 h-full border-r z-50',
                collapsed && 'w-[70px]'
            )}
        >
            {children}
        </aside>
    )
}
