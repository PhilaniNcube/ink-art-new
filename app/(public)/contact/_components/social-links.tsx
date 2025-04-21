import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline" size="icon" asChild>
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook className="w-5 h-5" />
        </Link>
      </Button>

      <Button variant="outline" size="icon" asChild>
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram className="w-5 h-5" />
        </Link>
      </Button>

      <Button variant="outline" size="icon" asChild>
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <Twitter className="w-5 h-5" />
        </Link>
      </Button>

      <Button variant="outline" size="icon" asChild>
        <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <Youtube className="w-5 h-5" />
        </Link>
      </Button>
    </div>
  )
}
