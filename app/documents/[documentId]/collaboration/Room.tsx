'use client'

import { FC, ReactNode } from 'react'
import { FullScreenLoader } from '@/components/FullScreenLoader'
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

export const Room: FC<RoomProps> = ({ children }) => {
    const param = useParams<Param>()
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
            <RoomProvider id={param.documentId}>
                <ClientSideSuspense
                    fallback={<FullScreenLoader label="Loading Document..." />}
                >
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}
