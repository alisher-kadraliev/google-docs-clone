"use client"

import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./document-input";
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
} from "@/components/ui/menubar";
import { BoldIcon, FileIcon, FileJson, FilePenIcon, FilePlus, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, RedoIcon, RemoveFormattingIcon, TableIcon, TextIcon, TrashIcon, UnderlineIcon, UndoIcon } from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RenameDialog from "@/components/rename-dialog";
import RemoveDialog from "@/components/remove-dialog";

interface NavbarProps {
    data: Doc<"documents">
}

export default function Navbar({ data }: NavbarProps) {

    const router = useRouter()
    const { editor } = useEditorStore()
    const insertTable = (rows: number, cols: number) => {
        editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run()
    }

    const mutation = useMutation(api.documents.create)

    const onNewDocument = () => {
        mutation({
            title: "Untitled Document",
            initialContent: "",
        })
            .catch(() => {
                toast.error("Failed to create document")
            })
            .then((id) => {
                toast.success("Document created")
                router.push(`/documents/${id}`)
            })
    }

    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
    }
    const onJSONDownload = () => {
        if (!editor) return
        const content = editor.getJSON()
        const blob = new Blob([JSON.stringify(content)], { type: 'application/json' })
        onDownload(blob, `${data.title}.json`)
    }
    const onHTMLDownload = () => {
        if (!editor) return
        const content = editor.getHTML()
        const blob = new Blob([content], { type: 'text/html' })
        onDownload(blob, `${data.title}.html`)
    }
    const onTextDownload = () => {
        if (!editor) return
        const content = editor.getText()
        const blob = new Blob([content], { type: 'text/plain' })
        onDownload(blob, `${data.title}.txt`)
    }

    return (
        <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={36} height={36} />
                </Link>
                <div className="flex flex-col">
                    <DocumentInput title={data.title} id={data._id} />
                    <div className="flex">
                        <Menubar className="bg-transparent border-none shadow-none h-auto p-0">
                            <MenubarMenu>
                                <MenubarTrigger>File</MenubarTrigger>
                                <MenubarContent className="print:hidden">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className="size-4 mr-2" />
                                            Save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={onJSONDownload}>
                                                <FileJson className="size-4 mr-2" />
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem onClick={onHTMLDownload}>
                                                <GlobeIcon className="size-4 mr-2" />
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem onClick={() => window.print()}>
                                                <BsFilePdf className="size-4 mr-2" />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick={onTextDownload}>
                                                <FileTextIcon className="size-4 mr-2" />
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={onNewDocument}>
                                        <FilePlus className="size-4 mr-2" />
                                        New Document
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <RenameDialog documentId={data._id} initialTitle={data.title}>
                                        <MenubarItem
                                            onClick={(e) => e.stopPropagation()}
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <FilePenIcon className="size-4 mr-2" />
                                            Rename
                                        </MenubarItem>
                                    </RenameDialog>
                                    <RemoveDialog documentId={data._id}>
                                        <MenubarItem
                                            onClick={(e) => e.stopPropagation()}
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <TrashIcon className="size-4 mr-2" />
                                            Delete
                                        </MenubarItem>
                                    </RemoveDialog>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={() => window.print()}>
                                        <PrinterIcon className="size-4 mr-2" />
                                        Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Edit</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <UndoIcon className="size-4 mr-2" />
                                        Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                                        <RedoIcon className="size-4 mr-2" />
                                        Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                                    </MenubarItem>

                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Insert</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TableIcon className="size-4 mr-2" />
                                            Table
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => insertTable(1, 1)}>
                                                1 x 1
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable(2, 2)}>
                                                2 x 2
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable(3, 3)}>
                                                3 x 3
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable(4, 4)} >
                                                4 x 4
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>

                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Format</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className="size-4 mr-2" />
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                                <BoldIcon className="size-4 mr-2" />
                                                Bold <MenubarShortcut>Ctrl+B</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                                <ItalicIcon className="size-4 mr-2" />
                                                Italic <MenubarShortcut>Ctrl+I</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                                <UnderlineIcon className="size-4 mr-2" />
                                                Underline <MenubarShortcut>Ctrl+U</MenubarShortcut>
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                        <RemoveFormattingIcon className="size-4 mr-2" />
                                        Remove Formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-end gap-2'>

                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton />
            </div>
        </nav>
    );
}