
import { Database } from '@/utils/supabase/types'
import React from 'react'

import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { BookAIcon, BookIcon, Clock, Facebook, Grid3X3, Instagram, Mail, MapPin, PenLine, Phone, ShoppingBasket, Twitter, Users } from 'lucide-react'
import Image from 'next/image'

type PageProps = {
  categories: Database["public"]["Tables"]['categories']['Row'][]
  featuredProducts: Database["public"]["Tables"]['products']['Row'][]
}


const MegaMenu = ({ categories, featuredProducts }: PageProps) => {
  return (
    <NavigationMenu className='w-full'>
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <NavigationMenuTrigger className='h-10 px-4 py-2'>
            <Grid3X3 className="mr-2 h-4 w-4" />
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-[800px]">
            <div className="grid w-[600px] gap-3 p-4 md:w-[800px] md:grid-cols-3 lg:w-[900px]">
              {categories.map((category) => (
                <NavigationMenuLink asChild key={category.id}>
                  <Link

                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    )}
                    href={`/categories/${category.slug}`}
                  >
                    <div className="text-sm font-medium leading-none hover:underline">{category.title}</div>

                  </Link>
                </NavigationMenuLink>
              ))}


            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='h-10 px-4 py-2'>
            <ShoppingBasket className="mr-2 h-4 w-4" />
            Featured Products
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-[800px]">
            <div className="grid w-[600px] gap-3 p-4 md:w-[800px] md:grid-cols-3 lg:w-[900px]">
              {featuredProducts.map((product) => (
                <NavigationMenuLink asChild key={product.id}>
                  <Link

                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    )}
                    href={`/products/${product.id}`}
                  >
                    <div className="text-sm font-medium leading-none hover:underline line-clamp-1">{product.title}</div>

                  </Link>
                </NavigationMenuLink>
              ))}


            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10 px-4 py-2">
            <Users className="mr-2 h-4 w-4" />
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] gap-3 p-4 md:w-[800px] md:grid-cols-2 lg:w-[900px]">
              <div className="col-span-1">
                <h3 className="font-medium text-lg mb-2">Our Story</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ink Art was founded in 2010 with a passion for bringing beautiful artwork to homes around the world.
                  Our canvas prints are made with premium materials and crafted with care.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-md border p-3">
                    <h4 className="font-medium mb-1">Our Mission</h4>
                    <p className="text-xs text-muted-foreground">To make beautiful art accessible to everyone.</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <h4 className="font-medium mb-1">Our Vision</h4>
                    <p className="text-xs text-muted-foreground">To inspire creativity in every home.</p>
                  </div>
                </div>
              </div>
              <div className="col-span-1">

                <div className="mt-4">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className="block select-none rounded-md p-2 text-center font-medium leading-none no-underline outline-none transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Learn More About Us
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10 px-4 py-2">
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] gap-3 p-4 md:w-[800px] md:grid-cols-2 lg:w-[900px]">
              <div className="col-span-1">
                <h3 className="font-medium text-lg mb-2">Get In Touch</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">123 Art Street, Canvas City, CA 90210</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">hello@inkart.com</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Mon-Fri: 9am-6pm, Sat: 10am-4pm</span>
                  </li>
                </ul>
                <div className="mt-4 flex space-x-3">
                  <Link href="#" className="rounded-full bg-muted p-2 hover:bg-muted/80">
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link href="#" className="rounded-full bg-muted p-2 hover:bg-muted/80">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="rounded-full bg-muted p-2 hover:bg-muted/80">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </div>
              </div>
              <div className="col-span-1">
                <h3 className="font-medium text-lg mb-2">Customer Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our customer support team is available to help you with any questions or concerns.
                </p>
                <div className="space-y-3">
                  <div className="rounded-md border p-3">
                    <h4 className="font-medium mb-1">Shipping & Returns</h4>
                    <p className="text-xs text-muted-foreground">
                      Learn about our shipping policies and return process.
                    </p>
                    <Link href="/shipping" className="text-xs font-medium text-primary mt-1 inline-block">
                      View Policy →
                    </Link>
                  </div>
                  <div className="rounded-md border p-3">
                    <h4 className="font-medium mb-1">FAQ</h4>
                    <p className="text-xs text-muted-foreground">Find answers to commonly asked questions.</p>
                    <Link href="/faq" className="text-xs font-medium text-primary mt-1 inline-block">
                      View FAQ →
                    </Link>
                  </div>
                </div>
                <div className="mt-4">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className="block select-none rounded-md p-2 text-center font-medium leading-none no-underline outline-none transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Contact Us
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/blog" className={cn(navigationMenuTriggerStyle, "flex items-center h-10 px-4 py-2")}>
              <PenLine className="mr-2 h-4 w-4" />
              Blog
            </Link>

          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MegaMenu


const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"