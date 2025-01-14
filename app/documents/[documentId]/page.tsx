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
      <Navbar />
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentPage;
