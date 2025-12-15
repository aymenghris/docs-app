'use client'

import React, { FC } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { DocumentDialogProps } from '@home/documents-table/document-menu/types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const DeleteDocumentDialog: FC<DocumentDialogProps> = ({
    documentId,
    open,
    onOpenChange,
}) => {
    const router = useRouter()

    const { mutateAsync, isPending: isDeleting } = useMutation({
        mutationFn: useConvexMutation(api.documents.deleteById),
    })

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Document</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure you want to delete this document? This action
                    cannot be undone.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogAction
                        disabled={isDeleting}
                        onClick={(e) => {
                            e.stopPropagation()
                            onOpenChange(false)
                            router.push('/')
                            toast.promise(mutateAsync({ id: documentId }), {
                                loading: 'Deleting...',
                                success: 'Document deleted successfully',
                                error: 'Failed to delete document',
                            })
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
