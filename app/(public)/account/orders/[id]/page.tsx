import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Download, ShoppingBag, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import { currentUser } from "@/utils/queries/users"

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {


  const { id } = await params

  const user = await currentUser()
  
  if (!user) {
    redirect("/auth/login")
  }
  
  const supabase = await createClient()
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()
  
  if (error || !order) {
    notFound()
  }
  
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/account?tab=orders" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Orders</span>
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">
              Order #{order.id.substring(0, 8)}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {format(new Date(order.created_at!), "MMM d, yyyy")}
            </span>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>
                Address where your order will be delivered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <address className="not-italic">
                  <div className="font-medium">{order.first_name} {order.last_name}</div>
                  <div className="text-muted-foreground">{order.address}</div>
                  <div className="text-muted-foreground">
                    {order.city}, {order.state} {order.postal_code}
                  </div>
                  <div className="text-muted-foreground">
                    Phone: {order.phone}
                  </div>
                </address>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Payment and price details for your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">{formatCurrency(order.subtotal || 0)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-medium">{formatCurrency(order.shipping || 0)}</dd>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <dt className="font-medium">Total</dt>
                  <dd className="font-bold">{formatCurrency(order.total)}</dd>
                </div>
                <div className="flex justify-between pt-4">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd>
                    <Badge variant={order.paid ? "default" : "secondary"}>
                      {order.paid ? "Paid" : "Pending"}
                    </Badge>
                  </dd>
                </div>
              </dl>
              
              {order.paid && (
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <Download className="h-4 w-4" />
                  Download Invoice
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>
              Products included in your order
            </CardDescription>
          </CardHeader>
          <CardContent>
            {order.order_items.length > 0 ? (
              <div className="space-y-6">
                {order.order_items.map((item: any) => (
                  <div 
                    key={item.id} 
                    className="flex items-start space-x-4 border-b pb-6 last:border-0 last:pb-0"
                  >
                    {item.image ? (
                      <div className="h-20 w-20 rounded-md border overflow-hidden bg-muted">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-20 w-20 rounded-md border flex items-center justify-center bg-muted">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col space-y-1">
                      <h3 className="font-medium line-clamp-2">{item.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {item.variant_name}
                      </div>
                      <div className="text-sm">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(item.price)} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12 text-center">
                <div className="space-y-2">
                  <ShoppingBag className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p>No items in this order</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
