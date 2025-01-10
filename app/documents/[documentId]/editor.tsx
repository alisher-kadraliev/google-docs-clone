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
import ImageResize from 'tiptap-extension-resize-image';
import { useEditorStore } from "@/store/use-editor-store";
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
export const Editor = () => {


  const { setEditor } = useEditorStore();
  const editor = useEditor({
    onCreate({editor}) {
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
        style: "padding-left:56px;padding-right:56px;",
        class: 'focus:outline-none print:border-0 bg-white border-[#c7c7c7] border flex flex-col min-h-[1054px] w-[816px] mx-auto cursor-text pb-10 pr-14 pt-10',
      },
    },
    extensions: [
      StarterKit,
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
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
  })

  return (
    <div className="size-full overflow-x-auto bg-[#fafbfd] px-4 print:p-0 print:bg-white print:overflow-visible">
      <div className='min-w-max flex justify-center items-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
      <EditorContent editor={editor} />
      </div>
    </div>
  );
};

