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
              <span
                className="font-extrabold text-lg tracking-tight font-sans"
                style={{
                  background: 'linear-gradient(20deg, rgb(28, 102, 166) 10%, rgb(230, 250, 236) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
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
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://swap.dorsen.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Swap
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.dorsen.org"
                  target="_blank"
                  rel="noopener noreferrer"
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
            &copy; 2026 Dorsen Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
