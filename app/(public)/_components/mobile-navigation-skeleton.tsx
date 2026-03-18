import Link from "next/link";
import { Home } from "lucide-react";

const MobileNavigationSkeleton = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-40">
      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex flex-col items-center">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {/* Placeholder for Search */}
        <div className="h-5 w-5 bg-muted animate-pulse rounded" />

        {/* Placeholder for MobileSheet */}
        <div className="h-5 w-5 bg-muted animate-pulse rounded" />

        {/* Placeholder for Cart */}
        <div className="h-5 w-5 bg-muted animate-pulse rounded" />

        {/* Placeholder for Account */}
        <div className="flex flex-col items-center">
          <div className="h-5 w-5 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigationSkeleton;
