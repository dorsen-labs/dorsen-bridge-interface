import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/coin/dorsen.png"
                alt="DORSEN"
                width={32}
                height={32}
                className="rounded-lg object-contain"
              />
              <span className="text-lg font-bold text-card-foreground">
                DORSEN
              </span>
            </div>
            <p className="text-sm text-muted max-w-md">
              Data Oriented Secure Network. Secure cross-chain asset transfer
              infrastructure for the decentralized future.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-card-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Bridge
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  History
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Docs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-card-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted">Terms</span>
              </li>
              <li>
                <span className="text-sm text-muted">Privacy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted/60">
            &copy; 2026 DORSEN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
