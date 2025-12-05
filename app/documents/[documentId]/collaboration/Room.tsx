'use client'

import { FC, ReactNode } from 'react'
import {
    ClientSideSuspense,
    LiveblocksProvider,
    RoomProvider,
} from '@liveblocks/react/suspense'
import { useParams } from 'next/navigation'

type Param = {
    documentId: string
}

interface RoomProps {
    children: ReactNode
}

const LIVEBLOCKS_PUBLIC_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!

export const Room: FC<RoomProps> = ({ children }) => {
    const param = useParams<Param>()
    return (
        <LiveblocksProvider publicApiKey={LIVEBLOCKS_PUBLIC_KEY}>
            <RoomProvider id={param.documentId}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}
