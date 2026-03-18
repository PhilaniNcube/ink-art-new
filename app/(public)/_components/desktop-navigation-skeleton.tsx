import Image from "next/image";
import Link from "next/link";

const DesktopNavigationSkeleton = () => {
  return (
    <div className="px-4 lg:px-0 py-2 border-b hidden lg:block bg-white shadow top-0 left-0 right-0 z-50 sticky">
      <header className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/ink-art.webp"
              alt="Logo"
              width={209}
              height={136}
              className="w-32 object-cover"
            />
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Placeholder for MegaMenu */}
              <div className="h-8 w-48 bg-muted animate-pulse rounded" />
            </div>
            <div className="flex items-center space-x-4">
              {/* Placeholder for Search, User, Cart */}
              <div className="h-8 w-8 bg-muted animate-pulse rounded" />
              <div className="h-8 w-8 bg-muted animate-pulse rounded" />
              <div className="h-8 w-8 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default DesktopNavigationSkeleton;
