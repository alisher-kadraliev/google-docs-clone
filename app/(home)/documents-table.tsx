import { Doc } from '@/convex/_generated/dataModel';
import { PaginationStatus } from 'convex/react';
import {
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { LoaderIcon } from 'lucide-react';
import DocumentRow from './document-row';
import { Button } from '@/components/ui/button';

interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus;
}

const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
    return (
        <div className='max-w-screen-lg mx-auto px-16 py-6 flex flex-col gap-4'>
            {documents == undefined ?
                <div className='flex justify-center items-center h-24'>
                    <LoaderIcon className='animate-spin' />
                </div>
                : (
                    <Table>
                        <TableHeader>
                            <TableRow className='border-none hover:bg-transparent'>
                                <TableHead>Name</TableHead>
                                <TableHead>&nbsp;</TableHead>
                                <TableHead className='hidden md:table-cell'>Shared</TableHead>
                                <TableHead className='hidden md:table-cell'>Created At</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        {documents.length === 0 ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={4} className='text-center'>No documents found</TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <TableBody>
                                {documents.map((doc) => (
                                    <DocumentRow key={doc._id} document={doc} />
                                ))}
                            </TableBody>
                        )}
                    </Table>
                )}
            <div className='flex items-center justify-center'>
                <Button variant='ghost' onClick={() => loadMore(5)} disabled={status !== "CanLoadMore"}>
                    {status === "CanLoadMore" ? "Load more" : "End of results"}
                </Button>
            </div>
        </div>
    )
}

export default DocumentsTable