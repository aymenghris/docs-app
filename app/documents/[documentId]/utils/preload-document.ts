import { auth } from '@clerk/nextjs/server'
import { api } from '@convex/_generated/api'
import { Id } from '@convex/_generated/dataModel'
import { preloadQuery } from 'convex/nextjs'

export async function preloadDocument(documentId: Id<'documents'>) {
    const { getToken } = await auth()
    const token = (await getToken({ template: 'convex' })) ?? undefined

    if (!token) {
        throw new Error('Unauthorized, no token found')
    }

    return preloadQuery(api.documents.getById, { id: documentId }, { token })
}
