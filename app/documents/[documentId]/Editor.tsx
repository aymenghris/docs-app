'use client'

import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'
import { useEditorStore } from '@/store/use-editor'
import { Threads } from '@editor/collaboration/Threads'
import { useLiveblocksExtension } from '@liveblocks/react-tiptap'
import { Ruler } from '@ruler/Ruler'
import Highlight from '@tiptap/extension-highlight'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { TableKit } from '@tiptap/extension-table'
import TextAlign from '@tiptap/extension-text-align'
import { Color, FontFamily, TextStyle } from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageResize from 'tiptap-extension-resize-image'

export const Editor = () => {
    const liveblocks = useLiveblocksExtension()
    const { setEditor } = useEditorStore()

    const handleEditor = ({ editor }: { editor: any }) => {
        setEditor(editor)
    }

    const editor = useEditor({
        onCreate: handleEditor,
        onUpdate: handleEditor,
        onSelectionUpdate: handleEditor,
        onTransaction: handleEditor,
        onFocus: handleEditor,
        onBlur: handleEditor,
        onContentError: handleEditor,
        onDestroy() {
            setEditor(null)
        },
        editorProps: {
            attributes: {
                class: 'print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] py-10 pr-14 cursor-text  focus:outline-none',
                style: 'padding-right: 56px; padding-left: 56px;',
            },
        },
        extensions: [
            Color,
            FontFamily,
            FontSizeExtension,
            Highlight.configure({
                multicolor: true,
            }),
            ImageResize,
            LineHeightExtension,
            liveblocks,
            StarterKit.configure({
                link: {
                    openOnClick: false,
                },
                // The Liveblocks extension comes with its own history handling
                undoRedo: false,
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            TableKit.configure({
                table: { resizable: true },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TextStyle,
        ],
        immediatelyRender: false,
    })

    return (
        <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:overflow-visible print:bg-white print:p-0">
            <Ruler />
            <div className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
                <EditorContent editor={editor} />
                <Threads editor={editor} />
            </div>
        </div>
    )
}
