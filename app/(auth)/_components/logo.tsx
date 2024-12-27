import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const fonts = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800']
})

export const Logo = () => {
    return (
        <div className={'flex flex-col items-center gap-y-4'}>
            <Image src={'/logoipsum-224.svg'} alt={'Gamehub'} width={'80'} height={'80'} />
            <div className={cn('flex flex-col items-center', fonts.className)}>
                <p className="text-xl font-semibold">Chris&apos;s Hub</p>
                <p className="text-sm text-muted-foreground">let&apos;s play</p>
            </div>
        </div>
    )
}
