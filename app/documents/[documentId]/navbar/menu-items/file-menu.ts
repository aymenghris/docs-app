import { EditorDocumentArgs, MenuItem } from '@navbar/menu-items/types'
import {
    FileIcon,
    FileJsonIcon,
    FilePenIcon,
    FilePlusIcon,
    FileTextIcon,
    GlobeIcon,
    PrinterIcon,
    TrashIcon,
} from 'lucide-react'
import { BsFilePdf } from 'react-icons/bs'

export const getFileMenu = ({
    editor,
    document: documentInfo,
}: EditorDocumentArgs): MenuItem => {
    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url

        /**
         * When this attribute is present,
         * clicking the link tells the browser to download the linked resource instead of navigating to it.
         */
        link.download = filename

        document.body.appendChild(link)
        link.click()

        // Cleanup
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const handleSaveJSON = () => {
        if (!editor) return
        const content = editor.getJSON()
        const blob = new Blob([JSON.stringify(content)], {
            type: 'application/json',
        })
        onDownload(blob, `${documentInfo.title}.json`)
    }

    const handleSaveHTML = () => {
        if (!editor) return
        const content = editor.getHTML()
        const blob = new Blob([content], { type: 'text/html' })

        onDownload(blob, `${documentInfo.title}.html`)
    }

    const handleSaveText = () => {
        if (!editor) return
        const content = editor.getText()
        const blob = new Blob([content], { type: 'text/plain' })
        onDownload(blob, `${documentInfo.title}.txt`)
    }

    return {
        label: 'File',
        submenu: [
            {
                label: 'Save',
                icon: FileIcon,
                isSubMenu: true,
                submenu: [
                    {
                        label: 'JSON',
                        icon: FileJsonIcon,
                        onClick: handleSaveJSON,
                    },
                    { label: 'HTML', icon: GlobeIcon, onClick: handleSaveHTML },
                    {
                        label: 'PDF',
                        icon: BsFilePdf,
                        onClick: () => window.print(),
                    },
                    {
                        label: 'Text',
                        icon: FileTextIcon,
                        onClick: handleSaveText,
                    },
                ],
            },
            {
                label: 'New Document',
                icon: FilePlusIcon,
                hasSeparator: true,
            },
            { label: 'Rename', icon: FilePenIcon },
            { label: 'Delete', icon: TrashIcon, hasSeparator: true },
            {
                label: 'Print',
                icon: PrinterIcon,
                shortcut: '⌘P',
                onClick: () => window.print(),
            },
        ],
    }
}
