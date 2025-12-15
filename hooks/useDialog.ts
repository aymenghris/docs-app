import { useDialogStore } from '@/stores/use-dialog-store'
import { useShallow } from 'zustand/react/shallow'

/**
 * shallow performs a shallow equality check on the selected state.
 * It prevents unnecessary re-renders by comparing if the values of your selected state have changed
 * rather than just checking if the object reference changed.
 */

export const useDialog = () => {
    return useDialogStore(
        useShallow((state) => ({
            activeDialog: state.activeDialog,
            activeDocumentId: state.activeDocumentId,
            openDialog: state.openDialog,
            closeDialog: state.closeDialog,
        })),
    )
}
