import { MenuItem } from '@navbar/menu-items/types'
import type { Editor } from '@tiptap/react'

type InsertTableOption = (
    options: { rows: number; cols: number },
    editor: Editor | null,
) => MenuItem

export const getInsertMenu = (editor: Editor | null): MenuItem => {
    const insertTableItem: InsertTableOption = ({ rows, cols }) => ({
        label: `${rows} × ${cols}`,
        onClick: () =>
            editor
                ?.chain()
                .focus()
                .insertTable({ rows, cols, withHeaderRow: false })
                .run(),
    })

    const generateTableItems = (maxSize: number) =>
        Array.from({ length: maxSize }, (_, i) => i + 1).map((size) =>
            insertTableItem({ rows: size, cols: size }, editor),
        )

    return {
        label: 'Insert',
        submenu: [
            {
                label: 'Table',
                isSubMenu: true,
                // from 1 × 1 to 4 × 4 items
                submenu: generateTableItems(4),
            },
        ],
    }
}
