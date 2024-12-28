import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href={'/'}>
            <div className={'hidden lg:flex items-center gap-x-4 hover:opacity-75 transition'}>
                <div className={'p-1'}>
                    <Image src={'/logoipsum-224.svg'} alt={''} width={'100'} height={'100'} />
                </div>
            </div>
        </Link>
    )
}
