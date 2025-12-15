import { FC } from 'react'
import {
    AnchoredThreads,
    FloatingComposer,
    FloatingThreads,
} from '@liveblocks/react-tiptap'
import { ClientSideSuspense, useThreads } from '@liveblocks/react/suspense'
import type { Editor } from '@tiptap/react'

interface ThreadsProps {
    editor: Editor | null
}

export const Threads = ({ editor }: ThreadsProps) => (
    <ClientSideSuspense fallback={null}>
        <ThreadsList editor={editor} />
    </ClientSideSuspense>
)

const ThreadsList: FC<ThreadsProps> = ({ editor }) => {
    const { threads } = useThreads({ query: { resolved: false } })

    return (
        <>
            <div className="anchored-threads">
                <AnchoredThreads editor={editor} threads={threads} />
            </div>
            <FloatingThreads
                editor={editor}
                threads={threads}
                className="floating-threads"
            />
            <FloatingComposer editor={editor} className="floating-composer" />
        </>
    )
}
