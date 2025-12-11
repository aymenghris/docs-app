'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ClientSideSuspense } from '@liveblocks/react'
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui'
import { useInboxNotifications } from '@liveblocks/react/suspense'
import { NotificationsBell } from './NotificationsBell'

export const NotificationsInbox = () => {
    return (
        <ClientSideSuspense fallback={null}>
            <InboxMenu />
        </ClientSideSuspense>
    )
}

const InboxMenu = () => {
    const { inboxNotifications } = useInboxNotifications()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <NotificationsBell>
                    {inboxNotifications.length > 0 && (
                        <span
                            className={cn(
                                'flex items-center justify-center',
                                'absolute -top-1 -right-1 size-4',
                                'text-xs text-white',
                                'rounded-full bg-sky-500',
                            )}
                        >
                            {inboxNotifications.length}
                        </span>
                    )}
                </NotificationsBell>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto">
                {inboxNotifications.length > 0 ? (
                    <InboxNotificationList>
                        {inboxNotifications.map((notification) => (
                            <InboxNotification
                                key={notification.id}
                                inboxNotification={notification}
                            />
                        ))}
                    </InboxNotificationList>
                ) : (
                    <div className="text-muted-foreground w-[400px] p-2 text-center text-sm">
                        No notifications yet
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
