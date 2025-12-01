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
    args: { documentId: v.id('documents') },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()
        if (!user) throw new ConvexError('Unauthorized')

        const document = await ctx.db.get(args.documentId)
        if (!document) throw new ConvexError('Document not found')

        if (document.ownerId !== user.subject)
            throw new ConvexError('Unauthorized')

        return await ctx.db.delete(args.documentId)
    },
})
