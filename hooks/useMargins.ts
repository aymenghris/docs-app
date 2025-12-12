import { useMutation, useStorage } from '@liveblocks/react'

export const useMargins = () => {
    const leftMargin = useStorage((root) => root.leftMargin) ?? 56

    const rightMargin = useStorage((root) => root.rightMargin) ?? 56

    const setLeftMargin = useMutation(({ storage }, offset: number) => {
        storage.set('leftMargin', offset)
    }, [])

    const setRightMargin = useMutation(({ storage }, offset: number) => {
        storage.set('rightMargin', offset)
    }, [])

    return {
        leftMargin,
        rightMargin,
        setLeftMargin,
        setRightMargin,
    }
}
