import { fetchAllOrders } from '@/utils/queries/orders';
import React from 'react'
import { OrdersTable } from '../_components/orders-table';

const OrdersPage = async () => {

  const orders = await fetchAllOrders();


  return (
    <div>
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="mt-4">
          <OrdersTable data={orders!} />
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
