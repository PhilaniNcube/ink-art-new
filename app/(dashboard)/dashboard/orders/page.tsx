import { fetchAllOrders } from '@/utils/queries/orders';
import React, { Suspense } from 'react'
import { OrdersTable } from '../_components/orders-table';
import DashboardOrders from '../_components/dashboard-orders';


const OrdersPage = async () => {




  return (
    <div>
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="mt-4">
          <Suspense fallback={<div>Loading orders...</div>}>
            <DashboardOrders />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
