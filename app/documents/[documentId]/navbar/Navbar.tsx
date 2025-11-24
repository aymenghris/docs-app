import { Logo } from '@/components/Logo'
import { DocumentInput } from '@navbar/DocumentInput'
import { MenuBar } from '@navbar/MenuBar'

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Logo />
                <div className="flex flex-col">
                    <DocumentInput />
                    <MenuBar />
                </div>
            </div>
        </nav>
    )
}
