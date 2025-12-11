'use client'

import { AuthenticationControls } from '@/components/AuthenticationControls'
import { Logo } from '@/components/Logo'
import { SeparatedContainer } from '@/components/SeparatedContainer'
import { useOthers } from '@liveblocks/react'
import { Avatars } from '@navbar/Avatars'
import { DocumentInput } from '@navbar/DocumentInput'
import { MenuBar } from '@navbar/MenuBar'
import { NotificationsInbox } from '@navbar/notifications/NotificationsInbox'

export const Navbar = () => {
    const others = useOthers()
    const hasOthers = others && others.length > 0

    return (
        <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Logo />
                <div className="flex flex-col">
                    <DocumentInput />
                    <MenuBar />
                </div>
            </div>
            <div className="flex h-10 items-center">
                <SeparatedContainer className="mx-1">
                    {hasOthers && <Avatars />}
                    <NotificationsInbox />
                    <AuthenticationControls />
                </SeparatedContainer>
            </div>
        </nav>
    )
}
