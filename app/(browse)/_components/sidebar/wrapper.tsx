'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useSidebar } from '@/store/use-sidebar'
import { cn } from '@/lib/utils'
import { ToggleSkeleton } from '@/app/(browse)/_components/sidebar/toggle'
import { RecommendedSkeleton } from '@/app/(browse)/_components/sidebar/recommended'

interface WrapperProps {
    children: ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    const [isClient, setIsClient] = useState<boolean>(false)
    const { collapsed } = useSidebar((state) => state)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient)
        return (
            <aside className="fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50">
                <ToggleSkeleton />
                <RecommendedSkeleton />
            </aside>
        )

    return (
        <aside
            className={cn(
                'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50',
                collapsed && 'w-[70px]'
            )}
        >
            {children}
        </aside>
    )
}
