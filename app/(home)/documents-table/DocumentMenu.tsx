import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteDocumentDialog } from '@home/documents-table/DeleteDocumentDialog'
import { DocumentId } from '@home/documents-table/types'
import { ExternalLinkIcon, MoreVertical, Trash2Icon } from 'lucide-react'

const OpenInNewTabMenuItem: FC<{ documentId: DocumentId }> = ({
    documentId,
}) => (
    <DropdownMenuItem
        onClick={() =>
            window.open(
                `/documents/${documentId}`,
                '_blank',
                'noopener,noreferrer',
            )
        }
    >
        <ExternalLinkIcon className="mr-2" />
        Open in a new tab
    </DropdownMenuItem>
)

export const DocumentMenu: FC<{ documentId: DocumentId; title: string }> = ({
    documentId,
}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

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
                    <OpenInNewTabMenuItem documentId={documentId} />
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                        <Trash2Icon className="mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteDocumentDialog
                documentId={documentId}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            ></DeleteDocumentDialog>
        </>
    )
}
