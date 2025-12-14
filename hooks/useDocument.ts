import { useDocumentStore } from '@/stores/use-document-store'

export const useDocument = () => {
    const document = useDocumentStore((state) => state.document)

    if (!document) {
        throw new Error('useDocument must be used within DocumentProvider')
    }

    return document
}
