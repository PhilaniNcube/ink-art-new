import { fetchAllProducts } from '@/utils/queries/products'
import React from 'react'
import ProductsTable from './_components/products-table'

const DashboardProducts = async () => {

  // Fetch products from your API or database here
  const products = await fetchAllProducts()

  if (!products) {
    return <div>Error fetching products</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Products</h1>
      <p>List of all products.</p>
      <div className="mt-4">
        <ProductsTable products={products} />
      </div>
    </div>
  )
}

export default DashboardProducts