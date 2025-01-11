import { ReactNode } from 'react'
import { getSelfByUsername } from '@/lib/auth-service'
import { redirect } from 'next/navigation'
import { Navbar } from '@/app/(dashboard)/u/[username]/_components/navbar'
import { Sidebar } from '@/app/(dashboard)/u/[username]/_components/sidebar'
import { Container } from '@/app/(dashboard)/u/[username]/_components/container'

interface CreatorLayout {
    params: { username: string }
    children: ReactNode
}

const CreatorLayout = async ({ params, children }: CreatorLayout) => {
    const self = await getSelfByUsername(params.username)

    if (!self) {
        redirect('/')
    }

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                <Container>{children}</Container>
            </div>
        </>
    )
}

export default CreatorLayout
