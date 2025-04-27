'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Database } from '@/utils/supabase/types'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { BookOpen, ChevronRight, Grid3X3, Home, Menu, Phone, ShoppingBasket, User, Users, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const MobileSheet = ({ user, isAdmin, categories, featuredProducts }: {
  user: SupabaseUser | null, isAdmin: boolean, categories: Database["public"]["Tables"]['categories']['Row'][]
  featuredProducts: Database["public"]["Tables"]['products']['Row'][]
}) => {

  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Function to close the menu sheet
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <button className="flex flex-col items-center">
          <Menu className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs mt-1">Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
        <div className="flex flex-col h-full">
          {/* Header with logo */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <Image
                src="/images/ink-art.webp"
                alt="Logo"
                width={150}
                height={100}
                className="w-24 object-cover"
              />
            </Link>
            <SheetClose className="rounded-full hover:bg-muted p-2">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>

          {/* Scrollable content area */}
          <ScrollArea className="flex-1">
            <div className="p-4 pb-24">
              {/* User account */}
              <div className="mb-6">
                {user ? (
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Account</p>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-accent"
                    onClick={closeMenu} // Close menu on click
                  >
                    <User className="h-5 w-5" />
                    <span>Sign In / Register</span>
                  </Link>
                )}

                {user && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Link
                      href="/account"
                      className="flex items-center gap-2 text-sm py-2 px-3 rounded-md bg-muted hover:bg-muted/80"
                      onClick={closeMenu}
                    >
                      <User className="h-4 w-4" />
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="flex items-center gap-2 text-sm py-2 px-3 rounded-md bg-muted hover:bg-muted/80"
                      onClick={closeMenu}
                    >
                      <ShoppingBasket className="h-4 w-4" />
                      My Orders
                    </Link>
                  </div>
                )}

                {isAdmin && (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 mt-2 text-sm p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 w-full justify-center"
                    onClick={closeMenu}
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>

              {/* Main navigation */}
              <div className="space-y-1">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md",
                    pathname === "/" ? "bg-accent" : "hover:bg-accent"
                  )}
                  onClick={closeMenu}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="categories" className="border-none">
                    <AccordionTrigger className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-accent [&[data-state=open]]:bg-accent">
                      <div className="flex items-center gap-3">
                        <Grid3X3 className="h-5 w-5" />
                        <span>Categories</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 pt-1">
                      <div className="ml-10 space-y-1">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-accent"
                            onClick={closeMenu}
                          >
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            {category.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="featured" className="border-none">
                    <AccordionTrigger className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-accent [&[data-state=open]]:bg-accent">
                      <div className="flex items-center gap-3">
                        <ShoppingBasket className="h-5 w-5" />
                        <span>Featured Products</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 pt-1">
                      <div className="ml-10 space-y-1">
                        {featuredProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-accent"
                            onClick={closeMenu}
                          >
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            {product.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="about" className="border-none">
                    <AccordionTrigger className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-accent [&[data-state=open]]:bg-accent">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5" />
                        <span>About</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 pt-1">
                      <div className="ml-10 space-y-1">
                        <Link
                          href="/about"
                          className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-accent"
                          onClick={closeMenu}
                        >
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          Our Story
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link
                  href="/contact"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md",
                    pathname === "/contact" ? "bg-accent" : "hover:bg-accent"
                  )}
                  onClick={closeMenu}
                >
                  <Phone className="h-5 w-5" />
                  <span>Contact</span>
                </Link>

                <Link
                  href="/blog"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md",
                    pathname === "/blog" ? "bg-accent" : "hover:bg-accent"
                  )}
                  onClick={closeMenu}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Blog</span>
                </Link>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSheet
