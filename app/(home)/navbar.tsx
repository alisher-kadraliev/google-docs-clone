import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SearchInput from './search-input'
import {UserButton} from "@clerk/nextjs"
const Navbar = () => {
    return (
        <nav className='flex justify-between items-center h-full w-full'>
            <div className='gap-3 shrink-0 flex items-center pr-6'>
                <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={36} height={36} />
                </Link>
                <h3 className='text-lg font-medium'>Dock</h3>
            </div>
            <SearchInput />
            <UserButton />
        </nav>
    )
}

export default Navbar