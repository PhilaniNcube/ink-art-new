import React from 'react';
import { Metadata } from 'next';
import CheckoutForm from './_components/checkout-form';

export const metadata: Metadata = {
  title: 'Checkout | FarmTrack',
  description: 'Complete your purchase',
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-10">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground mt-2">
          Complete your order by providing your shipping information.
        </p>
        
        <CheckoutForm />
      </div>
    </div>
  );
}
