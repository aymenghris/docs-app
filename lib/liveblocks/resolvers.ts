import { User } from '@/types'
import { Id } from '@convex/_generated/dataModel'
import { getDocuments } from '@editor/collaboration/actions'

export const createUserResolver = (users: User[]) => {
    return ({ userIds }: { userIds: string[] }) => {
        return userIds.map(
            (userId) => users.find((user) => user.id === userId) ?? undefined,
        )
    }
}

export const createMentionResolver = (users: User[]) => {
    return ({ text }: { text: string }) => {
        if (!text) {
            return users.map((user) => user.id)
        }

        const searchTerm = text.toLowerCase()

        return users
            .filter((user) => user.name.toLowerCase().includes(searchTerm))
            .map((user) => user.id)
    }
}

export const resolveRoomsInfo = async ({ roomIds }: { roomIds: string[] }) => {
    const documents = await getDocuments(roomIds as Id<'documents'>[])
    return documents.map((document) => ({
        name: document.name,
    }))
}
