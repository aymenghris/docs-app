import type { ComponentType } from 'react'

export type MenuItem = {
    label: string
    icon?: ComponentType<{ className?: string }>
    isSubMenu?: boolean
    hasSeparator?: boolean
    shortcut?: string
    onClick?: () => void
    submenu?: MenuItem[]
}
