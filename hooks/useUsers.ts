import { useEffect } from 'react'
import { getUsers } from '@editor/collaboration/actions'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUsers = () => {
    const query = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })

    useEffect(() => {
        if (query.isError) {
            toast.error('Failed to fetch users')
        }
    }, [query.isError])

    return {
        users: query.data ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
    }
}
