import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useEditorStore } from '@/stores/use-editor-store'
import { Link2Icon } from 'lucide-react'

export const LinkButton = () => {
    const { editor } = useEditorStore()

    const [linkHref, setLinkHref] = useState('')

    const applyLink = (href: string) => {
        editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
        setLinkHref('')
    }

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            setLinkHref(editor?.getAttributes('link')?.href || '')
        }
    }

    return (
        <DropdownMenu onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <button className="flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
                    <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex items-center gap-x-2 p-2.5">
                <Input
                    placeholder="https://example.com"
                    value={linkHref}
                    onChange={(e) => setLinkHref(e.target.value)}
                />
                <Button onClick={() => applyLink(linkHref)}>Apply</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
