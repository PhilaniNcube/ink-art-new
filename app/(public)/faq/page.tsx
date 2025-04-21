import { Metadata } from 'next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | InkArt.Store',
  description: 'Find answers to common questions about our canvas prints, ordering, shipping, and more.',
}

const FAQPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Welcome to the InkArt.Store FAQ page! We've gathered answers to common questions about our canvas prints,
            ordering process, shipping, and more. If you can't find what you're looking for, please don't hesitate to{' '}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact Us
            </Link>.
          </p>
        </div>

        {/* Product Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Product Information</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>What kind of products do you sell?</AccordionTrigger>
              <AccordionContent>
                InkArt.Store specializes in high-quality, ready-to-hang canvas printed wall art. We offer a wide variety of designs,
                styles, and themes to suit different tastes and spaces.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger>What materials are your canvas prints made from?</AccordionTrigger>
              <AccordionContent>
                Our canvases are printed on premium, artist-grade poly-cotton blend canvas material chosen for its durability and
                excellent print quality. They are stretched over sturdy, kiln-dried pine wood stretcher bars.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger>What printing technology do you use?</AccordionTrigger>
              <AccordionContent>
                We use state-of-the-art Giclée printing technology with high-definition, eco-friendly, fade-resistant archival inks.
                This ensures vibrant colours, sharp details, and longevity for your artwork.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4">
              <AccordionTrigger>Are the canvas prints ready to hang?</AccordionTrigger>
              <AccordionContent>
                Yes! All our canvas prints arrive stretched on a wooden frame and come with pre-installed hanging hardware.
                They are ready to be displayed right out of the box.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5">
              <AccordionTrigger>What sizes do you offer?</AccordionTrigger>
              <AccordionContent>
                We offer a range of standard sizes for each artwork, which are listed on the product page.
                Please check the specific product details for available dimensions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6">
              <AccordionTrigger>How accurate are the colours shown on the website?</AccordionTrigger>
              <AccordionContent>
                We strive to display the colours of our artwork as accurately as possible. However, please note that
                colours may vary slightly depending on your screen calibration and settings. The physical print offers
                rich and true-to-life colours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q7">
              <AccordionTrigger>Do you offer custom sizes or custom designs?</AccordionTrigger>
              <AccordionContent>
                Currently, we primarily offer the sizes and designs listed on our website. While we don't offer fully
                custom design services at this time, we are always expanding our collection. Keep an eye on our store
                or sign up for our newsletter for updates!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q8">
              <AccordionTrigger>How should I care for my canvas print?</AccordionTrigger>
              <AccordionContent>
                To keep your canvas print looking its best, avoid direct sunlight and excessive humidity. You can gently
                dust it with a soft, dry cloth or a feather duster. Do not use water, cleaning sprays, or chemicals.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Ordering & Payment */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Ordering & Payment</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q9">
              <AccordionTrigger>How do I place an order?</AccordionTrigger>
              <AccordionContent>
                Simply browse our collection, select the artwork and size you like, and click "Add to Cart".
                When you're ready, go to your cart and click "Checkout". Follow the prompts to enter your shipping
                information and payment details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q10">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment
                options available at checkout.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q11">
              <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
              <AccordionContent>
                Absolutely. Our website uses SSL encryption to protect your personal and payment information.
                All payments are processed through secure, industry-standard payment gateways.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q12">
              <AccordionTrigger>Can I change or cancel my order after placing it?</AccordionTrigger>
              <AccordionContent>
                We process orders quickly to ensure fast delivery. If you need to change or cancel your order,
                please <Link href="/contact" className="text-primary hover:underline">Contact Us</Link> as soon as possible
                (ideally within 1-2 hours of placing it). We'll do our best to accommodate your request, but once an
                order enters production, changes may not be possible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Shipping & Delivery */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Shipping & Delivery</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q13">
              <AccordionTrigger>Where do you ship to?</AccordionTrigger>
              <AccordionContent>
                We currently ship to the United States, Canada, UK, Australia, and most European countries.
                Please see our <Link href="/shipping" className="text-primary hover:underline">Shipping Policy</Link> page for more details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q14">
              <AccordionTrigger>How much does shipping cost?</AccordionTrigger>
              <AccordionContent>
                Shipping costs vary depending on your location and the size/weight of your order. The exact shipping cost
                will be calculated and displayed during the checkout process before you complete your purchase.
                We may also offer free shipping promotions from time to time!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q15">
              <AccordionTrigger>How long will it take to receive my order?</AccordionTrigger>
              <AccordionContent>
                <p>Order processing (including printing and framing) typically takes 3-5 business days.
                  Shipping time then depends on your location and the shipping method chosen. Estimated delivery times are:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Standard Shipping: 5-10 business days</li>
                  <li>Expedited Shipping (if offered): 2-4 business days</li>
                </ul>
                <p className="mt-2">
                  Note: These are estimates and can be affected by holidays or carrier delays.
                  Please see our <Link href="/shipping" className="text-primary hover:underline">Shipping Policy</Link> for
                  more detailed information.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q16">
              <AccordionTrigger>How can I track my order?</AccordionTrigger>
              <AccordionContent>
                Once your order ships, you will receive a shipping confirmation email containing a tracking number
                and a link to the carrier's website. You can use this number to monitor your package's progress.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q17">
              <AccordionTrigger>What should I do if my order arrives damaged?</AccordionTrigger>
              <AccordionContent>
                We carefully package our prints, but occasional damage during transit can occur. If your order
                arrives damaged, please <Link href="/contact" className="text-primary hover:underline">Contact Us</Link> within
                48 hours of receiving it. Include photos of the damaged item and packaging. We will arrange for a
                replacement or refund as quickly as possible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Returns & Exchanges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Returns & Exchanges</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q18">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                We want you to love your art! If you're not satisfied with your purchase, you can return it within
                30 days of delivery for a refund or exchange, provided it's in its original condition.
                Please refer to our full <Link href="/returns" className="text-primary hover:underline">Return Policy</Link>
                for detailed instructions and any exclusions (e.g., final sale items).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q19">
              <AccordionTrigger>How do I start a return?</AccordionTrigger>
              <AccordionContent>
                To initiate a return, please visit our <Link href="/returns" className="text-primary hover:underline">
                  Return Policy</Link> page or <Link href="/contact" className="text-primary hover:underline">Contact Us</Link> with
                your order number and the reason for the return. We will provide you with instructions on how to proceed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q20">
              <AccordionTrigger>Do I have to pay for return shipping?</AccordionTrigger>
              <AccordionContent>
                Generally, customers are responsible for return shipping costs unless the item arrived damaged or
                incorrect due to our error. Please check our <Link href="/returns" className="text-primary hover:underline">
                  Return Policy</Link> for specifics.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Contact & Support */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Contact & Support</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q21">
              <AccordionTrigger>How can I contact InkArt.Store customer support?</AccordionTrigger>
              <AccordionContent>
                <p>You can reach our friendly customer support team via:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Email: <Link href="mailto:info@inkart.store" className="text-primary hover:underline">info@inkart.store</Link></li>
                  <li>Contact Form: <Link href="/contact" className="text-primary hover:underline">Contact Page</Link></li>
                  <li>Phone: +27 65 944 6989</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q22">
              <AccordionTrigger>What are your customer support hours?</AccordionTrigger>
              <AccordionContent>
                Our support team is available Monday to Friday, 9 AM to 5 PM EST. We aim to respond to all inquiries within 24-48 business hours.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA Section */}
        <div className="bg-muted p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
          <p className="mb-4">We're here to help! Reach out to our customer support team.</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FAQPage