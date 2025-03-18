import Link from "next/link"
import { Bitcoin, Github, Instagram, Palette, X } from "lucide-react"
export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-700"></div>
              <span className="font-bold">ColorFi</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A revolutionary Web3 platform for trading unique digital color assets with Bitcoin and AI-driven
              analytics.
            </p>
            <div className="flex space-x-4">
              <Link href="https://x.com/AdityaPat_" className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
                <span className="sr-only">X</span>
              </Link>
              <Link href="https://www.instagram.com/despicable.aditya____/" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://github.com/AdityaP700" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* <div className="space-y-4">
            <h3 className="text-sm font-medium">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>*/}
        </div> 

        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="mb-4 text-sm text-muted-foreground sm:mb-0">
            &copy; {new Date().getFullYear()} ColorFi. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Palette className="h-4 w-4" />
              <span>Powered by Web3</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Bitcoin className="h-4 w-4" />
              <span>BTC Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

