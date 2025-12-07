'use client'

import { FC } from 'react'
import { cn } from '@/lib/utils'
import { ClientSideSuspense } from '@liveblocks/react'
import { useOthers, useSelf } from '@liveblocks/react/suspense'

const AVATAR_SIZE = 36
const MAX_AVATARS = 3

export const Avatars = () => {
    return (
        <ClientSideSuspense fallback={null}>
            <AvatarStack />
        </ClientSideSuspense>
    )
}

const AvatarStack = () => {
    const others = useOthers()
    const currentUser = useSelf()

    if (others.length === 0) return null

    const visibleOthers = others.slice(0, MAX_AVATARS)
    const remainingCount = others.length - MAX_AVATARS

    return (
        <div
            className="flex items-center"
            role="list"
            aria-label="Active users"
        >
            {currentUser && (
                <Avatar
                    src={currentUser.info.avatar}
                    name="You (current user)"
                />
            )}

            {visibleOthers.map((user) => (
                <Avatar
                    key={user.connectionId}
                    src={user.info.avatar}
                    name={user.info.name || 'Anonymous'}
                />
            ))}

            {remainingCount > 0 && <AvatarCount count={remainingCount} />}
        </div>
    )
}

interface AvatarProps {
    src: string
    name: string
}

const Avatar: FC<AvatarProps> = ({ src, name }) => {
    return (
        <div
            role="listitem"
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            className={cn(
                'relative -ml-2 first:ml-0',
                'flex shrink-0 items-center justify-center',
                'rounded-full border-2 border-white bg-gray-400',
                'group cursor-pointer',
                'transition-transform hover:z-10 hover:scale-110',
            )}
        >
            {/* Tooltip */}
            <div
                role="tooltip"
                className={cn(
                    'absolute top-full left-1/2 mt-2.5 -translate-x-1/2',
                    'px-2 py-1 text-xs whitespace-nowrap text-white',
                    'rounded-lg bg-black shadow-lg',
                    'pointer-events-none opacity-0',
                    'transition-opacity duration-200',
                    'group-hover:opacity-100',
                )}
            >
                {name}
            </div>

            <img
                src={src}
                alt={name}
                className="size-full rounded-full object-cover"
            />
        </div>
    )
}

interface AvatarCountProps {
    count: number
}

const AvatarCount: FC<AvatarCountProps> = ({ count }) => {
    return (
        <div
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            className={cn(
                'relative -ml-2',
                'flex shrink-0 items-center justify-center',
                'rounded-full border-2 border-white bg-gray-600',
                'text-xs font-medium text-white',
            )}
            aria-label={`${count} more users`}
        >
            +{count}
        </div>
    )
}
