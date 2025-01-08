import { Editor } from "./editor";
import Toolbar from "./toolbar";

type DocumentPageProps = {
  params: Promise<{ documentId: string }>;
};

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = await params;

  
  return (
    <div className="min-h-screen bg-[#fafbfd]">
      {documentId}
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentPage;
