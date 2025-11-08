import { FC } from 'react'
import { ToolbarButton } from '@toolbar/buttons/ToolbarButton'
import { ButtonWrapper } from '@toolbar/utils/types'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

export const BoldToggleButton: FC<ButtonWrapper> = ({ editor }) => (
    <ToolbarButton
        label="Bold"
        icon={BoldIcon}
        onClick={() => editor?.chain().focus().toggleBold().run()}
        isActive={editor?.isActive('bold')}
    />
)

export const ItalicToggleButton: FC<ButtonWrapper> = ({ editor }) => (
    <ToolbarButton
        label="Italic"
        icon={ItalicIcon}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        isActive={editor?.isActive('italic')}
    />
)

export const UnderlineToggleButton: FC<ButtonWrapper> = ({ editor }) => (
    <ToolbarButton
        label="Underline"
        icon={UnderlineIcon}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        isActive={editor?.isActive('underline')}
    />
)
