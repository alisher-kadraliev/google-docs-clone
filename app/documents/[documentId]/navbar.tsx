import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={36} height={36} />
                </Link>
                <div className="flex flex-col">
                      
                </div>
            </div>
        </nav>
    );
}