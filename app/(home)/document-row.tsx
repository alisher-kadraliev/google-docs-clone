import {
    TableCell, TableRow
} from "@/components/ui/table"
import { Doc, Id } from '@/convex/_generated/dataModel'
import { SiGoogledocs } from 'react-icons/si'
import { Building2Icon, CircleUserIcon } from 'lucide-react'
import { format } from 'date-fns'
import DropDownMenu from "./dropdown-menu"
import { useRouter } from "next/navigation"
interface DocumentRowProps {
    document: Doc<"documents">
}

const DocumentRow = ({ document }: DocumentRowProps) => {
    const router = useRouter()
    const onNewTabClick = (id: Id<"documents">) => {
        window.open(`/documents/${id}`, "_blank")
    }

    return (
        <TableRow onClick={() => router.push(`/documents/${document._id}`)} className='cursor-pointer'>
            <TableCell className='w-[50px]'>
                <SiGoogledocs className='size-6 fill-blue-500' />
            </TableCell>
            <TableCell className='font-medium md:w-[45%]'>
                {document.title}
            </TableCell>
            <TableCell className='text-muted-foreground hidden md:flex items-center gap-2'>
                {document.organizationId ? <Building2Icon className='size-4' /> : <CircleUserIcon className='size-4' />}
                {document.organizationId ? "Organization" : "Personal"}
            </TableCell> 
            <TableCell className='text-muted-foreground max-lg:hidden'>
                {format(new Date(document._creationTime), "MMM d, yyyy")}
            </TableCell>
            <TableCell className='text-muted-foreground'>
                <DropDownMenu
                    documentId={document._id}
                    title={document.title}
                    onNewTab={onNewTabClick}
                />
            </TableCell>
        </TableRow>
    )
}

export default DocumentRow