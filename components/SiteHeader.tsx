import Link from 'next/link';

export default function SiteHeader() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-white no-underline">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="4" rx="1" fill="white" />
              <rect x="9" y="1" width="6" height="4" rx="1" fill="white" opacity="0.6" />
              <rect x="1" y="7" width="14" height="2" rx="1" fill="white" opacity="0.4" />
              <rect x="1" y="11" width="10" height="2" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight">OGPix</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-white/60 sm:flex">
          <Link href="/#demo" className="transition-colors hover:text-white">Demo</Link>
          <Link href="/#pricing" className="transition-colors hover:text-white">Pricing</Link>
          <Link href="/templates" className="transition-colors hover:text-white">Templates</Link>
        </div>
        <Link
          href="/#get-key"
          className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-400"
        >
          Get API Key
        </Link>
      </div>
    </nav>
  );
}
