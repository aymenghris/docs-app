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
import { DocumentId } from '@home/documents-table/types'
import { useMutation } from '@tanstack/react-query'

interface DeleteDocumentDialogProps {
    documentId: DocumentId
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const DeleteDocumentDialog: FC<DeleteDocumentDialogProps> = ({
    documentId,
    open,
    onOpenChange,
}) => {
    const { mutate, isPending: isDeleting } = useMutation({
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
                        onClick={() => mutate({ documentId })}
                    >
                        Delete
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
