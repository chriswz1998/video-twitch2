import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href={'/'}>
            <div className={'hidden lg:flex items-center gap-x-4 hover:opacity-75 transition'}>
                <div className={'bg-white rounded-full p-3'}>
                    <Image src={'/logoipsum-224.svg'} alt={''} width={'60'} height={'80'} />
                </div>
            </div>
        </Link>
    )
}
