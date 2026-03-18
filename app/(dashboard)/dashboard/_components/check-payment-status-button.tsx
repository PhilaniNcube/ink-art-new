"use client";

import { useState } from "react";
import { checkPayPalPaymentStatus } from "@/app/actions/payment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CircleDashed, CreditCard } from "lucide-react";

interface CheckPaymentStatusButtonProps {
  orderId: string;
}

type PaymentStatus = Awaited<ReturnType<typeof checkPayPalPaymentStatus>>;

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  COMPLETED: "default",
  APPROVED: "default",
  CREATED: "secondary",
  SAVED: "secondary",
  VOIDED: "destructive",
  NO_PAYMENT: "outline",
};

export function CheckPaymentStatusButton({ orderId }: CheckPaymentStatusButtonProps) {
  const [result, setResult] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setLoading(true);
    try {
      const res = await checkPayPalPaymentStatus(orderId);
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleCheck}>
          <CreditCard className="h-4 w-4 mr-2" />
          Check PayPal Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>PayPal Payment Status</DialogTitle>
          <DialogDescription>
            Live payment status from PayPal for order {orderId.slice(0, 8)}…
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <CircleDashed className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {!loading && result && !result.success && (
          <div className="text-sm text-destructive py-4">
            {result.error}
          </div>
        )}

        {!loading && result && result.success && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={STATUS_VARIANT[result.status ?? ""] ?? "secondary"}>
                {result.status}
              </Badge>
            </div>

            {"reconciled" in result && result.reconciled && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-destructive text-xs">
                Payment was never captured on PayPal. Order has been marked as unpaid.
              </div>
            )}

            {"paypalOrderId" in result && result.paypalOrderId && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">PayPal Order ID</span>
                <span className="font-mono text-xs">{result.paypalOrderId}</span>
              </div>
            )}

            {"payer" in result && result.payer && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payer</span>
                  <span>{result.payer.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payer Email</span>
                  <span className="text-xs">{result.payer.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payer ID</span>
                  <span className="font-mono text-xs">{result.payer.payerId}</span>
                </div>
              </>
            )}

            {"amount" in result && result.amount && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">
                  {result.amount.currency} {result.amount.value}
                </span>
              </div>
            )}

            {"capture" in result && result.capture && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Capture ID</span>
                  <span className="font-mono text-xs">{result.capture.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Capture Status</span>
                  <Badge variant={STATUS_VARIANT[result.capture.status ?? ""] ?? "secondary"}>
                    {result.capture.status}
                  </Badge>
                </div>
                {result.capture.createTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Captured At</span>
                    <span>
                      {new Date(result.capture.createTime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}
              </>
            )}

            {"message" in result && result.message && (
              <p className="text-muted-foreground">{result.message}</p>
            )}

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={handleCheck}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
