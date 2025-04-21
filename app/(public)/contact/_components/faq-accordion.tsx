"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
          Standard shipping typically takes 5-7 business days within the continental US. International shipping can take
          10-14 business days depending on the destination. We also offer expedited shipping options at checkout.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          We offer a 7-day return policy for all our canvas prints. If you're not completely satisfied with your
          purchase, you can return it within 7 days for a full refund or exchange. Please note that custom-sized or
          personalized artwork is non-refundable.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Do you offer custom sizes?</AccordionTrigger>
        <AccordionContent>
          We only offer the sizes listed on our website. However, if you have a specific size in mind, please contact us, and we can help you
          find a solution. We can also provide guidance on how to choose the right size for your space.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>How do I care for my canvas print?</AccordionTrigger>
        <AccordionContent>
          To keep your canvas print looking its best, avoid placing it in direct sunlight or high-humidity areas. Dust
          it gently with a soft, dry cloth when needed. Don't use cleaning products or water on the canvas surface as
          this may damage the print.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>Can I commission a custom artwork?</AccordionTrigger>
        <AccordionContent>
         {/*To get custom work done you need to provide us with the image files */}
            Yes, we offer custom artwork commissions. If you have a specific idea or theme in mind, please reach out to our
            team with your vision, and we'll work with you to create a unique piece that fits your needs.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
