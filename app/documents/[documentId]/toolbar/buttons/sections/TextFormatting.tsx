import { FC } from 'react'
import { Button } from '@toolbar/buttons/Button'
import { ButtonWrapper } from '@toolbar/utils/types'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

export const BoldToggleButton: FC<ButtonWrapper> = ({ editor }) => (
    <Button
        label="Bold"
        icon={BoldIcon}
        onClick={() => editor?.chain().focus().toggleBold().run()}
        isActive={editor?.isActive('bold')}
    />
)

export const ItalicToggleButton: FC<ButtonWrapper> = ({ editor }) => (
    <Button
        label="Italic"
        icon={ItalicIcon}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        isActive={editor?.isActive('italic')}
    />
)

export const UnderlineToggleButton: FC<ButtonWrapper> = ({ editor }) => (
    <Button
        label="Underline"
        icon={UnderlineIcon}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        isActive={editor?.isActive('underline')}
    />
)
