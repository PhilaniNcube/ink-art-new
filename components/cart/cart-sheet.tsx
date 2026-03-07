"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

const CartSheet = () => {
  const {
    items,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    decrementItemQuantity,
    incrementItemQuantity,
  } = useCart();

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const itemCount = totalItems();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-accent transition-colors"
        >
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-[10px] font-bold animate-in zoom-in-50 duration-200">
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart
            </SheetTitle>
            {items.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </Badge>
            )}
          </div>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
              <div className="rounded-full bg-muted p-6 mb-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-[240px]">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsCartOpen(false)}
                asChild
              >
                <Link href="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="px-6 py-4 space-y-1">
              {items.map((item, index) => (
                <React.Fragment key={item.variantId}>
                  <div className="group flex gap-4 py-4 transition-colors rounded-lg">
                    {/* Product Image */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border bg-muted">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-sm font-medium leading-tight line-clamp-2">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-sm font-semibold text-foreground">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 flex-shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          onClick={() => handleRemoveItem(item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove {item.name}</span>
                        </Button>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center rounded-full border bg-background shadow-sm">
                          <button
                            onClick={() => decrementItemQuantity(item.variantId)}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-l-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => incrementItemQuantity(item.variantId)}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-r-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {index < items.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <SheetFooter className="border-t px-6 py-5 bg-muted/30">
            <div className="w-full space-y-4">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium">{formatCurrency(totalPrice())}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground italic">Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-lg font-bold">
                    {formatCurrency(totalPrice())}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <Button
                className="w-full h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
                asChild
              >
                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-muted-foreground hover:text-destructive transition-colors py-1"
              >
                Clear cart
              </button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
