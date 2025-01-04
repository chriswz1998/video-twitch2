'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, X } from 'lucide-react'
import qs from 'query-string'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export const Search = () => {
    const router = useRouter()
    const [value, setValue] = useState('')

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!value) return
        const url = qs.stringifyUrl(
            {
                url: '/search',
                query: { term: value }
            },
            { skipEmptyString: true }
        )
        router.push(url)
    }

    const onClear = () => {
        setValue('')
    }
    return (
        <form
            className={'relative w-full lg:w-[400px] flex p-2 items-center rounded'}
            onSubmit={onSubmit}
        >
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={'search'}
                className={
                    'rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
                }
            />
            {value && (
                <X
                    className={
                        'absolute top-4.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition'
                    }
                    onClick={onClear}
                />
            )}
            <Button type="submit" variant={'secondary'} size="sm" className={'rounded-l-none'}>
                <SearchIcon className={'h-5 w-5 text-muted-foreground'} />
            </Button>
        </form>
    )
}
