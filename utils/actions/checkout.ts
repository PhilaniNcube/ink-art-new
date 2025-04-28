'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { OrderItem } from '@/utils/supabase/types';

// Type for the checkout form data
type CheckoutFormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  order_items: OrderItem[];
  subtotal: number;
  total: number;
  shipping?: number;
};

// Function to create a new order
export async function createCheckoutOrder(data: CheckoutFormData) {
  try {
    const supabase = await createClient();

    const {data:{user}} = await supabase.auth.getUser();
    
    // Create the order in the database
    const orderData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      order_items: data.order_items,
      subtotal: data.subtotal,
      shipping: data.shipping || 0,
      total: data.total,
      paid: false, // Set to false initially, will be updated after payment
      user_id: user?.id || null, // Set the user ID if available
    };

    // Get the user ID if the user is logged in
    const { data: session } = await supabase.auth.getSession();

    const { data: order, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select('id')
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        error: 'Failed to create order. Please try again.'
      };
    }
    
    // Revalidate paths that might display order information
    revalidatePath('/checkout');
    revalidatePath('/account/orders');
    
    return {
      success: true,
      orderId: order.id
    };
  } catch (error) {
    console.error('Error in createCheckoutOrder:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
}
