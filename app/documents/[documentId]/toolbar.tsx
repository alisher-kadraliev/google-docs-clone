"use client"
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { BoldIcon, ChevronDownIcon, HighlighterIcon, ItalicIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, StrikethroughIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { type ColorResult, SketchPicker } from "react-color"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Level } from "@tiptap/extension-heading";

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
                <Button className="h-7 min-w-7 justify-center shrink-0 flex items-center rounded-sm hover:bg-neutral-200/80 bg-neutral-200 text-black px-1 overflow-hidden text-sm">
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
                <button className="h-7 min-w-7 justify-center shrink-0 flex flex-col items-center rounded-sm hover:bg-neutral-200/80 bg-neutral-200 text-black px-1 overflow-hidden text-sm">
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
                <button className="h-7 min-w-7 justify-center shrink-0 flex flex-col items-center rounded-sm hover:bg-neutral-200/80 bg-neutral-200 text-black px-1 overflow-hidden text-sm">
                    <span className="text-xs">A</span>
                    <div className="h-0.5 w-full " style={{backgroundColor: value}}></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
                <SketchPicker onChange={onChange} color={value} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
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
         
        </div>
    )
}