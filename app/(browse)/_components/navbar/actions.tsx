import { currentUser } from '@clerk/nextjs/server'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Clapperboard } from 'lucide-react'

export const Actions = async () => {
    const user = await currentUser()
    return (
        <div className={'flex items-center justify-end gap-x-2 ml-4 lg:ml-0'}>
            {!user && (
                <SignInButton mode={'modal'}>
                    <Button>login</Button>
                </SignInButton>
            )}
            {!!user && (
                <div className={'flex items-center gap-x-4'}>
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        className={'text-muted-foreground text-white '}
                    >
                        <Link href={`/u/${user.username}`} className={'lg:flex'}>
                            <Clapperboard className={'w-5 h-5 lg:mr-2'} />
                            <span className={'hidden lg:block'}>Dashboard</span>
                        </Link>
                    </Button>
                    <UserButton />
                </div>
            )}
        </div>
    )
}
