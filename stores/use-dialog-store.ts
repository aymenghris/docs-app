import { create } from 'zustand'

/**
 * Why activeDocumentId is needed:
 *
 * Each DocumentMenu component in the table subscribes to this global store.
 * Without activeDocumentId, when activeDialog is set to 'delete' or 'rename',
 * EVERY DocumentMenu would evaluate `activeDialog === 'delete'` as true,
 * causing multiple dialogs to render simultaneously with stacked overlays
 * (resulting in a black screen effect).
 *
 * By tracking which document's dialog should be open, only the matching
 * DocumentMenu renders its dialog as open:
 * `activeDocumentId === documentId && activeDialog === 'delete'`
 */

type DialogType = 'rename' | 'delete' | null

interface DialogStore {
    activeDialog: DialogType
    activeDocumentId: string | null
    openDialog: (dialog: DialogType, documentId: string) => void
    closeDialog: () => void
}

export const useDialogStore = create<DialogStore>((set) => ({
    activeDialog: null,
    activeDocumentId: null,
    openDialog: (dialog, documentId) =>
        set({ activeDialog: dialog, activeDocumentId: documentId }),
    closeDialog: () => set({ activeDialog: null, activeDocumentId: null }),
}))
