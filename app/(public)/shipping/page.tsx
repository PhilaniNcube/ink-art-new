import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Truck, Clock, Globe, AlertCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'Shipping Policy | InkArt.Store',
  description: 'Learn about our shipping process, delivery times, and costs for our canvas art prints.',
}

const ShippingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Shipping Policy</h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about how we deliver your InkArt canvas prints.
          </p>
        </div>

        {/* Shipping Overview Section */}
        <section className="mb-12">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck size={20} className="text-primary" />
                  Shipping Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  After your order is confirmed, we carefully prepare your canvas print, ensure it's 
                  properly protected, and ship it through our trusted delivery partners.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={20} className="text-primary" />
                  Processing Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your order is typically processed, printed, and prepared for shipping within 
                  3-5 business days before being handed over to our shipping partners.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe size={20} className="text-primary" />
                  Shipping Destinations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We ship to most countries worldwide including the United States, Canada, United Kingdom,
                  Australia, and most European countries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-primary" />
                  Safe Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All canvas prints are carefully packaged in sturdy protective materials to ensure 
                  they arrive in perfect condition.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Shipping Rates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Shipping Costs</h2>
          
          <p className="mb-6">
            Shipping costs vary depending on your location and the size/weight of your order. 
            The exact shipping cost will be calculated and displayed during the checkout process 
            before you complete your purchase.
          </p>

          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>Small Canvas</TableHead>
                  <TableHead>Medium Canvas</TableHead>
                  <TableHead>Large Canvas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">South Africa</TableCell>
                  <TableCell>R120 - R150</TableCell>
                  <TableCell>R180 - R220</TableCell>
                  <TableCell>R250 - R350</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lesotho</TableCell>
                  <TableCell>R150 - R200</TableCell>
                  <TableCell>R220 - R280</TableCell>
                  <TableCell>R300 - R400</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Other African Countries</TableCell>
                  <TableCell>R300 - R450</TableCell>
                  <TableCell>R450 - R600</TableCell>
                  <TableCell>R650 - R850</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">International</TableCell>
                  <TableCell>R600 - R800</TableCell>
                  <TableCell>R800 - R1200</TableCell>
                  <TableCell>R1300 - R1800</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            * Prices are estimates and may vary based on exact location, current fuel surcharges, and special handling requirements.
            The final shipping cost will be calculated at checkout.
          </p>
          
          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Free Shipping Promotions</AlertTitle>
            <AlertDescription>
              We occasionally offer free shipping on orders over a certain amount. 
              Keep an eye on our homepage or subscribe to our newsletter for these special offers.
            </AlertDescription>
          </Alert>
        </section>

        {/* Delivery Times */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Estimated Delivery Times</h2>
          
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>Standard Delivery</TableHead>
                  <TableHead>Express Delivery*</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">South Africa (Major Cities)</TableCell>
                  <TableCell>3-5 business days</TableCell>
                  <TableCell>1-2 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">South Africa (Rural Areas)</TableCell>
                  <TableCell>5-7 business days</TableCell>
                  <TableCell>2-3 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lesotho</TableCell>
                  <TableCell>7-10 business days</TableCell>
                  <TableCell>3-5 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Other African Countries</TableCell>
                  <TableCell>10-15 business days</TableCell>
                  <TableCell>5-7 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">International</TableCell>
                  <TableCell>14-21 business days</TableCell>
                  <TableCell>7-10 business days</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            * Express delivery is available at an additional cost and can be selected during checkout if available for your location.
          </p>
          
          <p className="mt-6">
            <strong>Please Note:</strong> These are estimated delivery times and can be affected by customs clearance, 
            local holidays, weather conditions, or other unforeseen circumstances. Processing time (3-5 business days) 
            is not included in the delivery estimates above.
          </p>
        </section>

        {/* Tracking */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Order Tracking</h2>
          
          <p className="mb-4">
            Once your order ships, you will receive a shipping confirmation email containing:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>A tracking number for your package</li>
            <li>A link to the carrier's website to monitor your shipment's progress</li>
            <li>Estimated delivery date</li>
          </ul>
          
          <p className="mb-4">
            If you haven't received a tracking number within 7 business days of your order, or if you have any questions 
            about your shipment, please don't hesitate to contact our customer support team.
          </p>
        </section>

        {/* International Shipping */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">International Shipping Information</h2>
          
          <p className="mb-4">
            When shipping internationally, please be aware of the following:
          </p>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Customs Duties & Taxes</h3>
              <p className="text-muted-foreground">
                International orders may be subject to customs duties and taxes imposed by the destination country. 
                These fees are the responsibility of the customer and are not included in our shipping charges.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Customs Clearance</h3>
              <p className="text-muted-foreground">
                International shipments may experience delays due to customs clearance procedures. 
                These delays are beyond our control and should be taken into consideration when placing your order.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Address Accuracy</h3>
              <p className="text-muted-foreground">
                Please ensure your shipping address is complete and accurate, including any apartment numbers, postal codes,
                and contact phone numbers to avoid delivery issues or delays.
              </p>
            </div>
          </div>
        </section>

        {/* Delivery Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Delivery Issues</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Damaged Items</h3>
              <p className="text-muted-foreground mb-2">
                If your order arrives damaged, please contact us within 48 hours of delivery with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Your order number</li>
                <li>Photos of the damaged item</li>
                <li>Photos of the packaging</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Lost Packages</h3>
              <p className="text-muted-foreground">
                If your tracking information hasn't updated for more than 7 days or indicates a delivery issue, 
                please contact our customer support team for assistance.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Address Changes</h3>
              <p className="text-muted-foreground">
                If you need to change your shipping address after placing an order, please contact us as soon as possible.
                We can usually accommodate address changes before the order ships. Once the package is in transit, 
                address changes may not be possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <div className="bg-muted p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-3">Have questions about shipping?</h3>
          <p className="mb-4">Our customer support team is here to help with any shipping concerns.</p>
          <Link 
            href="/contact" 
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ShippingPage
