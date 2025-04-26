
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Demo product to test the UpdateProductTitleDialog
const demoProduct = {
  id: "demo-product-id",
  title: "Demo Product Title",
}

export default function UpdateProductTitlePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Update Product Title Demo</h1>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Title Update Dialog Demo</CardTitle>
          <CardDescription>
            This page demonstrates how to use the UpdateProductTitleDialog component.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium">{demoProduct.title}</h3>
    
          </div>
          <p className="text-sm text-muted-foreground">
            Click the edit button to open the dialog and try updating the product title.
            Note that the update won't actually be saved for this demo product.
          </p>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        <h2 className="font-medium text-foreground">How to use this component:</h2>
      
      </div>
    </div>
  )
}
