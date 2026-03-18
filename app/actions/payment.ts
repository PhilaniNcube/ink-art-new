'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { sendOrderEmails } from "@/lib/emails";

// Function to create a PayPal order
export async function createPayPalOrder(orderId: string) {
  try {
    // Fetch order details from database
    const supabase = await createClient();
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      console.error('Error fetching order details:', error);
      return { success: false, error: 'Could not find order' };
    }

    // get the accesToken
    const res = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
      }),
    });

    if (!res.ok) {
      console.error('Error fetching PayPal access token:', await res.text());
      return { success: false, error: 'Failed to fetch PayPal access token' };
    }

    const { access_token } = await res.json();

    const req = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: (order.total / 100).toString(),
            },
            reference_id: order.id,
          }
        ],
        intent: "CAPTURE",
      })

    })

    if (!req.ok) {
      console.error('Error creating PayPal order:', await req.text());
      return { success: false, error: 'Failed to create PayPal order' };
    }
    const data = await req.json();


    // Return order info for PayPal
    return {
      success: true,
      data,
      accessToken: access_token,
    };
  } catch (error) {
    console.error('Error in createPayPalOrder:', error);
    return { success: false, error: 'Failed to prepare order for payment' };
  }
}

// Function to update order after payment
export async function updateOrderAfterPayment(orderId: string, paypalOrderId: string) {
  try {
    const supabase = await createClient();
    const paidAt = new Date().toISOString();

    // Update order in the database
    const { error } = await supabase
      .from('orders')
      .update({
        paid: true,
        payment_id: paypalOrderId,
        paid_at: paidAt,
      })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order payment status:', error);
      return { success: false, error: 'Failed to update payment status' };
    }

    // Fetch full order details for email
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (order) {
      // Send emails without blocking the response
      sendOrderEmails({
        firstName: order.first_name,
        lastName: order.last_name,
        email: order.email,
        phone: order.phone,
        orderId: order.id,
        orderItems: order.order_items,
        subtotal: order.subtotal ?? 0,
        shipping: order.shipping ?? 0,
        total: order.total,
        paymentId: paypalOrderId,
        address: order.address,
        city: order.city,
        state: order.state,
        postalCode: order.postal_code,
        paidAt,
      }).catch((err) => {
        console.error('Failed to send order emails:', err);
      });
    }

    // Revalidate paths
    revalidatePath(`/checkout/confirmation`);
    revalidatePath(`/account/orders`);

    return { success: true };
  } catch (error) {
    console.error('Error in updateOrderAfterPayment:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
