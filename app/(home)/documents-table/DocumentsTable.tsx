import { FC } from 'react'
import { LoadingState } from '@/components/LoadingState'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Doc } from '@convex/_generated/dataModel'
import { DocumentRow } from '@home/documents-table/DocumentRow'
import { PaginationStatus } from 'convex/react'

interface DocumentsTableProps {
    documents: Doc<'documents'>[]
    loadMore: (numItems: number) => void
    status: PaginationStatus
    isLoading: boolean
    canLoadMore: boolean
}

const TABLE_HEADERS = ['Name', 'Shared', 'Created At'] as const

const EmptyState = () => (
    <TableRow>
        <TableCell
            colSpan={TABLE_HEADERS.length}
            className="text-muted-foreground h-24 text-center"
        >
            No documents found
        </TableCell>
    </TableRow>
)

export const DocumentsTable: FC<DocumentsTableProps> = ({
    documents,
    loadMore,
    status,
    isLoading,
}) => {
    if (isLoading) {
        return <LoadingState className="h-24" />
    }

    const isEmpty = documents.length === 0
    const canLoadMore = status === 'CanLoadMore'

    return (
        <div className="mx-auto flex max-w-screen-xl flex-col gap-5 px-16 py-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        {TABLE_HEADERS.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isEmpty ? (
                        <EmptyState />
                    ) : (
                        documents.map((document) => (
                            <DocumentRow
                                key={document._id}
                                document={document}
                            />
                        ))
                    )}
                </TableBody>
            </Table>

            {canLoadMore && (
                <Button
                    variant="outline"
                    size="sm"
                    className="mx-auto"
                    onClick={() => loadMore(5)}
                >
                    Load More
                </Button>
            )}
        </div>
    )
}
