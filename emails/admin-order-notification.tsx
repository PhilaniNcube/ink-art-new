import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface OrderItem {
  qty: number;
  size: string;
  image: string;
  price: number;
  productTitle: string;
}

interface AdminOrderNotificationEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orderId: string;
  orderItems: OrderItem[];
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

export function AdminOrderNotificationEmail({
  firstName,
  lastName,
  email,
  phone,
  orderId,
  orderItems,
  subtotal,
  shipping,
  total,
  paymentId,
  address,
  city,
  state,
  postalCode,
  paidAt,
}: AdminOrderNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New paid order #{orderId.slice(0, 8)} from {firstName} {lastName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Order Received</Heading>
          <Hr style={hr} />

          <Text style={paragraph}>
            A new order has been paid and is ready for processing.
          </Text>

          <Section style={infoSection}>
            <Heading as="h2" style={subheading}>
              Order Details
            </Heading>
            <Text style={infoLabel}>Order ID</Text>
            <Text style={infoValue}>{orderId}</Text>
            <Text style={infoLabel}>Payment ID</Text>
            <Text style={infoValue}>{paymentId}</Text>
            <Text style={infoLabel}>Paid At</Text>
            <Text style={infoValue}>
              {new Date(paidAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Section>

          <Section style={infoSection}>
            <Heading as="h2" style={subheading}>
              Customer Information
            </Heading>
            <Text style={infoLabel}>Name</Text>
            <Text style={infoValue}>{firstName} {lastName}</Text>
            <Text style={infoLabel}>Email</Text>
            <Text style={infoValue}>{email}</Text>
            <Text style={infoLabel}>Phone</Text>
            <Text style={infoValue}>{phone}</Text>
          </Section>

          <Section style={infoSection}>
            <Heading as="h2" style={subheading}>
              Shipping Address
            </Heading>
            <Text style={infoValue}>
              {address}
              <br />
              {city}, {state} {postalCode}
            </Text>
          </Section>

          <Hr style={hr} />

          <Heading as="h2" style={subheading}>
            Order Items
          </Heading>

          {orderItems.map((item, index) => (
            <Row key={index} style={itemRow}>
              <Column style={itemImageColumn}>
                <Img
                  src={item.image}
                  alt={item.productTitle}
                  width={80}
                  height={80}
                  style={itemImage}
                />
              </Column>
              <Column style={itemDetailsColumn}>
                <Text style={itemTitle}>{item.productTitle}</Text>
                <Text style={itemMeta}>
                  Size: {item.size} | Qty: {item.qty}
                </Text>
                <Text style={itemPrice}>
                  ${(item.price / 100).toFixed(2)}
                </Text>
              </Column>
            </Row>
          ))}

          <Hr style={hr} />

          <Section style={totalsSection}>
            <Row>
              <Column style={totalLabel}>Subtotal</Column>
              <Column style={totalValue}>
                ${(subtotal / 100).toFixed(2)}
              </Column>
            </Row>
            <Row>
              <Column style={totalLabel}>Shipping</Column>
              <Column style={totalValue}>
                ${(shipping / 100).toFixed(2)}
              </Column>
            </Row>
            <Hr style={hr} />
            <Row>
              <Column style={totalLabelBold}>Total</Column>
              <Column style={totalValueBold}>
                ${(total / 100).toFixed(2)}
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const heading: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#1a1a1a',
  textAlign: 'center' as const,
  margin: '0 0 20px',
};

const subheading: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1a1a1a',
  margin: '0 0 12px',
};

const paragraph: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#4a4a4a',
  margin: '0 0 12px',
};

const hr: React.CSSProperties = {
  borderColor: '#e6e6e6',
  margin: '20px 0',
};

const infoSection: React.CSSProperties = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '16px',
  margin: '12px 0',
};

const infoLabel: React.CSSProperties = {
  fontSize: '11px',
  color: '#6b7280',
  textTransform: 'uppercase' as const,
  margin: '0 0 2px',
  fontWeight: '600',
};

const infoValue: React.CSSProperties = {
  fontSize: '14px',
  color: '#1a1a1a',
  margin: '0 0 10px',
};

const itemRow: React.CSSProperties = {
  marginBottom: '12px',
};

const itemImageColumn: React.CSSProperties = {
  width: '80px',
  verticalAlign: 'top',
};

const itemImage: React.CSSProperties = {
  borderRadius: '4px',
  objectFit: 'cover' as const,
};

const itemDetailsColumn: React.CSSProperties = {
  paddingLeft: '12px',
  verticalAlign: 'top',
};

const itemTitle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1a1a1a',
  margin: '0 0 4px',
};

const itemMeta: React.CSSProperties = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0 0 4px',
};

const itemPrice: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1a1a1a',
  margin: '0',
};

const totalsSection: React.CSSProperties = {
  padding: '0 0 8px',
};

const totalLabel: React.CSSProperties = {
  fontSize: '14px',
  color: '#4a4a4a',
  paddingBottom: '8px',
};

const totalValue: React.CSSProperties = {
  fontSize: '14px',
  color: '#4a4a4a',
  textAlign: 'right' as const,
  paddingBottom: '8px',
};

const totalLabelBold: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#1a1a1a',
  paddingTop: '8px',
};

const totalValueBold: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#1a1a1a',
  textAlign: 'right' as const,
  paddingTop: '8px',
};
