"use client";

import { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { CircleDashed } from "lucide-react";
import {
  createPayPalOrder,
  updateOrderAfterPayment,
} from "@/app/actions/payment";
import { useRouter } from "next/navigation";

interface PayPalPaymentButtonsProps {
  clientId: string;
  orderId: string;
  onSuccess?: () => void;
}

// Inner component that uses the PayPal hooks
function ButtonWrapper({
  orderId,
  onSuccess,
}: Omit<PayPalPaymentButtonsProps, "clientId">) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center">
          <CircleDashed className="animate-spin h-6 w-6 text-gray-500" />
        </div>
      ) : (
        <>
          {error && (
            <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
          )}
          <PayPalButtons
            style={{
              shape: "rect",
              layout: "vertical",
              color: "gold",
              label: "paypal",
            }}
            createOrder={async () => {
              try {
                // Call our server action to get order details
                const result = await createPayPalOrder(orderId);

                if (!result.success) {
                  setError(result.error || "Failed to create PayPal order");
                  return "";
                }

                return result.data.id || "";
              } catch (err) {
                console.error("Error creating order:", err);
                setError("Failed to setup payment. Please try again.");
                return "";
              }
            }}
            onApprove={async (data) => {
              try {
                // Call our server action to update the order
                const result = await updateOrderAfterPayment(
                  orderId,
                  data.paymentID || data.orderID
                );

                if (!result.success) {
                  setError(result.error || "Failed to process payment");
                  return;
                }

                if (onSuccess) {
                  onSuccess();
                }

                // Refresh the page to show paid status
                router.refresh();
              } catch (err) {
                console.error("Error approving payment:", err);
                setError("Failed to process payment. Please try again.");
              }
            }}
            onError={(err) => {
              console.error("PayPal error:", err);
              setError("Payment failed. Please try again.");
            }}
          />
        </>
      )}
    </>
  );
}

// Main component that provides the PayPal script context
export function PayPalPaymentButtons({
  clientId,
  orderId,
  onSuccess,
}: PayPalPaymentButtonsProps) {
  return (
    <div className="w-full max-w-md">
      <PayPalScriptProvider
        options={{
          clientId,
          currency: "USD",
          "data-page-type": "product-details",
          "data-sdk-integration-source": "developer-studio",
        }}
      >
        <ButtonWrapper orderId={orderId} onSuccess={onSuccess} />
      </PayPalScriptProvider>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        You will be redirected to PayPal to complete your payment
      </p>
    </div>
  );
}
