import type { Editor } from '@tiptap/react'
import { LucideIcon } from 'lucide-react'

export interface Button {
    label: string
    icon: LucideIcon
    onClick: () => void
    isActive?: boolean
}

export interface ButtonWrapper {
    editor: Editor
}
