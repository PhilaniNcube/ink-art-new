"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Download, Eye, ImagePlus, MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProductImagesProps {
  images: {
    src: string
    position: string
    is_default: boolean
    variant_id: number
    variant_ids: number[]
    is_selected_for_publishing: boolean
  }[]
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [activePosition, setActivePosition] = useState<string>("all")

  console.log("Product Images", images)

  // Get unique positions
    const positions = Array.from(new Set(images.map((image) => image.position)))

  // Filter images based on active position
  const filteredImages = activePosition === "all" ? images : images.filter((image) => image.position === activePosition)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Product Images</h2>
          <p className="text-muted-foreground">Manage your product images and positions</p>
        </div>
        <Button className="sm:w-auto">
          <ImagePlus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Image Gallery</CardTitle>
          <CardDescription>View and manage product images</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={activePosition} onValueChange={setActivePosition}>
            <TabsList className="mb-4">
              {positions.map((position) => (
                <TabsTrigger key={position} value={position} className="capitalize">
                  {position}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activePosition} className="mt-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredImages.map((image, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-lg border bg-background">
                    <div className="relative aspect-square">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={`Product ${image.position} view`}
                        fill
                        className="object-cover"
                      />
                      {image.is_default && <Badge className="absolute left-2 top-2">Default</Badge>}
                      {image.is_selected_for_publishing && (
                        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="capitalize">
                          {image.position}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>Set as Default</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {image.variant_ids.length} variant{image.variant_ids.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
