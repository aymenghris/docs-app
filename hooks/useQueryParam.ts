import { parseAsString, useQueryState } from 'nuqs'

/**
 * Custom hook for managing a URL query parameter as a string state.
 *
 * This hook provides a React state-like interface for synchronizing component state
 * with URL query parameters. The parameter value is automatically synced with the URL,
 * allowing for shareable and bookmarkable application states.
 *
 * @param key - The name of the query parameter in the URL (e.g., 'search', 'filter')
 * @returns A tuple containing the current value and a setter function, similar to useState
 *
 * @example
 * ```tsx
 * const [search, setSearch] = useQueryParam('q')
 * // URL: ?q=hello
 * console.log(search) // "hello"
 * setSearch('world') // Updates URL to ?q=world
 * setSearch('') // Removes the parameter from URL entirely
 * ```
 *
 * Features:
 * - Defaults to an empty string when the parameter is not present in the URL
 * - Automatically removes the parameter from the URL when set to empty string (clearOnDefault: true)
 * - Keeps URL clean by not showing empty parameters
 * - Supports browser back/forward navigation
 */
export const useQueryParam = (key: string) => {
    return useQueryState(
        key,
        parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    )
}
