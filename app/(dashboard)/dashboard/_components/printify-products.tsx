import React from 'react'
import { PrintifyResponse } from '../../printify/route'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const PrintifyProducts = async () => {

    // Fetch products from Printify API
    const printifyProducts = await fetch(`${process.env.VERCEL_URL}/printify?page=1&limit=30`, {
  
    })

    const productsResponse :PrintifyResponse = await printifyProducts.json()
  


  return (
    <Card>
      <CardHeader>
        <CardTitle>Printify Product Summary</CardTitle>
        <CardDescription>
          Overview of products fetched from the Printify API.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
            <p><span className="font-medium">Total Products Found:</span> {productsResponse.total}</p>
            <p><span className="font-medium">Products on Current Page:</span> {productsResponse.data.length}</p>
            <p><span className="font-medium">Current Page:</span> {productsResponse.current_page}</p>
            <p><span className="font-medium">Total Pages:</span> {productsResponse.last_page}</p>
            <p><span className="font-medium">Products per Page:</span> {productsResponse.per_page}</p>
          </div>
      </CardContent>
    </Card>
  )
}

export default PrintifyProducts