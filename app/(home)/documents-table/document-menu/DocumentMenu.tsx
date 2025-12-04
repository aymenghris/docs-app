import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteDocumentDialog } from '@home/documents-table/document-menu/DeleteDocumentDialog'
import { RenameDocumentDialog } from '@home/documents-table/document-menu/RenameDocumentDialog'
import { DocumentId } from '@home/documents-table/document-menu/types'
import {
    ExternalLinkIcon,
    FilePenIcon,
    MoreVertical,
    Trash2Icon,
} from 'lucide-react'

export const DocumentMenu: FC<{ documentId: DocumentId; title: string }> = ({
    documentId,
    title,
}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showRenameDialog, setShowRenameDialog] = useState(false)

    const handleOpenInNewTab = () => {
        window.open(`/documents/${documentId}`, '_blank', 'noopener,noreferrer')
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <MoreVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setShowRenameDialog(true)}>
                        <FilePenIcon />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                        <Trash2Icon className="mr-2" />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleOpenInNewTab}>
                        <ExternalLinkIcon className="mr-2" />
                        Open in a new tab
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteDocumentDialog
                documentId={documentId}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            ></DeleteDocumentDialog>

            <RenameDocumentDialog
                documentId={documentId}
                initialTitle={title}
                open={showRenameDialog}
                onOpenChange={setShowRenameDialog}
            />
        </>
    )
}
