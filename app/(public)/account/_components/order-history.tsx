"use client"

import { useState } from "react"
import { format } from "date-fns"
import { 
  ChevronDown, 
  ChevronUp, 
  Package, 
  ShoppingBag, 
  Download,
  Eye
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"

// Helper function to format currency

type OrderHistoryProps = {
  orders: any[] | null
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            View your past orders and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No orders yet</h3>
            <p className="text-muted-foreground mt-2">
              When you place an order, it will appear here.
            </p>
            <Button className="mt-6" asChild>
              <a href="/">Browse Products</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>
          View your past orders and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <Accordion type="single" collapsible className="border rounded-lg" key={order.id}>
              <AccordionItem value={order.id} className="border-none">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <div className="flex flex-1 flex-col space-y-1 text-left sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Order #{order.id.substring(0, 8)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{format(new Date(order.created_at), 'MMM d, yyyy')}</span>
                      <span>{formatCurrency(order.total)}</span>
                      <Badge variant={order.paid ? "default" : "secondary"}>
                        {order.paid ? "Paid" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-semibold">Shipping Information</h4>
                        <address className="mt-2 text-sm not-italic text-muted-foreground">
                          {order.first_name} {order.last_name}<br />
                          {order.address}<br />
                          {order.city}, {order.state} {order.postal_code}
                        </address>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold">Order Summary</h4>
                        <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <dt>Subtotal</dt>
                            <dd>{formatCurrency(order.subtotal || 0)}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt>Shipping</dt>
                            <dd>{formatCurrency(order.shipping || 0)}</dd>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-semibold text-foreground">
                            <dt>Total</dt>
                            <dd>{formatCurrency(order.total)}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Items</h4>
                      <ul className="divide-y">
                        {order.order_items.map((item: any) => (
                          <li key={item.id} className="py-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {item.image && (
                                  <div className="h-12 w-12 overflow-hidden rounded border">
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {item.variant_name} × {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <div>
                                {formatCurrency(item.price * item.quantity)}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                      {order.paid && (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Invoice
                        </Button>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
