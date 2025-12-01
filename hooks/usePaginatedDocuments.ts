import { api } from '@/convex/_generated/api'
import { usePaginatedQuery } from 'convex/react'

interface UsePaginatedDocumentsOptions {
    initialNumItems?: number
}

export const usePaginatedDocuments = (
    options: UsePaginatedDocumentsOptions = {},
) => {
    const { initialNumItems = 5 } = options

    const { results, status, loadMore } = usePaginatedQuery(
        api.documents.list,
        {},
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
