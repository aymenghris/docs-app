import { FC } from 'react'
import Editor from '@/app/documents/Editor'

interface DocumentIdPageProps {
    params: Promise<{
        documentId: string
    }>
}

const DocumentIdPage: FC<DocumentIdPageProps> = async ({ params }) => {
    const { documentId } = await params
    return (
        <div className="min-h-screen bg-[#fafbfd]">
            <Editor />
        </div>
    )
}

export default DocumentIdPage
