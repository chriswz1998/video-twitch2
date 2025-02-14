'use client'

import { Stream } from '@prisma/client'
import { Switch } from '@/components/ui/switch'
import { useTransition } from 'react'
import { updateStream } from '@/actions/stream'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

interface ToggleCardProps {
    field: FieldTypes
    label: string
    value: boolean
}

export const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition()

    const onChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success('chat settings updated!'))
                .catch(() => toast.error('something went wrong!'))
        })
    }

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">{label}</p>
                <div className="space-y-2">
                    <Switch disabled={isPending} checked={value} onCheckedChange={onChange}>
                        {value ? 'on' : 'off'}
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export const ToggleCardSkeleton = () => <Skeleton className="rounded-xl p-10 w-full" />
