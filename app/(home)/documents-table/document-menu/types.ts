import { Id } from '@convex/_generated/dataModel'

export type DocumentId = Id<'documents'>

export interface DocumentDialogProps {
    documentId: DocumentId
    open: boolean
    onOpenChange: (open: boolean) => void
}
