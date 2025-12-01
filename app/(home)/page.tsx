'use client'

import { usePaginatedDocuments } from '@/hooks/usePaginatedDocuments'
import { DocumentsTable } from '@home/documents-table/DocumentsTable'
import { Navbar } from '@home/navbar/Navbar'
import { TemplatesGallery } from '@home/templates/TemplatesGallery'

const Home = () => {
    const { results, status, loadMore, isLoading } = usePaginatedDocuments()

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
                />
            </div>
        </div>
    )
}

export default Home
