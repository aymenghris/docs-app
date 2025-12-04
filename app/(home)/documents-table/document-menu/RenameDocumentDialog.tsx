'use client'

import { FC, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useMutation } from '@tanstack/react-query'
import { DocumentDialogProps } from './types'

interface RenameDocumentDialogProps extends DocumentDialogProps {
    initialTitle: string
}

export const RenameDocumentDialog: FC<RenameDocumentDialogProps> = ({
    documentId,
    initialTitle,
    open,
    onOpenChange,
}) => {
    const { mutate: update, isPending: isUpdating } = useMutation({
        mutationFn: useConvexMutation(api.documents.renameById),
        onSuccess: () => {
            onOpenChange(false)
        },
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const titleValue = formData.get('title') as string

        update({ id: documentId, title: titleValue.trim() || 'Untitled' })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename Document</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Enter a new name for this document
                    </DialogDescription>
                    <div className="my-4">
                        <Input
                            name="title"
                            defaultValue={initialTitle}
                            placeholder="Document title"
                            disabled={isUpdating}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
