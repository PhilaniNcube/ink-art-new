import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"
import { SocialLinks } from "./_components/social-links"
import { FAQAccordion } from "./_components/faq-accordion"
import { ContactForm } from "./_components/contact-form"



export const metadata: Metadata = {
  title: "Contact Us | Ink Art",
  description: "Get in touch with our team for any questions about our canvas artwork or orders.",
}

export default function ContactPage() {
  return (
    <div className="container py-12 mx-auto">
      <div className="flex flex-col space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear from you. Please fill out the form below or reach out directly.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div className="p-6 border rounded-lg shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold">Our Information</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">22 Silwood Road, Bramley</p>
                    <p className="text-muted-foreground">Johannesburg</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">
                      +27 65 944 6989
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@inkart.store</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold">Business Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold">Connect With Us</h2>
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t">
          <h2 className="mb-6 text-3xl font-bold">Frequently Asked Questions</h2>
          <FAQAccordion />
        </div>

        <div className="w-full h-96 mt-8 overflow-hidden rounded-lg">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229170.13205645658!2d27.728171761828754!3d-26.171185555155397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg!5e0!3m2!1sen!2sza!4v1745251701403!5m2!1sen!2sza" width="100%" height="100%" style={{ border: 0 }} loading="lazy" ></iframe>
        </div>
      </div>
    </div>
  )
}
