import { requireUser, verifyDocumentAuthorization } from '@convex/utils'
import { paginationOptsValidator } from 'convex/server'
import { v } from 'convex/values'
import { query } from './_generated/server'
import { mutation } from './_generated/server'

export const create = mutation({
    args: {
        title: v.optional(v.string()),
        initialContent: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx)

        return await ctx.db.insert('documents', {
            title: args.title ?? 'Untitled Document',
            ownerId: user.subject,
            initialContent: args.initialContent,
        })
    },
})

export const list = query({
    args: {
        paginationOpts: paginationOptsValidator,
        searchQuery: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx)
        const { searchQuery, paginationOpts } = args

        if (searchQuery) {
            return ctx.db
                .query('documents')
                .withSearchIndex('search_title', (q) =>
                    q.search('title', searchQuery).eq('ownerId', user.subject),
                )
                .paginate(paginationOpts)
        }

        return await ctx.db
            .query('documents')
            .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
            .paginate(paginationOpts)
    },
})

export const deleteById = mutation({
    args: { id: v.id('documents') },
    handler: async (ctx, args) => {
        await verifyDocumentAuthorization(ctx, args.id)
        return await ctx.db.delete(args.id)
    },
})

export const renameById = mutation({
    args: { id: v.id('documents'), title: v.string() },
    handler: async (ctx, args) => {
        await verifyDocumentAuthorization(ctx, args.id)
        return await ctx.db.patch(args.id, { title: args.title })
    },
})
