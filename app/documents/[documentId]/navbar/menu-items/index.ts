import { getEditMenu } from '@navbar/menu-items/edit-menu'
import { getFileMenu } from '@navbar/menu-items/file-menu'
import { getFormatMenu } from '@navbar/menu-items/format-menu'
import { getInsertMenu } from '@navbar/menu-items/insert-menu'
import { EditorDocumentArgs, MenuItem } from '@navbar/menu-items/types'

export const getMenuItems = ({
    editor,
    document,
    onCreateDocument,
}: EditorDocumentArgs): MenuItem[] => [
    getFileMenu({ editor, document, onCreateDocument }),
    getEditMenu(editor),
    getInsertMenu(editor),
    getFormatMenu(editor),
]
