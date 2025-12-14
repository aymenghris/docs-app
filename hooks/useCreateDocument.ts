import { api } from '@/convex/_generated/api'
import { useConvexMutation } from '@convex-dev/react-query'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useCreateDocument = () => {
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: useConvexMutation(api.documents.create),
        onSuccess: (documentId) => {
            toast.success('Document created successfully')
            void router.push(`/documents/${documentId}`)
        },
        onError: () => {
            toast.error('Failed to create document')
        },
    })

    return {
        create: mutation.mutate,
        isCreating: mutation.isPending,
    }
}
