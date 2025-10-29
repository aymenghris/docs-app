import { FC } from 'react'
import { Toolbar } from '@toolbar/Toolbar'
import { Editor } from './Editor'

interface DocumentIdPageProps {
    params: Promise<{
        documentId: string
    }>
}

const DocumentIdPage: FC<DocumentIdPageProps> = async ({ params }) => {
    const { documentId } = await params
    return (
        <div className="min-h-screen bg-[#fafbfd]">
            <Toolbar />
            <Editor />
        </div>
    )
}

export default DocumentIdPage
