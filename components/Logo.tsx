import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href="/">
            <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
    )
}
