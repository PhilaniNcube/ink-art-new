import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Truck, Clock, Globe, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Shipping Policy | InkArt.Store",
  description:
    "Learn about our shipping process, delivery times, and costs for our canvas art prints.",
};

const ShippingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Shipping Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about how we deliver your InkArt canvas
            prints.
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
                  After your order is confirmed, we carefully prepare your
                  canvas print, ensure it's properly protected, and ship it
                  through our trusted delivery partners.
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
                  Your order is typically processed, printed, and prepared for
                  shipping within 3-5 business days before being handed over to
                  our shipping partners.
                </p>
              </CardContent>
            </Card>{" "}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe size={20} className="text-primary" />
                  Shipping Destinations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We currently ship to the continental United States only.
                  Alaska, Hawaii, and international shipping are not available
                  at this time.
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
                  All canvas prints are carefully packaged in sturdy protective
                  materials to ensure they arrive in perfect condition.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>{" "}
        {/* Shipping Rates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">
            Shipping Costs
          </h2>

          <div className="p-6 border rounded-lg bg-muted/50">
            <h3 className="text-lg font-semibold mb-3">
              Shipping Cost Calculation
            </h3>
            <p className="text-muted-foreground mb-4">
              Shipping costs will be calculated and displayed during the
              checkout process based on:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Your delivery address within the continental United States
              </li>
              <li>The size and weight of your canvas print(s)</li>
              <li>Selected shipping method (standard or express)</li>
            </ul>
            <p className="mt-4 text-sm font-medium">
              The exact shipping cost will be shown before you complete your
              purchase.
            </p>
          </div>

          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Free Shipping Promotions</AlertTitle>
            <AlertDescription>
              We occasionally offer free shipping on orders over a certain
              amount. Keep an eye on our homepage or subscribe to our newsletter
              for these special offers.
            </AlertDescription>
          </Alert>
        </section>{" "}
        {/* Delivery Times */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">
            Estimated Delivery Times
          </h2>

          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipping Method</TableHead>
                  <TableHead>Estimated Delivery Time</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Standard Shipping
                  </TableCell>
                  <TableCell>5-7 business days</TableCell>
                  <TableCell className="text-muted-foreground">
                    Most economical option for continental US delivery
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Express Shipping
                  </TableCell>
                  <TableCell>2-3 business days</TableCell>
                  <TableCell className="text-muted-foreground">
                    Faster delivery for urgent orders
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            * Delivery times are estimates for the continental United States and
            do not include processing time (3-5 business days). Actual delivery
            times may vary due to weather conditions, holidays, or other
            unforeseen circumstances.
          </p>
        </section>
        {/* Tracking */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">
            Order Tracking
          </h2>

          <p className="mb-4">
            Once your order ships, you will receive a shipping confirmation
            email containing:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>A tracking number for your package</li>
            <li>
              A link to the carrier's website to monitor your shipment's
              progress
            </li>
            <li>Estimated delivery date</li>
          </ul>

          <p className="mb-4">
            If you haven't received a tracking number within 7 business days of
            your order, or if you have any questions about your shipment, please
            don't hesitate to contact our customer support team.
          </p>
        </section>{" "}
        {/* Shipping Restrictions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">
            Shipping Restrictions
          </h2>

          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Continental US Only</AlertTitle>
              <AlertDescription>
                We currently ship only to addresses within the continental
                United States (48 contiguous states). Shipping to Alaska,
                Hawaii, Puerto Rico, US territories, and international
                destinations is not available at this time.
              </AlertDescription>
            </Alert>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Address Requirements</h3>
              <p className="text-muted-foreground">
                Please ensure your shipping address is complete and accurate,
                including apartment numbers and ZIP codes, to avoid delivery
                issues or delays. We cannot ship to PO Boxes for canvas prints
                due to size restrictions.
              </p>
            </div>
          </div>
        </section>
        {/* Delivery Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">
            Delivery Issues
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Damaged Items</h3>
              <p className="text-muted-foreground mb-2">
                If your order arrives damaged, please contact us within 48 hours
                of delivery with:
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
                If your tracking information hasn't updated for more than 7 days
                or indicates a delivery issue, please contact our customer
                support team for assistance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Address Changes</h3>
              <p className="text-muted-foreground">
                If you need to change your shipping address after placing an
                order, please contact us as soon as possible. We can usually
                accommodate address changes within the continental US before the
                order ships. Once the package is in transit, address changes may
                not be possible.
              </p>
            </div>
          </div>
        </section>
        {/* Contact */}
        <div className="bg-muted p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-3">
            Have questions about shipping?
          </h3>
          <p className="mb-4">
            Our customer support team is here to help with any shipping
            concerns.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
