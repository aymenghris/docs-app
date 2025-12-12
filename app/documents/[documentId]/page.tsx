import { FC } from 'react'
import { DocumentProvider } from '@/providers/DocumentProvider'
import { Id } from '@convex/_generated/dataModel'
import { Room } from '@editor/collaboration/Room'
import { Editor } from '@editor/Editor'
import { preloadDocument } from '@editor/utils/preload-document'
import { Navbar } from '@navbar/Navbar'
import { Toolbar } from '@toolbar/Toolbar'

interface DocumentIdPageProps {
    params: Promise<{
        documentId: Id<'documents'>
    }>
}

const DocumentIdPage: FC<DocumentIdPageProps> = async ({ params }) => {
    const { documentId } = await params
    const preloadedDocument = await preloadDocument(documentId)

    return (
        <DocumentProvider preloadedDocument={preloadedDocument}>
            <Room>
                <div className="min-h-screen bg-[#fafbfd]">
                    <div className="fixed inset-x-0 top-0 z-10 flex flex-col gap-y-2 bg-[#fafbfd] px-4 pt-2 print:hidden">
                        <Navbar />
                        <Toolbar />
                    </div>
                    <div className="pt-[114px] print:pt-0">
                        <Editor />
                    </div>
                </div>
            </Room>
        </DocumentProvider>
    )
}

export default DocumentIdPage
