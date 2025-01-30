"use client";

import { usePaginatedQuery } from "convex/react";
import Link from "next/link";
import Navbar from "./navbar";
import TemplatesGallery from "./templates-gallery";
import { api } from "@/convex/_generated/api";
import DocumentsTable from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-param";
export default function Home() {
  const [search] = useSearchParam("search")

  const {
    results,
    status,
    loadMore,
  } = usePaginatedQuery(api.documents.get, { search }, { initialNumItems: 5 });

  return (
    <div className='min-h-screen flex flex-col'>
      <div className="top-0 fixed left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />

        <DocumentsTable
          documents={results}
          status={status}
          loadMore={loadMore}
        />
      </div>
    </div>
  );
}
