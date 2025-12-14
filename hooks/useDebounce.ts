import { useEffect, useMemo, useRef } from 'react'

export const useDebounce = <T extends (...args: any[]) => void>(
    callback: T,
    delay: number = 500,
) => {
    const callbackRef = useRef(callback)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const debouncedFunction = useMemo(() => {
        return (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                if (callbackRef.current) {
                    callbackRef.current(...args)
                }
            }, delay)
        }
    }, [delay])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return debouncedFunction
}
