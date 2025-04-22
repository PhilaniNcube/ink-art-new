"use client"

import { useState } from "react"
import { Check, ChevronDown, Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Database } from "@/utils/supabase/types"

interface ProductVariantsProps {
  product: Database["public"]["Tables"]["products"]["Row"]
}

export default function ProductVariants({ product }: ProductVariantsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVariants = product.variants.filter(
    (variant) =>
      variant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      variant.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Variants</h2>
          <p className="text-muted-foreground">Manage your product variants and inventory</p>
        </div>
        <Button className="sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </div>

      {product.options && product.options.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Options</CardTitle>
            <CardDescription>Product options that create variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {product.options.map((option) => (
              <div key={option.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{option.name}</h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit {option.name}</span>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value, index) => (
                    <Badge key={value.id} variant="outline">
                      {value.title}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="space-y-0 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Variant List</CardTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <span>Bulk Actions</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Update Prices</DropdownMenuItem>
                  <DropdownMenuItem>Update Inventory</DropdownMenuItem>
                  <DropdownMenuItem>Enable Selected</DropdownMenuItem>
                  <DropdownMenuItem>Disable Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 pb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search variants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <span className="sr-only">Default</span>
                  </TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-12">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVariants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No variants found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVariants.map((variant) => (
                    <TableRow key={variant.id}>
                      <TableCell>
                        {variant.is_default && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{variant.title}</TableCell>
                      <TableCell>{variant.sku}</TableCell>
                      <TableCell className="text-right">${variant.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${variant.cost.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{variant.quantity}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={!variant.is_enabled ? "outline" : variant.is_available ? "default" : "secondary"}
                        >
                          {!variant.is_enabled ? "Disabled" : variant.is_available ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
