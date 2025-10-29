import type { Level } from '@tiptap/extension-heading'
import { type Editor } from '@tiptap/react'

type editor = Editor | null

// HeadingLevelButton.tsx
export const getCurrentHeading = (editor: editor) => {
    const level = [1, 2, 3, 4, 5].find((l) =>
        editor?.isActive('heading', { level: l }),
    )
    return level ? `Heading ${level}` : 'Normal text'
}

export const isHeadingActive = (editor: editor, value: number) =>
    (value === 0 && !editor?.isActive('heading')) ||
    editor?.isActive('heading', { level: value })

export const applyHeadingLevel = (editor: editor, value: number) => {
    if (value === 0) editor?.chain().focus().setParagraph().run()
    else
        editor
            ?.chain()
            .focus()
            .toggleHeading({ level: value as Level })
            .run()
}
