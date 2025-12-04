import { getAuthorizedDocument } from '@convex/utils'
import { paginationOptsValidator } from 'convex/server'
import { ConvexError, v } from 'convex/values'
import { query } from './_generated/server'
import { mutation } from './_generated/server'

export const create = mutation({
    args: {
        title: v.optional(v.string()),
        initialContent: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()
        if (!user) throw new ConvexError('Unauthorized')

        return await ctx.db.insert('documents', {
            title: args.title ?? 'Untitled Document',
            ownerId: user.subject,
            initialContent: args.initialContent,
        })
    },
})

export const list = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        return await ctx.db.query('documents').paginate(args.paginationOpts)
    },
})

export const deleteById = mutation({
    args: { id: v.id('documents') },
    handler: async (ctx, args) => {
        await getAuthorizedDocument(ctx, args.id)

        return await ctx.db.delete(args.id)
    },
})

export const renameById = mutation({
    args: { id: v.id('documents'), title: v.string() },
    handler: async (ctx, args) => {
        await getAuthorizedDocument(ctx, args.id)

        return await ctx.db.patch(args.id, { title: args.title })
    },
})
