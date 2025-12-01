import { FC } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Doc } from '@convex/_generated/dataModel'
import { DocumentMenu } from '@home/documents-table/DocumentMenu'
import { format } from 'date-fns/format'
import { Building2Icon, CircleUserIcon } from 'lucide-react'
import { SiGoogledocs } from 'react-icons/si'

interface DocumentRowProps {
    document: Doc<'documents'>
}

export const DocumentRow: FC<DocumentRowProps> = ({ document }) => {
    const isOrganizationOwned = Boolean(document.organizationId)
    const OwnerIcon = isOrganizationOwned ? Building2Icon : CircleUserIcon

    return (
        <TableRow className="cursor-pointer">
            <TableCell className="font-medium md:w-[45%]">
                <SiGoogledocs className="mr-6 inline-block size-6 fill-blue-500" />
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground hidden items-center gap-2 md:flex">
                <OwnerIcon className="size-4" />
                {isOrganizationOwned ? 'Organization' : 'Personal'}
            </TableCell>
            <TableCell>
                {format(new Date(document._creationTime), 'MMM dd, yyyy')}
            </TableCell>
            <TableCell className="flex justify-end">
                <DocumentMenu
                    documentId={document._id}
                    title={document.title}
                />
            </TableCell>
        </TableRow>
    )
}
