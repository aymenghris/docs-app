'use client'

import { FC, ReactNode, useLayoutEffect } from 'react'
import { api } from '@/convex/_generated/api'
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

    // useLayoutEffect to sync before paint, avoiding flicker
    useLayoutEffect(() => {
        setDocument(document)

        return () => setDocument(undefined)
    }, [document, setDocument])

    return <>{children}</>
}
