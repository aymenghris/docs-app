import { MenuItem } from '@navbar/menu-items/types'
import type { Editor } from '@tiptap/react'
import {
    BoldIcon,
    ItalicIcon,
    RemoveFormattingIcon,
    StrikethroughIcon,
    TextIcon,
    UnderlineIcon,
} from 'lucide-react'

export const getFormatMenu = (editor: Editor | null): MenuItem => ({
    label: 'Format',
    submenu: [
        {
            label: 'Text',
            icon: TextIcon,
            isSubMenu: true,
            submenu: [
                {
                    label: 'Bold',
                    icon: BoldIcon,
                    shortcut: '⌘B',
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: 'Italic',
                    icon: ItalicIcon,
                    shortcut: '⌘I',
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                    label: 'Underline',
                    icon: UnderlineIcon,
                    shortcut: '⌘U',
                    onClick: () =>
                        editor?.chain().focus().toggleUnderline().run(),
                },
                {
                    label: 'Strikethrough',
                    icon: StrikethroughIcon,
                    shortcut: '⌘S',
                    onClick: () => editor?.chain().focus().toggleStrike().run(),
                },
            ],
        },
        {
            label: 'Clear Formatting',
            icon: RemoveFormattingIcon,
            onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        },
    ],
})
