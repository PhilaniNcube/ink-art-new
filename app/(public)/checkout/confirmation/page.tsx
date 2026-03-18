
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { notFound } from 'next/navigation';
import { fetchOrderById } from '@/utils/queries/orders';
import { PayPalPaymentButtons } from '@/components/checkout/paypal-payment-buttons';

// Static metadata
export const metadata = {
  title: 'Order Confirmation | InkArt',
  description: 'Thank you for your order',
};

const OrderConfirmationContent = async ({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) => {
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.orderId;

  if (!orderId) {
    notFound();
  }

  const orderDetails = await fetchOrderById(orderId);

  if (!orderDetails) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
           {orderDetails.paid ? 'Thank you for your order!' : 'Order Confirmation'}
          </h1>
          <p className="text-muted-foreground">
            {orderDetails.paid
              ? 'Your order has been successfully placed and is being processed.'
              : 'Your order has been received and is awaiting payment.'
            }
          </p>
          <p className="font-semibold">Order ID: {orderId}</p>
        </div>

        <div className="mt-8">
          {orderDetails.paid ? (
            // Show links when order is already paid
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/account/orders">View My Orders</Link>
              </Button>
            </div>
          ) : (
            // Show PayPal payment button when order is not paid
            <div className="flex flex-col items-center space-y-4">
              <p className="text-amber-600 font-medium">
                Your order is awaiting payment
              </p>
              <PayPalPaymentButtons 
                clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!} 
                orderId={orderId}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-sm text-muted-foreground">Loading order confirmation...</p>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent searchParams={searchParams} />
    </Suspense>
  );
}
