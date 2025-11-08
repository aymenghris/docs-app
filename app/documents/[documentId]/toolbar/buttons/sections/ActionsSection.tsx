import { FC } from 'react'
import { ToolbarButton } from '@toolbar/buttons/ToolbarButton'
import { ButtonWrapper } from '@toolbar/utils/types'
import { PrinterIcon, Redo2Icon, SpellCheckIcon, Undo2Icon } from 'lucide-react'

export const UndoButton: FC<ButtonWrapper> = ({ editor }) => (
    <ToolbarButton
        label="Undo"
        icon={Undo2Icon}
        onClick={() => editor?.chain().focus().undo().run()}
    />
)

export const RedoButton: FC<ButtonWrapper> = ({ editor }) => (
    <ToolbarButton
        label="Redo"
        icon={Redo2Icon}
        onClick={() => editor?.chain().focus().redo().run()}
    />
)

export const PrintButton = () => (
    <ToolbarButton
        label="Print"
        icon={PrinterIcon}
        onClick={() => window.print()}
    />
)

export const SpellCheckButton: FC<ButtonWrapper> = ({ editor }) => (
    <ToolbarButton
        label="Spell Check"
        icon={SpellCheckIcon}
        onClick={() => {
            const current = editor?.view.dom.getAttribute('spellcheck')
            editor?.view.dom.setAttribute(
                'spellcheck',
                current === 'true' ? 'false' : 'true',
            )
        }}
    />
)
