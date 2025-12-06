import { FC } from 'react'
import { Room } from '@editor/collaboration/Room'
import { Editor } from '@editor/Editor'
import { Navbar } from '@navbar/Navbar'
import { Toolbar } from '@toolbar/Toolbar'

interface DocumentIdPageProps {
    params: Promise<{
        documentId: string
    }>
}

const DocumentIdPage: FC<DocumentIdPageProps> = async ({ params }) => {
    const { documentId } = await params
    return (
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
    )
}

export default DocumentIdPage
