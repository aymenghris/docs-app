import { ExtendedUserIdentity } from '@convex/types'
import { ConvexError } from 'convex/values'
import { Id } from './_generated/dataModel'
import { MutationCtx, QueryCtx } from './_generated/server'

export const requireAuth = async (ctx: MutationCtx | QueryCtx) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new ConvexError('Unauthorized')
}

export const requireUser = async (ctx: MutationCtx | QueryCtx) => {
    const user =
        (await ctx.auth.getUserIdentity()) as ExtendedUserIdentity | null
    if (!user) throw new ConvexError('Unauthorized')

    return user
}

export const verifyDocumentAuthorization = async (
    ctx: MutationCtx | QueryCtx,
    id: Id<'documents'>,
) => {
    const [user, document] = await Promise.all([
        requireUser(ctx),
        ctx.db.get(id),
    ])

    if (!document) throw new ConvexError('Document not found')

    const isOwner = document.ownerId === user.subject

    const isOrganizationMember =
        !!document.organizationId &&
        document.organizationId === user.organization_id

    if (!isOwner && !isOrganizationMember) {
        throw new Error('Unauthorized')
    }
}
