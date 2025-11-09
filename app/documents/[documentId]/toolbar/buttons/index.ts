import {
    AlignButton,
    FontFamilyButton,
    HeadingLevelButton,
    ImageButton,
    LinkButton,
    ListButton,
    TextColorButton,
    TextHighlightButton,
} from '@toolbar/buttons/custom'
import {
    PrintButton,
    RedoButton,
    SpellCheckButton,
    UndoButton,
} from '@toolbar/buttons/sections/ActionsSection'
import {
    BoldToggleButton,
    ItalicToggleButton,
    UnderlineToggleButton,
} from '@toolbar/buttons/sections/TextFormattingSection'
import {
    AddCommentButton,
    ListTodoButton,
    RemoveFormattingButton,
} from '@toolbar/buttons/sections/ToolsSection'

export const sectionsButtons = [
    [UndoButton, RedoButton, PrintButton, SpellCheckButton],
    [FontFamilyButton],
    [HeadingLevelButton],
    [BoldToggleButton, ItalicToggleButton, UnderlineToggleButton],
    [TextColorButton, TextHighlightButton],
    [LinkButton, ImageButton],
    [
        AlignButton,
        ListButton,
        AddCommentButton,
        ListTodoButton,
        RemoveFormattingButton,
    ],
]
