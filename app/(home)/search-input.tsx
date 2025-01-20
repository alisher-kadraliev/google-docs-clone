'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, XIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useSearchParam } from '@/hooks/use-search-param'

const SearchInput = () => {
    const [searchValue, setSearchValue] = useSearchParam('search')
    
    const [value, setValue] = useState(searchValue)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        setSearchValue(e.target.value)
    }
    const handleClear = () => {
        setValue('')
        setSearchValue('')
        inputRef.current?.focus()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchValue(value)
        inputRef.current?.blur()
    }

    return (
        <div className='flex-1 flex items-center justify-center'>
            <form action="" onSubmit={handleSubmit} className='relative max-w-[720px] w-full'>
                <Input value={value}
                    onChange={handleChange}
                    ref={inputRef}
                    type="text"
                    placeholder='Search'
                    className='md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_3px_0_rgba(65,69,73,.3),0_1px_6px_1px_rgba(65,69,73,.15)] bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white' />
                <Button
                    type='submit'
                    variant='ghost'
                    size='icon'
                    className='absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'>
                    <SearchIcon className='w-5 h-5' />
                </Button>
                {value && (
                    <Button onClick={handleClear} type='button' variant='ghost' size='icon' className='absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'>
                        <XIcon className='w-5 h-5' />
                    </Button>
                )}
            </form>
        </div>
    )
}

export default SearchInput