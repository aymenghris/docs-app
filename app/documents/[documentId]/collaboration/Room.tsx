'use client'

import { FC, ReactNode } from 'react'
import { FullScreenLoader } from '@/components/FullScreenLoader'
import { useUsers } from '@/hooks/useUsers'
import { LIVEBLOCKS_CONFIG } from '@/lib/liveblocks/config'
import {
    createMentionResolver,
    createUserResolver,
    resolveRoomsInfo,
} from '@/lib/liveblocks/resolvers'
import {
    ClientSideSuspense,
    LiveblocksProvider,
    RoomProvider,
} from '@liveblocks/react/suspense'
import { useParams } from 'next/navigation'

interface RoomProps {
    children: ReactNode
}

export const Room: FC<RoomProps> = ({ children }) => {
    const param = useParams<{ documentId: string }>()
    const { users } = useUsers()
    const { throttle, authEndpoint } = LIVEBLOCKS_CONFIG

    return (
        <LiveblocksProvider
            throttle={throttle}
            authEndpoint={authEndpoint(param.documentId)}
            resolveUsers={createUserResolver(users)}
            resolveMentionSuggestions={createMentionResolver(users)}
            resolveRoomsInfo={resolveRoomsInfo}
        >
            <RoomProvider
                id={param.documentId}
                initialStorage={{ rightMargin: 56, leftMargin: 56 }}
            >
                <ClientSideSuspense
                    fallback={<FullScreenLoader label="Room Loading..." />}
                >
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}
