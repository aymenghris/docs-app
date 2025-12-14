'use server'

import { CustomSessionClaims } from '@/types/clerk'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { api } from '@convex/_generated/api'
import { Id } from '@convex/_generated/dataModel'
import { ConvexHttpClient } from 'convex/browser'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const getDocuments = async (ids: Id<'documents'>[]) => {
    return await convex.query(api.documents.getByIds, { ids })
}

export const getUsers = async () => {
    const { sessionClaims } = await auth()
    const claims = sessionClaims as CustomSessionClaims

    if (!claims?.o?.id) {
        console.error('No organization ID found in session claims')
        return []
    }

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
