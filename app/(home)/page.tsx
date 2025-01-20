import Link from "next/link";
import Navbar from "./navbar";
import TemplatesGallery from "./templates-gallery";

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className="top-0 fixed left-0 right-0 z-10 h-16 bg-white p-4">
      <Navbar />
      </div>
        <div className="mt-16"> 
        <TemplatesGallery />
      </div>
   </div>
  );
}
