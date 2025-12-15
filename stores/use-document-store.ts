import { Doc } from '@convex/_generated/dataModel'
import { create } from 'zustand'

type Document = Doc<'documents'>

interface DocumentStore {
    document: Document | null | undefined
    setDocument: (document: Document | null | undefined) => void
}

export const useDocumentStore = create<DocumentStore>((set) => ({
    document: undefined,
    setDocument: (document) => set({ document }),
}))
