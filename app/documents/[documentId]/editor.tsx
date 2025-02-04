"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Underline from '@tiptap/extension-underline';
import Strikethrough from '@tiptap/extension-strike';
import Image from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Align from '@tiptap/extension-text-align';
import ImageResize from 'tiptap-extension-resize-image';
import { useEditorStore } from "@/store/use-editor-store";
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import Ruler from './ruler';
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from './threads';
import { useOthers, useSelf } from '@liveblocks/react';
import { Inbox } from './inbox';
import { useStorage } from '@liveblocks/react';


interface EditorProps {
  initialContent?: string | undefined
}

export const Editor = ({ initialContent }: EditorProps) => {

  const leftMargin = useStorage((root) => root.leftMargin)
  const rightMargin = useStorage((root) => root.rightMargin)
  const users = useOthers()
  const currentUser = useSelf()
  const liveblocks = useLiveblocksExtension({
    initialContent: initialContent ?? "",
    offlineSupport_experimental: true,
  });

  const { setEditor } = useEditorStore();
  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor)
    },
    onDestroy() {
      setEditor(null)
    },
    onUpdate({ editor }) {
      setEditor(editor)
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor)
    },
    onTransaction({ editor }) {
      setEditor(editor)
    },
    onContentError({ editor }) {
      setEditor(editor)
    },
    onFocus({ editor }) {
      setEditor(editor)
    },
    onBlur({ editor }) {
      setEditor(editor)
    },

    editorProps: {
      attributes: {
        style: `padding-left:${leftMargin ?? 56}px;padding-right:${rightMargin ?? 56}px;`,
        class: 'focus:outline-none print:border-0 bg-white border-[#c7c7c7] border flex flex-col min-h-[1054px] w-[816px] mx-auto cursor-text pb-10 pr-14 pt-10',
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      TaskList,
      TaskItem,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Underline,
      Image,
      ImageResize,
      Strikethrough,
      Heading,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      Link,
      Align.configure({
        types: ["heading", "paragraph"],
      }),
    ],
  })

  return (
    <div className="size-full overflow-x-auto bg-[#fafbfd] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className='min-w-max flex justify-center items-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <div className="flex items-center gap-2 fixed bottom-2 right-10">
          <Inbox />
        {currentUser && (
          <div>
            <img src={currentUser.info.avatar} alt={currentUser.info.name} width={30} height={30} className="rounded-full" />
          </div>
        )}
        {users.map(({connectionId, info}) => (
          <div key={connectionId}>
            <img src={info.avatar} alt={info.name} width={30} height={30} className="rounded-full" />
          </div>
        ))}
        </div>
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};

