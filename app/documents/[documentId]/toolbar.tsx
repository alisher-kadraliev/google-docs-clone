"use client"
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, StrikethroughIcon, UnderlineIcon, Undo2Icon, UploadIcon } from "lucide-react";
import { type ColorResult, SketchPicker } from "react-color";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Level } from "@tiptap/extension-heading";
import { useState } from "react";
import { Input } from "@/components/ui/input";
interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

const ListButton = () => {
    const { editor } = useEditorStore();
    const listsItem = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 justify-center shrink-0 flex flex-col items-center rounded-sm hover:bg-neutral-200/80  text-black px-1 overflow-hidden text-sm">
                    <ListIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {listsItem.map(({ label, icon: Icon, isActive, onClick }) => (
                    <button key={label} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200", isActive && "bg-neutral-200/80")} onClick={onClick}>
                        <Icon className="size-4 mr-2" />
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const AlignButton = () => {
    const { editor } = useEditorStore();
    const aligns = [
        {
            label: "Left",
            value: "left",
            icon: AlignLeftIcon,
        },
        {
            label: "Center",
            value: "center",
            icon: AlignCenterIcon,
        },
        {
            label: "Right",
            value: "right",
            icon: AlignRightIcon,
        },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 justify-center shrink-0 flex flex-col items-center rounded-sm hover:bg-neutral-200/80  text-black px-1 overflow-hidden text-sm">
                    <AlignLeftIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {aligns.map(({ label, value, icon: Icon }) => (
                    <button key={value} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200", editor?.isActive("textAlign", { textAlign: value }) && "bg-neutral-200/80")} onClick={() => editor?.chain().focus().setTextAlign(value).run()}>
                        <Icon className="size-4 mr-2" />
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ImageButton = () => {
    const { editor } = useEditorStore();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
    }

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const url = URL.createObjectURL(file);
                setImageUrl(url);
                setIsDialogOpen(false);
                onChange(url);
            }
        }
        input.click();
    }

    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 justify-center shrink-0 flex flex-col items-center rounded-sm hover:bg-neutral-200/80  text-black px-1 overflow-hidden text-sm">
                        <ImageIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="flex items-center" onClick={onUpload}>
                        <UploadIcon className="size-4 mr-2" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center" onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="size-4 mr-2" />
                        Past image url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Paste image url</DialogTitle>
                    </DialogHeader>
                    <Input placeholder="Paste image url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleImageUrlSubmit();
                        }
                    }} />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>Apply</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
const LinkButton = () => {
    const { editor } = useEditorStore();

    const [value, setValue] = useState(editor?.getAttributes("link").href || "");

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("");
    }
    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href || "");
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 justify-center shrink-0 flex flex-col items-center rounded-sm hover:bg-neutral-200/80  text-black px-1 overflow-hidden text-sm">
                    <LinkIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 flex items-center gap-x-2">
                <Input placeholder="www.example.com" type="url" value={value} onChange={(e) => setValue(e.target.value)} />
                <Button onClick={() => onChange(value)}>Apply</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const HeadingLevelButton = () => {
    const { editor } = useEditorStore();
    const heading = [
        {
            label: "Normal text",
            value: 0,
            fontSize: "16px",
        },
        {
            label: "Heading 1",
            value: 1,
            fontSize: "32px",
        },
        {
            label: "Heading 2",
            value: 2,
            fontSize: "24px",
        },
        {
            label: "Heading 3",
            value: 3,
            fontSize: "20px",
        },
        {
            label: "Heading 4",
            value: 4,
            fontSize: "18px",
        },
        {
            label: "Heading 5",
            value: 5,
            fontSize: "16px",
        },
        {
            label: "Heading 6",
            value: 6,
            fontSize: "14px",
        },
    ]

    const getCurrentHeadingLevel = () => {
        for (let level = 1; level <= 6; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        }
        return "Normal text";
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="h-7 min-w-7 justify-center shrink-0 flex items-center rounded-sm hover:bg-neutral-200/80 bg-transparent text-black px-1 overflow-hidden text-sm">
                    <span className="">{getCurrentHeadingLevel()}</span>
                    <ChevronDownIcon className="size-4 ml-2 shrink-0" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {heading.map(({ label, value, fontSize }) => (
                    <button
                        key={value}
                        style={{ fontSize }}
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run();
                            } else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                            }
                        }}
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200",
                            (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
                        )}>
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const HighlightColorButton = () => {
    const { editor } = useEditorStore();
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    }
    const value = editor?.getAttributes("highlight").color || "#ffffff";
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 justify-center shrink-0 flex flex-col items-center rounded-sm hover:bg-neutral-200/80  text-black px-1 overflow-hidden text-sm">
                    <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
                <SketchPicker onChange={onChange} color={value} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const TextColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("textStyle").color || "#000000";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 justify-center shrink-0 flex flex-col items-center rounded-sm hover:bg-neutral-200/80  text-black px-1 overflow-hidden text-sm">
                    <span className="text-xs">A</span>
                    <div className="h-0.5 w-full " style={{ backgroundColor: value }}></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
                <SketchPicker onChange={onChange} color={value} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
}: ToolbarButtonProps) => {
    return (
        <button onClick={onClick} className={cn("text-sm h-8 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 ",
            isActive && "bg-neutral-200/80")}>
            <Icon className="size-4" />
        </button>
    )
}

export default function Toolbar() {
    const { editor } = useEditorStore();
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),

                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                    },
                },
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                    isActive: editor?.isActive("bold"),
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                    isActive: editor?.isActive("italic"),
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                    isActive: editor?.isActive("underline"),
                },
                {
                    label: "Strikethrough",
                    icon: StrikethroughIcon,
                    onClick: () => editor?.chain().focus().toggleStrike().run(),
                    isActive: editor?.isActive("strike"),
                },

            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    onClick: () => console.log("Comment"),
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("taskList"),
                },
                {
                    label: "List Ordered",
                    icon: ListOrderedIcon,
                    onClick: () => editor?.chain().focus().toggleOrderedList().run(),
                    isActive: editor?.isActive("orderedList"),
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),

                }
            ]
        ]
    return (
        <div className="bg-[#f1f4f9] px-4 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {
                sections[0].map((item) => (
                    <ToolbarButton key={item.label} {...item} />
                ))
            }
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {
                sections[1].map((item) => (
                    <ToolbarButton key={item.label} {...item} />
                ))
            }
            < TextColorButton />
            < HighlightColorButton />

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {
                sections[2].map((item) => (
                    <ToolbarButton key={item.label} {...item} />
                ))
            }
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <ImageButton />
            <LinkButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <AlignButton />
            <ListButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        </div>
    )
}