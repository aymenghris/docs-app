import { useCallback } from 'react'
import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'
import { useMargins } from '@/hooks/useMargins'
import { useDocumentInitContentStore } from '@/stores/use-document-init-content-store'
import { useEditorStore } from '@/stores/use-editor-store'
import { useLiveblocksExtension } from '@liveblocks/react-tiptap'
import Highlight from '@tiptap/extension-highlight'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { TableKit } from '@tiptap/extension-table'
import TextAlign from '@tiptap/extension-text-align'
import { Color, FontFamily, TextStyle } from '@tiptap/extension-text-style'
import { type Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageResize from 'tiptap-extension-resize-image'

export const useTiptapEditor = () => {
    const { setEditor } = useEditorStore()
    const documentInitialContent = useDocumentInitContentStore(
        (state) => state.initContent,
    )

    const liveblocks = useLiveblocksExtension({
        initialContent: documentInitialContent,
        offlineSupport_experimental: true,
    })

    const { leftMargin, rightMargin } = useMargins()

    const report = useCallback(({ editor }: { editor: Editor }) => {
        setEditor(editor)
    }, [])

    return useEditor({
        autofocus: true,

        onCreate: report,
        onUpdate: report,
        onSelectionUpdate: report,
        onTransaction: report,
        onFocus: report,
        onBlur: report,
        onContentError: report,
        onDestroy() {
            setEditor(null)
        },
        editorProps: {
            attributes: {
                class: 'print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] py-10 pr-14 cursor-text  focus:outline-none',
                style: `padding-right: ${rightMargin}px; padding-left: ${leftMargin}px;`,
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
}
