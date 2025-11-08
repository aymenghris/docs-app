import { FC } from 'react'
import { ToolbarButton } from '@toolbar/buttons/ToolbarButton'
import { ButtonWrapper } from '@toolbar/utils/types'
import {
    ListTodoIcon,
    MessageSquarePlusIcon,
    RemoveFormattingIcon,
} from 'lucide-react'

export const AddCommentButton = () => (
    <ToolbarButton
        label="Comment"
        icon={MessageSquarePlusIcon}
        onClick={() => console.log('Comment')}
        isActive={false} // TODO: Implement this functionality
    />
)

export const ListTodoButton: FC<ButtonWrapper> = ({ editor }) => (
    <ToolbarButton
        label="List Todo"
        icon={ListTodoIcon}
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
        isActive={editor?.isActive('taskList')}
    />
)

export const RemoveFormattingButton: FC<ButtonWrapper> = ({ editor }) => (
    <ToolbarButton
        label="Remove Formatting"
        icon={RemoveFormattingIcon}
        onClick={() => editor?.chain().focus().unsetAllMarks().run()}
    />
)
