import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const fonts = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800']
})

export const Logo = () => {
    return (
        <Link href={'/'}>
            <div className={'flex items-center gap-x-4 hover:opacity-75 transition'}>
                <div className={'p-1 mr-24 shrink-0 lg:mr-0 lg:shrink'}>
                    <Image src={'/logoipsum-224.svg'} alt={''} width={'100'} height={'100'} />
                </div>
                <div className={cn('hidden lg:block', fonts.className)}>
                    <p className="text-lg font-semibold">Gamehub</p>
                    <p className="text-xs text-muted-foreground">Let&apos;s play</p>
                </div>
            </div>
        </Link>
    )
}
