"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Id } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface RenameDialogProps {
    documentId: Id<"documents">
    children: React.ReactNode
    initialTitle: string
}

const RenameDialog = ({ documentId, children, initialTitle }: RenameDialogProps) => {

    const update = useMutation(api.documents.updateById)
    const [title, setTitle] = useState(initialTitle)
    const [open, setOpen] = useState(false)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        update({ id: documentId, title: title.trim() || "Untitled" })
            .finally(() => setOpen(false))
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename your document</DialogTitle>
                        <DialogDescription>
                            Enter a new name for your document.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='my-4'>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Document name'
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant='ghost' type='button' onClick={(e) => { setOpen(false); e.stopPropagation()}}>Cancel</Button>
                        <Button type='submit' onClick={(e) => e.stopPropagation()}>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default RenameDialog