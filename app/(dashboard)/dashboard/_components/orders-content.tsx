"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Order, OrdersTable } from "./orders-table"





export function OrdersContent({data}: { data: Order[] }) {

    console.log("OrdersContent", data)

  const [orders, setOrders] = useState<Order[]>(data)
  const [loading, setLoading] = useState(true)



  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Management</CardTitle>
        <CardDescription>View and manage your store orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
   
          </TabsList>

          <TabsContent value="all" className="space-y-4">
          <OrdersTable data={orders} />
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <OrdersTable data={orders.filter((order) => !order.paid)} />
          </TabsContent>

          <TabsContent value="paid" className="space-y-4">
          <OrdersTable data={orders.filter((order) => order.paid)} />
          </TabsContent>

  
        </Tabs>
      </CardContent>
    </Card>
  )
}

function OrdersTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
      <div className="rounded-md border">
        <div className="h-[450px] w-full">
          <div className="border-b p-4">
            <Skeleton className="h-6 w-full" />
          </div>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border-b p-4">
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-[200px]" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[80px]" />
          <Skeleton className="h-10 w-[80px]" />
        </div>
      </div>
    </div>
  )
}
