"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {  ShoppingBag, Trash, Trash2 } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import React from 'react'
import { Sheet, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from "../ui/sheet";


const CartSheet = () => {

    const { items, removeItem, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen, decrementItemQuantity, incrementItemQuantity } = useCart();

    const handleRemoveItem = (id: number) => {
        removeItem(id);
    }

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen} >
            <SheetTrigger asChild>
                <Button variant='ghost' className="w-fit rounded-full relative">
                    <ShoppingBag size={16} className="" />
                    {/* add a number of items thing above the shoppingbag icon  */}
                    {totalItems() > 0 && (
                        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            {totalItems()}
                        </span>
                    )}

                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="">
                <SheetTitle className="text-xl font-bold">Cart</SheetTitle>
                <div className="flex flex-col space-y-4 p-4 overflow-y-scroll max-h-[calc(100vh-12rem)]">

                    {items.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.variantId} className="flex relative justify-between items-center border-b pt-10 pb-3">
                                <div className="flex flex-col">
                                    <span>{item.name}</span>
                                    <span className="text-xl font-medium">{formatCurrency(item.price)}/each</span>
                                    <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={() => decrementItemQuantity(item.variantId)}
                                            className="rounded-full text-zinc-800 bg-gray-200 hover:bg-blue-700"
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </Button>

                                        <span>{item.quantity}</span>

                                        <Button
                                            onClick={() => incrementItemQuantity(item.variantId)}
                                            className="rounded-full text-zinc-800 bg-gray-200 hover:bg-blue-700"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                                <Button variant="destructive" size='icon' className="absolute top-0 right-0" onClick={() => handleRemoveItem(item.variantId)}>
                                    <Trash2 size='icon' />
                                    <span className="sr-only">Remove Item</span>
                                </Button>

                            </div>
                        ))
                    )}

                </div>
                <SheetFooter className="p-4">
                    <div className="w-full flex flex-col space-y-4">
                        <p className="text-lg font-bold">Sub Total: {formatCurrency(totalPrice())}</p>
                        <Button className="bg-blue-500">
                            <Link href="/checkout" className="text-white">
                                Checkout
                            </Link>
                        </Button>
                    </div>

                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default CartSheet
