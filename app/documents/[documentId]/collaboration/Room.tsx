'use client'

import { FC, ReactNode } from 'react'
import { FullScreenLoader } from '@/components/FullScreenLoader'
import { useUsers } from '@/hooks/useUsers'
import { LIVEBLOCKS_CONFIG } from '@/lib/liveblocks/config'
import {
    createMentionResolver,
    createUserResolver,
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

    return (
        <LiveblocksProvider
            {...LIVEBLOCKS_CONFIG}
            resolveUsers={createUserResolver(users)}
            resolveMentionSuggestions={createMentionResolver(users)}
            resolveRoomsInfo={() => []}
        >
            <RoomProvider id={param.documentId}>
                <ClientSideSuspense
                    fallback={<FullScreenLoader label="Room Loading..." />}
                >
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}
