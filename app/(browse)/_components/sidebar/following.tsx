'use client'

import { Follow, Stream, User } from '@prisma/client'
import { useSidebar } from '@/store/use-sidebar'
import { UserItem } from '@/app/(browse)/_components/sidebar/user-item'

interface FollowingProps {
    data: (Follow & { following: User & { stream: Stream | null } })[]
}

export const Following = ({ data }: FollowingProps) => {
    const { collapsed } = useSidebar((state) => state)

    if (!data.length) {
        return null
    }
    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            )}
            <ul className={'space-y-2 px-2'}>
                {data.map((follow) => (
                    <UserItem
                        username={follow.following.username}
                        imageUrl={follow.following.imageUrl}
                        key={follow.following.id}
                        isLive={follow.following.stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    )
}
