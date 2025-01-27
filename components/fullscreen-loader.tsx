import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

interface FullscreenLoaderProps {
    label?: string;
    className?: string;
}

export const FullscreenLoader = ({ label, className }: FullscreenLoaderProps) => {
    return (
        <div className={cn("flex flex-col gap-2 justify-center items-center min-h-screen", className)}>
            <LoaderIcon className="animate-spin size-6 text-muted-foreground" />
            {label && <p className="text-muted-foreground">{label}</p>}
        </div>
    )
}