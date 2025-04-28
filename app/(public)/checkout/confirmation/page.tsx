
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, CreditCard } from 'lucide-react';
import { notFound } from 'next/navigation';
import { fetchOrderById } from '@/utils/queries/orders';

// Static metadata
export const metadata = {
  title: 'Order Confirmation | FarmTrack',
  description: 'Thank you for your order',
};

// Function to get the order ID from search params
export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  // Await the searchParams since it's now a promise in NextJS 15
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.orderId || 'unknown';

  // Check if orderId is present
  if (!orderId) {
    notFound();
  }

  // fetch the order details from the server
  const orderDetails = await fetchOrderById(orderId);

  // Check if order details are valid
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
            Thank You for Your Order!
          </h1>
          <p className="text-muted-foreground">
            Your order has been received. We'll send you a confirmation email shortly.
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
              <Button className="bg-[#0070ba] hover:bg-[#005ea6]">
               <CreditCard className="h-4 w-4 mr-2" />
                Pay with PayPal
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                You will be redirected to PayPal to complete your payment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
