import { Editor } from "./editor";
import Navbar from "./navbar";
import Toolbar from "./toolbar";

type DocumentPageProps = {
  params: Promise<{ documentId: string }>;
};

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = await params;


  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <div className="hidden">{documentId}</div>
      <div className="flex flex-col px-4 pt-2 gap-2 fixed top-0 left-0 right-0 z-10 bg-[fafbfd] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[116px] print:pt-0">
        <Editor />
      </div>
    </div>
  );
};

export default DocumentPage;
