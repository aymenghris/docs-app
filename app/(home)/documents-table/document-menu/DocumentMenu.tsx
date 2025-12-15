import { FC } from 'react'
import { DocumentDialog } from '@/components/document-mutation-dialogs/DocumentDialogs'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDialog } from '@/hooks/useDialog'
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
    const { activeDialog, activeDocumentId, openDialog, closeDialog } =
        useDialog()
    const isThisDocument = activeDocumentId === documentId

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
                    <DropdownMenuItem
                        onClick={() => openDialog('rename', documentId)}
                    >
                        <FilePenIcon />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => openDialog('delete', documentId)}
                    >
                        <Trash2Icon className="mr-2" />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleOpenInNewTab}>
                        <ExternalLinkIcon className="mr-2" />
                        Open in a new tab
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DocumentDialog
                documentId={documentId}
                title={title}
                activeDialog={activeDialog}
                isThisDocument={isThisDocument}
                onClose={closeDialog}
            />
        </>
    )
}
