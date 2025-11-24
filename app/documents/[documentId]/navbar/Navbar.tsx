import { DocumentInput } from '@navbar/DocumentInput'
import { MenuBar } from '@navbar/MenuBar'
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Link href="/public">
                    <Image src="/logo.svg" alt="logo" width={36} height={36} />
                </Link>
                <div className="flex flex-col">
                    <DocumentInput />
                    <MenuBar />
                </div>
            </div>
        </nav>
    )
}
