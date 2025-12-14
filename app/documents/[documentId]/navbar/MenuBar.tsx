'use client'

import { Fragment, useMemo } from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar'
import { useCreateDocument } from '@/hooks/useCreateDocument'
import { useDocument } from '@/hooks/useDocument'
import { useEditorStore } from '@/stores/use-editor-store'
import { getMenuItems } from '@navbar/menu-items'
import { MenuItem } from '@navbar/menu-items/types'

export const MenuBar = () => {
    const { editor } = useEditorStore()
    const document = useDocument()

    const { create } = useCreateDocument()

    const menuItems = useMemo(
        () =>
            getMenuItems({
                editor,
                document,
                onCreateDocument: create,
            }),
        [editor, document, create],
    )

    const renderMenuItem = (menuItem: MenuItem) => {
        const {
            label,
            icon: Icon,
            submenu,
            isSubMenu,
            hasSeparator,
            shortcut,
            onClick,
        } = menuItem

        // If it has submenu and isSubMenu flag, render as MenubarSub
        if (submenu && isSubMenu) {
            return (
                <Fragment key={label}>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            {Icon && <Icon className="mr-2 size-4" />}
                            {label}
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            {submenu.map((subItem) => renderMenuItem(subItem))}
                        </MenubarSubContent>
                    </MenubarSub>
                    {hasSeparator && <MenubarSeparator />}
                </Fragment>
            )
        }

        // Otherwise, render as regular MenubarItem
        return (
            <Fragment key={label}>
                <MenubarItem onClick={onClick} className="justify-between">
                    <span className="flex items-center">
                        {Icon && <Icon className="mr-2 size-4 text-black" />}
                        {label}
                    </span>
                    {shortcut && (
                        <MenubarShortcut className="ml-4">
                            {shortcut}
                        </MenubarShortcut>
                    )}
                </MenubarItem>
                {hasSeparator && <MenubarSeparator />}
            </Fragment>
        )
    }

    return (
        <div className="flex">
            <Menubar className="h-auto border-none bg-transparent p-0 shadow-none">
                {menuItems.map((item) => (
                    <Fragment key={item.label}>
                        <MenubarMenu>
                            <MenubarTrigger className="hover:bg-muted h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal">
                                {item.label}
                            </MenubarTrigger>
                            <MenubarContent className="print:hidden">
                                {item.submenu?.map((subItem) =>
                                    renderMenuItem(subItem),
                                )}
                            </MenubarContent>
                        </MenubarMenu>
                        {item.hasSeparator && <MenubarSeparator />}
                    </Fragment>
                ))}
            </Menubar>
        </div>
    )
}
