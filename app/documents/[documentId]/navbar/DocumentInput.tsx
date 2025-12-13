'use client'

import { useDocumentStore } from '@/stores/use-document-store'
import { BsCloudCheck } from 'react-icons/bs'

export const DocumentInput = () => {
    const { document } = useDocumentStore()

    return (
        <div className="flex items-center gap-2">
            <span className="cursor-pointer truncate px-1.5 text-lg">
                {document!.title}
            </span>
            <BsCloudCheck />
        </div>
    )
}
