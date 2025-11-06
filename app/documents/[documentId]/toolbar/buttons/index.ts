import {
    FontFamilyButton,
    HeadingLevelButton,
    TextColorButton,
    TextHighlightButton,
} from '@toolbar/buttons/custom'
import {
    PrintButton,
    RedoButton,
    SpellCheckButton,
    UndoButton,
} from '@toolbar/buttons/sections/Actions'
import {
    BoldToggleButton,
    ItalicToggleButton,
    UnderlineToggleButton,
} from '@toolbar/buttons/sections/TextFormatting'
import {
    AddCommentButton,
    ListTodoButton,
    RemoveFormattingButton,
} from '@toolbar/buttons/sections/Tools'

export const sectionsButtons = [
    [UndoButton, RedoButton, PrintButton, SpellCheckButton],
    [FontFamilyButton],
    [HeadingLevelButton],
    [BoldToggleButton, ItalicToggleButton, UnderlineToggleButton],
    [TextColorButton, TextHighlightButton],
    [AddCommentButton, ListTodoButton, RemoveFormattingButton],
]
