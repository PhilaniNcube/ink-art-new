import React from "react";
import { fetchOrderById } from "@/utils/queries/orders";
import { formatCurrency } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import type { ProductImage } from "@/utils/supabase/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const OrderDetails = async ({
  paramsPromise,
}: {
  paramsPromise: Promise<{ id: string }>;
}) => {
  const { id } = await paramsPromise;
  const order = await fetchOrderById(id);

  if (!order) {
    return (
      <div className="container mx-auto py-8">
        <Link
          href="/dashboard/orders"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>
        <p className="text-muted-foreground">Order not found.</p>
      </div>
    );
  }

  const items = Array.isArray(order.order_items) ? order.order_items : [];
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  // Fetch products to resolve images for order items
  const productIds = Array.from(new Set(items.map((item) => item.productId)));
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, images")
    .in("id", productIds);

  const productImageMap = new Map<string, ProductImage[]>(
    (products ?? []).map((p) => [p.id, p.images as ProductImage[]])
  );

  function resolveImage(item: (typeof items)[number]): string | null {
    if (item.image) return item.image;
    const images = productImageMap.get(item.productId);
    if (!images) return null;
    const variantImage = images.find(
      (img) =>
        img.variant_id === item.variantId ||
        img.variant_ids?.includes(item.variantId)
    );
    return variantImage?.src ?? images[0]?.src ?? null;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-sm text-muted-foreground">
            Order ID: {order.id}
          </p>
        </div>
        <Badge variant={order.paid ? "default" : "secondary"} className="text-sm">
          {order.paid ? "Paid" : "Pending"}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
            <CardDescription>Customer and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">
              {order.first_name} {order.last_name}
            </p>
            <p className="text-muted-foreground">{order.email}</p>
            <p className="text-muted-foreground">{order.phone}</p>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
            <CardDescription>Delivery destination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>{order.address}</p>
            <p>
              {order.city}, {order.state} {order.postal_code}
            </p>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>Payment status and details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={order.paid ? "default" : "secondary"}>
                {order.paid ? "Paid" : "Pending"}
              </Badge>
            </div>
            {order.payment_id && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment ID</span>
                <span className="font-mono text-xs">{order.payment_id}</span>
              </div>
            )}
            {order.paid_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paid At</span>
                <span>
                  {new Date(order.paid_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
            {order.created_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(order.subtotal ?? 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatCurrency(order.shipping ?? 0)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-base">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => {
                const imageSrc = resolveImage(item);
                return (
                <TableRow key={`${item.productId}-${item.variantId}-${index}`}>
                  <TableCell>
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={item.productTitle}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-muted" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.productTitle}
                    {item.size && (
                      <span className="block text-xs text-muted-foreground">
                        Size: {item.size}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.variantSKU}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.price)}
                  </TableCell>
                  <TableCell className="text-right">{item.qty}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(item.price * item.qty)}
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;