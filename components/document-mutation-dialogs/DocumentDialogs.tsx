import { FC } from 'react'
import { Id } from '@convex/_generated/dataModel'
import { DeleteDocumentDialog } from './DeleteDocumentDialog'
import { RenameDocumentDialog } from './RenameDocumentDialog'

type DialogType = 'delete' | 'rename'

interface DocumentDialogProps {
    documentId: Id<'documents'>
    title: string
    activeDialog: DialogType | null
    isThisDocument: boolean
    onClose: () => void
}

export const DocumentDialog: FC<DocumentDialogProps> = ({
    documentId,
    title,
    activeDialog,
    isThisDocument,
    onClose,
}) => {
    return (
        <>
            <DeleteDocumentDialog
                documentId={documentId}
                open={isThisDocument && activeDialog === 'delete'}
                onOpenChange={(open) => !open && onClose()}
            />

            <RenameDocumentDialog
                documentId={documentId}
                initialTitle={title}
                open={isThisDocument && activeDialog === 'rename'}
                onOpenChange={(open) => !open && onClose()}
            />
        </>
    )
}
