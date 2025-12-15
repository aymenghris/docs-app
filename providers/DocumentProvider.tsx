'use client'

import { FC, ReactNode, useLayoutEffect } from 'react'
import { api } from '@/convex/_generated/api'
import { useDocumentInitContentStore } from '@/stores/use-document-init-content-store'
import { useDocumentStore } from '@/stores/use-document-store'
import { Preloaded, usePreloadedQuery } from 'convex/react'

interface DocumentProviderProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>
    children: ReactNode
}

export const DocumentProvider: FC<DocumentProviderProps> = ({
    preloadedDocument,
    children,
}) => {
    const document = usePreloadedQuery(preloadedDocument)
    const setDocument = useDocumentStore((state) => state.setDocument)
    const setDocumentInitContent = useDocumentInitContentStore(
        (state) => state.setInitContent,
    )

    // useLayoutEffect to sync before paint, avoiding flicker
    useLayoutEffect(() => {
        setDocument(document)
        setDocumentInitContent(document?.initialContent)

        return () => {
            setDocument(undefined)
            setDocumentInitContent(undefined)
        }
    }, [document, setDocument, setDocumentInitContent])

    return <>{children}</>
}
