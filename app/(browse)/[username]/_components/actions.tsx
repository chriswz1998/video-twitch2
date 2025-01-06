'use client'

import { Button } from '@/components/ui/button'
import { onFollow, onUnFollow } from '@/actions/follow'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { onBlock, onUnBlock } from '@/actions/block'

interface ActionsProps {
    isFollowing: boolean
    isBlocked: boolean
    userId: string
}

export const Actions = ({ isFollowing, isBlocked, userId }: ActionsProps) => {
    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnFollow(userId)
                .then((data) => toast.success(`You are not following ${data.following.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`Blocked the user ${data.blocked.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow()
        } else {
            handleFollow()
        }
    }

    return (
        <>
            <Button disabled={isPending} onClick={onClick} variant="primary">
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
            <Button disabled={isPending} onClick={handleBlock} variant="primary">
                handleBlock
            </Button>
        </>
    )
}
