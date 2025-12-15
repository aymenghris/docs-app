import { generateColorFromName } from '@/app/api/liveblocks-auth/utils'
import { CustomSessionClaims } from '@/types/clerk'
import { auth, currentUser } from '@clerk/nextjs/server'
import { api } from '@convex/_generated/api'
import { Liveblocks } from '@liveblocks/node'
import { ConvexHttpClient } from 'convex/browser'
import { NextRequest } from 'next/server'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const POST = async (req: NextRequest) => {
    const liveblocks = new Liveblocks({
        secret: process.env.LIVEBLOCKS_SECRET_KEY!,
    })
    const { sessionClaims } = await auth()
    const claims = sessionClaims as CustomSessionClaims

    if (!claims)
        return new Response('Unauthorized: No active session found', {
            status: 401,
        })

    const user = await currentUser()

    if (!user)
        return new Response('Unauthorized: User authentication failed', {
            status: 401,
        })

    const { room } = await req.json()
    const document = await convex.query(api.documents.getById, { id: room })

    if (!document)
        return new Response(
            'Not Found: The requested document does not exist',
            { status: 404 },
        )

    const isOwner = document.ownerId === user.id
    const isOrganizationMember =
        !!document.organizationId && document.organizationId === claims?.o?.id

    if (!isOwner && !isOrganizationMember)
        return new Response(
            'Forbidden: You do not have permission to access this document',
            { status: 403 },
        )

    const name =
        user.firstName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous'

    const session = liveblocks.prepareSession(user.id, {
        userInfo: {
            name,
            avatar: user.imageUrl,
            color: generateColorFromName(name),
        },
    })

    session.allow(room, session.FULL_ACCESS)

    const { body, status } = await session.authorize()
    return new Response(body, { status })
}
