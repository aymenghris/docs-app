import { AuthenticationControls } from '@/components/AuthenticationControls'
import { Logo } from '@/components/Logo'
import { SearchInput } from '@home/navbar/SearchInput'

export const Navbar = () => {
    return (
        <nav className="flex size-full items-center justify-between">
            <div className="flex shrink-0 items-center gap-3 pr-6">
                <Logo />
                <h3 className="text-xl">Docs</h3>
            </div>
            <SearchInput />
            <AuthenticationControls />
        </nav>
    )
}
