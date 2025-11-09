import { ChangeEvent, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useEditorStore } from '@/store/use-editor'
import { ImageIcon, SearchIcon, UploadIcon } from 'lucide-react'

export const ImageButton = () => {
    const { editor } = useEditorStore()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [imageUrl, setImageUrl] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const applyImage = (src: string) => {
        editor?.chain().focus().setImage({ src }).run()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        console.log('input has been changed', file.name, file.type, file.size)

        if (!file.type.startsWith('image/')) {
            console.error('Invalid file type')
            return
        }

        // Validate file size (e.g., 5MB limit)
        const maxSize = 5 * 1024 * 1024
        if (file.size > maxSize) {
            console.error('File too large')
            return
        }

        const imageUrl = URL.createObjectURL(file)
        applyImage(imageUrl)

        // Clean up the blob URL after a delay to ensure the image loads
        setTimeout(() => {
            URL.revokeObjectURL(imageUrl)
        }, 100)
    }

    const onImageUpload = () => {
        fileInputRef.current?.click()
    }

    const handleImageUrlSubmit = () => {
        applyImage(imageUrl)
        setImageUrl('')
        setIsDialogOpen(false)
    }

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload image"
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
                        <ImageIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onImageUpload}>
                        <UploadIcon className="mr-2 size-4" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="mr-2 size-4" />
                        Paste Image URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="pb-2">
                            Paste Image URL
                        </DialogTitle>
                        <Input
                            placeholder="Insert image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleImageUrlSubmit()
                            }}
                        />
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>Insert</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
