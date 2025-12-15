import { create } from 'zustand'

interface DocumentStore {
    initContent: string | undefined
    setInitContent: (initContent: string | undefined) => void
}

export const useDocumentInitContentStore = create<DocumentStore>((set) => ({
    initContent: undefined,
    setInitContent: (initContent) => set({ initContent }),
}))
