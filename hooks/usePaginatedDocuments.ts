import { api } from '@/convex/_generated/api'
import { usePaginatedQuery } from 'convex/react'

interface UsePaginatedDocumentsOptions {
    initialNumItems?: number
    searchQuery: string
}

export const usePaginatedDocuments = (
    options: UsePaginatedDocumentsOptions,
) => {
    const { initialNumItems = 5, searchQuery } = options

    const { results, status, loadMore } = usePaginatedQuery(
        api.documents.list,
        { searchQuery },
        { initialNumItems },
    )

    return {
        results,
        status,
        loadMore,
        isLoading: status === 'LoadingFirstPage',
        canLoadMore: status === 'CanLoadMore',
    }
}
