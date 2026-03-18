import { resend } from '@/lib/resend';
import { render } from '@react-email/components';
import { OrderConfirmationEmail } from '@/emails/order-confirmation';
import { AdminOrderNotificationEmail } from '@/emails/admin-order-notification';

const FROM_EMAIL = 'Ink Art <info@inkart.store>';
const ADMIN_EMAIL = 'khibanyakallo@gmail.com';

interface OrderEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orderId: string;
  orderItems: {
    qty: number;
    size: string;
    image: string;
    price: number;
    productTitle: string;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentId: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  paidAt: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const html = await render(
    OrderConfirmationEmail({
      firstName: data.firstName,
      lastName: data.lastName,
      orderId: data.orderId,
      orderItems: data.orderItems,
      subtotal: data.subtotal,
      shipping: data.shipping,
      total: data.total,
      paymentId: data.paymentId,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      paidAt: data.paidAt,
    })
  );

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `Order Confirmation - #${data.orderId.slice(0, 8)}`,
    html,
  });

  if (error) {
    console.error('Failed to send order confirmation email:', error);
    throw error;
  }
}

export async function sendAdminOrderNotificationEmail(data: OrderEmailData) {
  const html = await render(
    AdminOrderNotificationEmail({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      orderId: data.orderId,
      orderItems: data.orderItems,
      subtotal: data.subtotal,
      shipping: data.shipping,
      total: data.total,
      paymentId: data.paymentId,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      paidAt: data.paidAt,
    })
  );

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Paid Order #${data.orderId.slice(0, 8)} - ${data.firstName} ${data.lastName}`,
    html,
  });

  if (error) {
    console.error('Failed to send admin order notification email:', error);
    throw error;
  }
}

export async function sendOrderEmails(data: OrderEmailData) {
  await Promise.allSettled([
    sendOrderConfirmationEmail(data),
    sendAdminOrderNotificationEmail(data),
  ]);
}
