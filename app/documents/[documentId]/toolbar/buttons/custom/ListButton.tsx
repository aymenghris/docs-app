import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor'
import { ListIcon, ListOrderedIcon } from 'lucide-react'

export const ListButton = () => {
    const { editor } = useEditorStore()

    const lists = [
        {
            label: 'Bullet List',
            icon: ListIcon,
            isActive: editor?.isActive('bulletList'),
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            label: 'Numbered List',
            icon: ListOrderedIcon,
            isActive: editor?.isActive('orderedList'),
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
                    <ListIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
                {lists.map(({ label, icon: Icon, onClick, isActive }) => (
                    <button
                        key={label}
                        onClick={onClick}
                        className={cn(
                            'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
                            isActive && 'bg-neutral-200/80',
                        )}
                    >
                        <Icon className="size-4" />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
