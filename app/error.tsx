"use client"
import { Button } from '@/components/ui/button'
import { AlertTriangleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Error = ({
    error,
    reset
}:{
    error:Error
    reset:()=>void
}) => {
  return (
      <div className='min-h-screen flex flex-col items-center justify-center space-y-4'>
          <div className='text-center space-y-4'>
              <div className='flex justify-center'>
                  <div className='bg-rose-100 p-3 rounded-full'>
                      <AlertTriangleIcon className='size-10 text-rose-500' />
                  </div>
              </div>
              <h1 className='text-2xl font-bold'>Something went wrong</h1>
              <p className='text-gray-500'>{error.message}</p>
          </div>
          <div className='flex justify-center'>
              <Button onClick={reset}>Try again</Button>
              <Link href='/'>
                  <Button className='ml-2' variant='outline'>Go back</Button>
              </Link>
          </div>
    </div>
  )
}

export default Error