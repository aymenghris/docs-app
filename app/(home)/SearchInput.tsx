'use client'

import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQueryParam } from '@/hooks/useQueryParam'
import { cn } from '@/lib/utils'
import { SearchIcon, XIcon } from 'lucide-react'

export const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useQueryParam('search')
    const [inputValue, setInputValue] = useState(searchQuery)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleSearchClear = () => {
        setInputValue('')
        void setSearchQuery('')
        inputRef.current?.blur()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        void setSearchQuery(inputValue)
        inputRef.current?.blur()
    }

    return (
        <div className="flex flex-1 items-center justify-center">
            <form
                className="relative w-full max-w-[720px]"
                onSubmit={handleSubmit}
            >
                <Input
                    value={inputValue}
                    onChange={handleSearchChange}
                    ref={inputRef}
                    className={cn(
                        'h-12 w-full px-14',
                        'rounded-full bg-blue-50/30',
                        'placeholder:text-neutral-600 focus:bg-white',
                        'md:text-base',
                    )}
                    placeholder="Search"
                />
                <IconButton type="submit" icon={SearchIcon} position="left" />
                {inputValue && (
                    <IconButton
                        type="button"
                        icon={XIcon}
                        position="right"
                        onClick={handleSearchClear}
                    />
                )}
            </form>
        </div>
    )
}

type IconButtonProps = {
    type: 'submit' | 'button'
    icon: React.ComponentType<{ className?: string }>
    position: 'left' | 'right'
    onClick?: () => void
}

const IconButton: React.FC<IconButtonProps> = ({
    type,
    icon: Icon,
    position,
    onClick,
}) => (
    <Button
        type={type}
        variant="ghost"
        size="icon"
        className={`absolute top-1/2 ${position === 'left' ? 'left-3' : 'right-3'} -translate-y-1/2 rounded-full`}
        onClick={onClick}
    >
        <Icon className="size-5" />
    </Button>
)
