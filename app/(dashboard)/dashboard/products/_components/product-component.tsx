"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, PrintifyProduct } from '@/utils/supabase/types';
import React from 'react'
import DashboardProductDetails from './dashboard-product-details';
import ProductVariants from './product-variants';
import ProductImages from './product-images';
import ProductPrintAreas from './product-print-areas';

const ProductComponent = ({product, printifyProduct}:{product:Database['public']['Tables']['products']['Row'], printifyProduct:PrintifyProduct | null}) => {

    const [activeTab, setActiveTab] = React.useState("details")

    // fetch the printify product details using the product_id from the product object in a useEffect






  return (
     <main className="flex-1 p-6 pt-2">
             <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="print-areas">Print Areas</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <DashboardProductDetails product={product} />
            </TabsContent>
            <TabsContent value="variants" className="space-y-4">
              <ProductVariants product={product} />
            </TabsContent>
            <TabsContent value="images" className="space-y-4">
              <ProductImages images={product.images} />
            </TabsContent>
            <TabsContent value="print-areas" className="space-y-4">
              <ProductPrintAreas printAreas={product.print_areas} />
            </TabsContent>
          </Tabs>
          </main>
  )
}

export default ProductComponent
