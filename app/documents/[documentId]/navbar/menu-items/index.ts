import { getEditMenu } from '@navbar/menu-items/edit-menu'
import { getFileMenu } from '@navbar/menu-items/file-menu'
import { getFormatMenu } from '@navbar/menu-items/format-menu'
import { getInsertMenu } from '@navbar/menu-items/insert-menu'
import { MenuItem } from '@navbar/menu-items/types'
import type { Editor } from '@tiptap/react'

export const getMenuItems = (editor: Editor | null): MenuItem[] => [
    getFileMenu(editor),
    getEditMenu(editor),
    getInsertMenu(editor),
    getFormatMenu(editor),
]
