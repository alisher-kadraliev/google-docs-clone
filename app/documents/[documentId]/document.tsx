"use client"

import { Preloaded, usePreloadedQuery } from "convex/react";
import { Editor } from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import Toolbar from "./toolbar";
import { api } from "@/convex/_generated/api";

type DocumentProps = {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
};

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);


  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <div className="flex flex-col bg-[#fafbfd] px-4 pt-2 gap-2 fixed top-0 left-0 right-0 z-10 bg-[fafbfd] print:hidden">
        <Navbar data={document}/>
        <Toolbar />
      </div>
      <div className="pt-[116px] print:pt-0">
        <Room>
          <Editor initialContent={document?.initialContent} />
        </Room>
      </div>
    </div>
  );
};

