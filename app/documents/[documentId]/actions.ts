'use server'

import { CustomSessionClaims } from '@/types/clerk'
import { auth, clerkClient } from '@clerk/nextjs/server'

export const getUsers = async () => {
    const { sessionClaims } = await auth()
    const claims = sessionClaims as CustomSessionClaims

    if (!claims?.o?.id) return

    const organizationId = claims.o.id
    const clerk = await clerkClient()
    const response = await clerk.users.getUserList({
        organizationId: [organizationId],
    })

    return response.data.map((user) => ({
        id: user.id,
        name:
            user.firstName ??
            user.primaryEmailAddress?.emailAddress ??
            'Anonymous',
        avatar: user.imageUrl,
    }))
}
