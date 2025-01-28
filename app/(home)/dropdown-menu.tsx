import { Button } from '@/components/ui/button'
import { Id } from '@/convex/_generated/dataModel'
import { ExternalLink, MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import RemoveDialog from '@/components/remove-dialog'
import RenameDialog from '@/components/rename-dialog'

interface DropDownMenuProps {
    documentId: Id<"documents">
    title: string
    onNewTab: (id: Id<"documents">) => void
}

const DropDownMenu = ({ documentId, title, onNewTab }: DropDownMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                    <MoreVerticalIcon className='size-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RenameDialog documentId={documentId} initialTitle={title}>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={(e) => e.preventDefault()}>
                        <PencilIcon className='size-4 mr-2' />
                        Rename
                    </DropdownMenuItem>
                </RenameDialog>
                <RemoveDialog documentId={documentId}>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={(e) => e.preventDefault()}>
                        <TrashIcon className='size-4 mr-2' />
                        Delete
                    </DropdownMenuItem>
                </RemoveDialog>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => {
                    e.stopPropagation()
                    onNewTab(documentId)
                }}>
                    <ExternalLink className='size-4 mr-2' />
                    Open in new tab
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default DropDownMenu