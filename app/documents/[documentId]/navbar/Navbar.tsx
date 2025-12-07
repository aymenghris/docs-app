import { AuthenticationControls } from '@/components/AuthenticationControls'
import { Logo } from '@/components/Logo'
import { Avatars } from '@navbar/Avatars'
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
            <div className="flex">
                <Avatars />
                <AuthenticationControls />
            </div>
        </nav>
    )
}
