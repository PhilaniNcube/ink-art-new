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

interface OrderConfirmationEmailProps {
  firstName: string;
  lastName: string;
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

export function OrderConfirmationEmail({
  firstName,
  lastName,
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
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Ink Art order confirmation - #{orderId.slice(0, 8)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Ink Art</Heading>
          <Hr style={hr} />

          <Text style={paragraph}>Hi {firstName},</Text>
          <Text style={paragraph}>
            Thank you for your order! We&apos;ve received your payment and your
            order is being processed.
          </Text>

          <Section style={orderInfoSection}>
            <Text style={orderInfoLabel}>Order ID</Text>
            <Text style={orderInfoValue}>{orderId.slice(0, 8)}</Text>
            <Text style={orderInfoLabel}>Payment ID</Text>
            <Text style={orderInfoValue}>{paymentId}</Text>
            <Text style={orderInfoLabel}>Date</Text>
            <Text style={orderInfoValue}>
              {new Date(paidAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
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

          <Hr style={hr} />

          <Heading as="h2" style={subheading}>
            Shipping Address
          </Heading>
          <Text style={paragraph}>
            {firstName} {lastName}
            <br />
            {address}
            <br />
            {city}, {state} {postalCode}
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            If you have any questions about your order, please contact us at
            info@inkart.store.
          </Text>
          <Text style={footer}>© {new Date().getFullYear()} Ink Art. All rights reserved.</Text>
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
  fontSize: '18px',
  fontWeight: '600',
  color: '#1a1a1a',
  margin: '20px 0 12px',
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

const orderInfoSection: React.CSSProperties = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
};

const orderInfoLabel: React.CSSProperties = {
  fontSize: '12px',
  color: '#6b7280',
  textTransform: 'uppercase' as const,
  margin: '0 0 2px',
  fontWeight: '600',
};

const orderInfoValue: React.CSSProperties = {
  fontSize: '14px',
  color: '#1a1a1a',
  margin: '0 0 12px',
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

const footer: React.CSSProperties = {
  fontSize: '12px',
  color: '#9ca3af',
  textAlign: 'center' as const,
  margin: '0 0 8px',
};
