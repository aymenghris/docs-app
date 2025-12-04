import { ConvexError } from 'convex/values'
import { Id } from './_generated/dataModel'
import { MutationCtx, QueryCtx } from './_generated/server'

export async function getAuthorizedDocument(
    ctx: MutationCtx | QueryCtx,
    id: Id<'documents'>,
) {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
        throw new ConvexError('Unauthorized')
    }

    const document = await ctx.db.get(id)

    if (!document) {
        throw new ConvexError('Document not found')
    }

    if (document.ownerId !== user.subject) {
        throw new ConvexError('Unauthorized')
    }

    return document
}
