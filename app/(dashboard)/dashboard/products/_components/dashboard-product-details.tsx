import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Database } from '@/utils/supabase/types'
import { formatDate } from 'date-fns'
import { CalendarIcon, TagIcon } from 'lucide-react'
import React from 'react'

const DashboardProductDetails = ({ product }: { product: Database['public']['Tables']['products']['Row'] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Product details and metadata</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
            <p className="text-base">{product.title}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <div className="text-base">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
            <p className="text-base">{product.category || "Uncategorized"}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {product.tags.length > 0 ? (
                product.tags.map((tag, index) => (
                  <Badge key={`${tag}-${index}`} variant="secondary" className="flex items-center gap-1">
                    <TagIcon className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">No tags</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Product features and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Featured Product</span>
              <Badge variant={product.featured ? "default" : "outline"}>{product.featured ? "Yes" : "No"}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Two-Day Delivery</span>
              <Badge variant={product.twodaydelivery_enabled ? "default" : "outline"}>
                {product.twodaydelivery_enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            {product.print_details && (
              <div className="flex items-center justify-between">
                <span className="text-sm">Print Side</span>
                <Badge variant="outline">{product.print_details.print_on_side}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
            <CardDescription>System information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Created:</span>
              <span>{formatDate(new Date(product.created_at!), 'PPP')}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Updated:</span>
              <span>{formatDate(product.updated_at!, 'PPP')}</span>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Blueprint ID:</span>
                <p>{product.blueprint_id}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Provider ID:</span>
                <p>{product.print_provider_id}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Shop ID:</span>
                <p>{product.shop_id}</p>
              </div>

            </div>
           
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardProductDetails
