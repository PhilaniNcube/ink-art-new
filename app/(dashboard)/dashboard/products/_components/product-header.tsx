import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Database } from '@/utils/supabase/types'
import { ArrowLeft, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import PublishButton from './publish-button'
import { UpdateProductTitleDialog } from '../../_components/update-product-title'

const ProductHeader = ({ product }: { product: Database['public']['Tables']['products']['Row'] }) => {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <Link href="/dashboard/products" className="flex items-center">
                <Button variant="ghost" size="icon" className="mr-2">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Go back</span>
                </Button>
            </Link>

            <div className="flex flex-col">
                <div className="flex space-x-2 items-center">
                    <h1 className="text-lg font-semibold">{product.title}</h1>
                    <UpdateProductTitleDialog
                        productId={product.id}
                        currentTitle={product.title}
                    />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>ID: {product.id}</span>
                </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
                {product.is_locked && (
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                        Locked
                    </Badge>
                )}

                <Badge variant={product.visible ? "default" : "secondary"}>{product.visible ? "Visible" : "Hidden"}</Badge>

                <Button variant="outline">Preview</Button>
                <PublishButton productId={product.id} />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                            <span className="sr-only">More options</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete Product</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default ProductHeader
