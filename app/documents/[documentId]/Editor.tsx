'use client'

import { useTiptapEditor } from '@/hooks/useTiptapEditor'
import { Threads } from '@editor/collaboration/Threads'
import { Ruler } from '@ruler/Ruler'
import { EditorContent } from '@tiptap/react'

export const Editor = () => {
    const editor = useTiptapEditor()

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
