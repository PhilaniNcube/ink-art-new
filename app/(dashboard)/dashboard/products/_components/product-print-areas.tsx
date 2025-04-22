"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, ImagePlus, Layers, Move, RotateCw, ZoomIn } from "lucide-react"

interface PrintAreaImage {
  x: number
  y: number
  id: string
  name: string
  type: string
  angle: number
  scale: number
  width: number
  height: number
}

interface PrintAreaPlaceholder {
  images: PrintAreaImage[]
  position: string
}

interface PrintArea {
  background: string
  variant_ids: number[]
  placeholders: PrintAreaPlaceholder[]
}

interface ProductPrintAreasProps {
  printAreas: PrintArea[]
}

export default function ProductPrintAreas({ printAreas }: ProductPrintAreasProps) {
  const [activePrintArea, setActivePrintArea] = useState(0)
  const [activePosition, setActivePosition] = useState<string | null>(printAreas[0]?.placeholders[0]?.position || null)

  if (printAreas.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="flex flex-col items-center gap-2 text-center">
          <Layers className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">No Print Areas</h3>
          <p className="text-sm text-muted-foreground">This product doesn't have any print areas defined.</p>
          <Button className="mt-2">
            <ImagePlus className="mr-2 h-4 w-4" />
            Add Print Area
          </Button>
        </div>
      </div>
    )
  }

  const currentPrintArea = printAreas[activePrintArea]
  const positions = currentPrintArea.placeholders.map((p) => p.position)
  const currentPlaceholder = activePosition
    ? currentPrintArea.placeholders.find((p) => p.position === activePosition)
    : null

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Print Areas</h2>
          <p className="text-muted-foreground">Manage print areas and image placeholders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Layout
          </Button>
          <Button>
            <ImagePlus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </div>
      </div>

      {printAreas.length > 1 && (
        <div className="flex gap-2">
          {printAreas.map((_, index) => (
            <Button
              key={index}
              variant={activePrintArea === index ? "default" : "outline"}
              onClick={() => setActivePrintArea(index)}
            >
              Print Area {index + 1}
            </Button>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Print area preview with {currentPrintArea.variant_ids.length} variants</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activePosition || ""} onValueChange={setActivePosition}>
              <TabsList className="mb-4">
                {positions.map((position) => (
                  <TabsTrigger key={position} value={position} className="capitalize">
                    {position}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activePosition || ""} className="mt-0">
                <div
                  className="relative aspect-square rounded-lg border"
                  style={{ backgroundColor: currentPrintArea.background }}
                >
                  {/* Placeholder for product image */}
                  <Image
                    src={`/assorted-products-display.png?height=400&width=400&query=product%20${activePosition}`}
                    alt={`Product ${activePosition} view`}
                    fill
                    className="object-contain opacity-50"
                  />

                 
                </div>

                <div className="mt-4 flex justify-center gap-2">
                  <Button variant="outline" size="sm">
                    <ZoomIn className="mr-2 h-4 w-4" />
                    Zoom
                  </Button>
                  <Button variant="outline" size="sm">
                    <Move className="mr-2 h-4 w-4" />
                    Move
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCw className="mr-2 h-4 w-4" />
                    Rotate
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Print Area Details</CardTitle>
            <CardDescription>Configuration and image placeholders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Background Color</h3>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: currentPrintArea.background }} />
                <code className="rounded bg-muted px-2 py-1 text-sm">{currentPrintArea.background}</code>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Variants</h3>
              <p className="text-sm">This print area applies to {currentPrintArea.variant_ids.length} variants</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {currentPrintArea.variant_ids.slice(0, 5).map((id) => (
                  <Badge key={id} variant="outline">
                    {id}
                  </Badge>
                ))}
                {currentPrintArea.variant_ids.length > 5 && (
                  <Badge variant="outline">+{currentPrintArea.variant_ids.length - 5} more</Badge>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Placeholders</h3>
              <div className="mt-2 space-y-3">
                {currentPrintArea.placeholders.map((placeholder, index) => (
                  <div key={index} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <Badge className="capitalize">{placeholder.position}</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-2 space-y-2">
                      {placeholder.images.map((image) => (
                        <div
                          key={image.id}
                          className="flex items-center justify-between rounded-md bg-muted p-2 text-sm"
                        >
                          <div>
                            <span className="font-medium">{image.name}</span>
                            <span className="ml-2 text-muted-foreground">({image.type})</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {image.width}×{image.height}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
