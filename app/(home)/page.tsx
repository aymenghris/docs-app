'use client'

import { usePaginatedDocuments } from '@/hooks/usePaginatedDocuments'
import { useQueryParam } from '@/hooks/useQueryParam'
import { DocumentsTable } from '@home/documents-table/DocumentsTable'
import { Navbar } from '@home/navbar/Navbar'
import { TemplatesGallery } from '@home/templates/TemplatesGallery'

const Home = () => {
    const [searchQuery] = useQueryParam('search')

    const { results, status, loadMore, isLoading, canLoadMore } =
        usePaginatedDocuments({ searchQuery })

    return (
        <div className="flex min-h-screen flex-col">
            <div className="fixed inset-x-0 top-0 z-10 h-16 bg-white p-4">
                <Navbar />
            </div>
            <div className="mt-16">
                <TemplatesGallery />
                <DocumentsTable
                    documents={results}
                    loadMore={loadMore}
                    status={status}
                    isLoading={isLoading}
                    canLoadMore={canLoadMore}
                />
            </div>
        </div>
    )
}

export default Home
