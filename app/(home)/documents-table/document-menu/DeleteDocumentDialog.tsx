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
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { DocumentDialogProps } from './types'

export const DeleteDocumentDialog: FC<DocumentDialogProps> = ({
    documentId,
    open,
    onOpenChange,
}) => {
    const { mutate, isPending: isDeleting } = useMutation({
        mutationFn: useConvexMutation(api.documents.deleteById),
        onSuccess: () => toast.success('Document deleted successfully'),
        onError: () => toast.error('Failed to delete document'),
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
                        onClick={() => mutate({ id: documentId })}
                    >
                        Delete
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
