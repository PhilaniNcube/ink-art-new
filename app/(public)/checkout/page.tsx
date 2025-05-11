import React from 'react';
import { Metadata } from 'next';
import CheckoutForm from './_components/checkout-form';
import { currentUser } from '@/utils/queries/users';
import { LoginForm } from '@/components/login-form';

export const metadata: Metadata = {
  title: 'Checkout | FarmTrack',
  description: 'Complete your purchase',
};

export default async function CheckoutPage() {

  // check is the user is logged in
  const user = await currentUser(); // Replace with actual authentication check

  if (!user) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="text-muted-foreground mt-2">
            You must be logged in to complete your purchase.
          </p>
          <div className="mt-6 mx-auto w-1/2">
            <LoginForm />
          </div>

        </div>
      </div>
    );
  }

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
