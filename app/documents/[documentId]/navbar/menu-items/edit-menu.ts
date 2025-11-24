import { MenuItem } from '@navbar/menu-items/types'
import type { Editor } from '@tiptap/react'
import { Redo2Icon, Undo2Icon } from 'lucide-react'

export const getEditMenu = (editor: Editor | null): MenuItem => ({
    label: 'Edit',
    submenu: [
        {
            label: 'Undo',
            icon: Undo2Icon,
            shortcut: '⌘Z',
            onClick: () => editor?.chain().focus().undo().run(),
        },
        {
            label: 'Redo',
            icon: Redo2Icon,
            shortcut: '⌘Y',
            onClick: () => editor?.chain().focus().redo().run(),
        },
    ],
})
