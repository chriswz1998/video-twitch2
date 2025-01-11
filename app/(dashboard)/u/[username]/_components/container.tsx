'use client'

import { ReactNode, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@uidotdev/usehooks'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

export const Container = ({ children }: { children: ReactNode }) => {
    const { collapsed, onCollapse, onExpand } = useCreatorSidebar((state) => state)
    const matches = useMediaQuery('only screen and (max-width: 1024px)')

    useEffect(() => {
        if (matches) {
            onCollapse()
        } else {
            onExpand()
        }
    }, [matches, onCollapse, onExpand])

    return (
        <div className={cn('flex-1', collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}>
            {children}
        </div>
    )
}
