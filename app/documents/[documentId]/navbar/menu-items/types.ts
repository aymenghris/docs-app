import type { ComponentType } from 'react'
import { Doc } from '@convex/_generated/dataModel'
import type { Editor } from '@tiptap/react'

export type MenuItem = {
    label: string
    icon?: ComponentType<{ className?: string }>
    isSubMenu?: boolean
    hasSeparator?: boolean
    shortcut?: string
    onClick?: () => void
    submenu?: MenuItem[]
}

export interface EditorDocumentArgs {
    editor: Editor | null
    document: Doc<'documents'> | null | undefined
}
