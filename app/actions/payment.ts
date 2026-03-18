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

    // Capture the PayPal order to actually charge the buyer
    const tokenRes = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });

    if (!tokenRes.ok) {
      console.error('Error fetching PayPal access token:', await tokenRes.text());
      return { success: false, error: 'Failed to authenticate with PayPal' };
    }

    const { access_token } = await tokenRes.json();

    const captureRes = await fetch(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      }
    );

    if (!captureRes.ok) {
      const errorText = await captureRes.text();
      console.error('Error capturing PayPal order:', errorText);
      return { success: false, error: 'Failed to capture payment with PayPal' };
    }

    const captureData = await captureRes.json();

    if (captureData.status !== 'COMPLETED') {
      console.error('PayPal capture not completed:', captureData.status);
      return { success: false, error: `Payment capture status: ${captureData.status}` };
    }

    const paidAt = new Date().toISOString();

    // Update order in the database only after successful capture
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

// Function to check PayPal payment status for an order
// If the payment was never captured, marks the order as unpaid in the database.
export async function checkPayPalPaymentStatus(orderId: string) {
  try {
    const supabase = await createClient();

    const { data: order, error } = await supabase
      .from('orders')
      .select('payment_id, paid')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      return { success: false, error: 'Order not found' };
    }

    if (!order.payment_id) {
      return {
        success: true,
        status: 'NO_PAYMENT',
        message: 'No PayPal payment associated with this order',
      };
    }

    // Get PayPal access token
    const tokenRes = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });

    if (!tokenRes.ok) {
      console.error('Error fetching PayPal access token:', await tokenRes.text());
      return { success: false, error: 'Failed to authenticate with PayPal' };
    }

    const { access_token } = await tokenRes.json();

    // Check order status on PayPal
    const orderRes = await fetch(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${order.payment_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      }
    );

    if (!orderRes.ok) {
      const errorText = await orderRes.text();
      console.error('Error fetching PayPal order status:', errorText);
      return { success: false, error: 'Failed to fetch payment status from PayPal' };
    }

    const paypalOrder = await orderRes.json();

    const purchaseUnit = paypalOrder.purchase_units?.[0];
    const capture = purchaseUnit?.payments?.captures?.[0];

    // If PayPal order is not COMPLETED and the DB says paid, fix the DB
    const isCaptured = paypalOrder.status === 'COMPLETED';
    if (!isCaptured && order.paid) {
      await supabase
        .from('orders')
        .update({ paid: false, paid_at: null })
        .eq('id', orderId);

      revalidatePath(`/checkout/confirmation`);
      revalidatePath(`/account/orders`);
      revalidatePath(`/dashboard/orders/${orderId}`);
    }

    return {
      success: true,
      status: paypalOrder.status,
      reconciled: !isCaptured && order.paid,
      paypalOrderId: paypalOrder.id,
      payer: paypalOrder.payer
        ? {
            email: paypalOrder.payer.email_address,
            name: `${paypalOrder.payer.name?.given_name ?? ''} ${paypalOrder.payer.name?.surname ?? ''}`.trim(),
            payerId: paypalOrder.payer.payer_id,
          }
        : null,
      amount: purchaseUnit?.amount
        ? {
            currency: purchaseUnit.amount.currency_code,
            value: purchaseUnit.amount.value,
          }
        : null,
      capture: capture
        ? {
            id: capture.id,
            status: capture.status,
            amount: capture.amount?.value,
            currency: capture.amount?.currency_code,
            createTime: capture.create_time,
          }
        : null,
    };
  } catch (error) {
    console.error('Error in checkPayPalPaymentStatus:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
