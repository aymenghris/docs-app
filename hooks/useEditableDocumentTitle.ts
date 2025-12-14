import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { Id } from '@convex/_generated/dataModel'
import { useStatus } from '@liveblocks/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

interface UseEditableDocumentTitleProps {
    documentId: Id<'documents'>
    currentTitle: string
}

export const useEditableDocumentTitle = ({
    documentId,
    currentTitle,
}: UseEditableDocumentTitleProps) => {
    const [inputValue, setInputValue] = useState(currentTitle)
    const [isEditing, setIsEditing] = useState(false)
    const status = useStatus()

    const { mutate: update, isPending: isUpdating } = useMutation({
        mutationFn: useConvexMutation(api.documents.renameById),
        onSuccess: () => {
            toast.success('Document renamed successfully')
        },
        onError: () => {
            toast.error('Failed to rename document')
            setInputValue(currentTitle)
        },
    })

    // Sync input with document changes
    useEffect(() => {
        setInputValue(currentTitle)
    }, [currentTitle])

    const updateTitle = (newTitle: string) => {
        const trimmedTitle = newTitle.trim()

        if (!trimmedTitle) {
            toast.error('Title cannot be empty')
            setInputValue(currentTitle)
            return
        }

        if (trimmedTitle === currentTitle) return

        update({ id: documentId, title: trimmedTitle })
    }

    const debouncedTitleUpdate = useDebounce(updateTitle, 500)

    const handleChange = (newValue: string) => {
        setInputValue(newValue)
        debouncedTitleUpdate(newValue)
    }

    const commitChanges = () => {
        const trimmedValue = inputValue.trim()
        if (trimmedValue && trimmedValue !== currentTitle) {
            updateTitle(trimmedValue)
        } else if (!trimmedValue) {
            setInputValue(currentTitle)
        }
    }

    const cancelEdit = () => {
        setInputValue(currentTitle)
        setIsEditing(false)
    }

    const loadingConnectionStates = ['connecting', 'reconnecting']
    const isLoading = loadingConnectionStates.includes(status)

    const hasUnsavedChanges =
        inputValue.trim() !== currentTitle && !!inputValue.trim()

    return {
        // State
        inputValue,
        isEditing,
        isUpdating,
        isLoading,
        hasUnsavedChanges,

        // Actions
        setIsEditing,
        handleChange,
        commitChanges,
        cancelEdit,
    }
}
