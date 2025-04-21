import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Ink Art | Our Story and Mission',
  description: 'Learn about Nyakallo, the founder of Ink Art, her journey from Lesotho to South Africa, and the inspiration behind our canvas art store.',
}

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Story</h1>
         
        </div>

        {/* Founder Story */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
             
              <div className="space-y-4 text-base md:text-lg">
                <p>
                 {/* General about us story */}
                  Ink Art is a canvas art store founded by Nyakallo, a passionate artist and entrepreneur from Lesotho. With a degree in economics, Nyakallo's journey into the world of art began as a personal exploration of creativity and self-expression.
                  
                </p>
               
              </div>
            </div>
            <div className="relative aspect-square w-full rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl"></div>
              <Image 
                src="https://replicate.delivery/xezq/UsPy1Rk6EVp9OVvW7xqLlZteeVHUy7TDlYF14hrkChANfEKpA/tmpp3k0zs8c.webp" 
                alt="Nyakallo, founder of Ink Art" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">The Journey</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-card p-6 rounded-xl border">
              <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                <span className="font-bold text-primary">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Roots in Lesotho</h3>
              <p className="text-muted-foreground">
                Growing up surrounded by the breathtaking landscapes of Lesotho, Nyakallo developed a deep appreciation for beauty and natural harmony that continues to influence her artistic vision today.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border">
              <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                <span className="font-bold text-primary">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Academic Foundation</h3>
              <p className="text-muted-foreground">
                Her economics degree provided Nyakallo with a unique perspective on value, scarcity, and human behavior—concepts that subtly influence her approach to creating art that truly resonates with people.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border">
              <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                <span className="font-bold text-primary">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ink Art is Born</h3>
              <p className="text-muted-foreground">
                Combining her passion for art with entrepreneurial spirit, Nyakallo founded Ink Art to share her creative vision and bring accessible, meaningful art into homes around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Creative Process */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden order-2 md:order-1">
              <Image 
                src="https://replicate.delivery/xezq/ZY9rJ68nBG7lL1XOOL8b91kI2TUMzJ2o3LvJ6New8Sf5gClUA/tmpvcesl24w.webp" 
                alt="Nyakallo's art studio" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4">Beyond Canvas</h2>
              <div className="space-y-4 text-base md:text-lg">
                <p>
                  Nyakallo's creative expression extends beyond canvas prints. As a budding YouTube content creator, she shares her artistic process, inspirations, and glimpses into the entrepreneurial journey of building Ink Art from the ground up.
                </p>
                <p>
                  "Art isn't just about what hangs on your wall—it's a conversation, a feeling, a moment captured," Nyakallo explains. "Through my YouTube channel, I get to share the stories behind the art and connect with others who appreciate beauty in everyday life."
                </p>
                <div className="mt-6">
                  <a 
                    href="https://youtube.com/@inkart" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                    Visit Nyakallo's YouTube Channel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission & Values</h2>
          <div className="bg-card p-8 rounded-xl border">
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <p className="text-xl italic">
                "To transform spaces into personal sanctuaries through art that speaks to the soul."
              </p>
              <div className="grid gap-6 md:grid-cols-2 pt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                  <p className="text-muted-foreground">
                    Every piece in our collection represents a genuine artistic expression, carefully created to resonate with authentic emotions and experiences.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                  <p className="text-muted-foreground">
                    We believe beautiful art shouldn't be confined to galleries—it belongs in everyday spaces where it can inspire daily life.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Craftsmanship</h3>
                  <p className="text-muted-foreground">
                    From digital design to final printing, we maintain the highest standards of quality in materials and production.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Connection</h3>
                  <p className="text-muted-foreground">
                    Art creates conversations and connections. We design pieces that spark dialogue and bring people together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative">
     
          <div className="bg-gradient-to-br from-slate-200 to-blue-200 rounded-xl p-8 text-center ">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Bring Ink Art Into Your Space</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Every canvas tells a story. Discover Nyakallo's carefully curated collection and find the perfect piece to transform your space.
            </p>
            <Link 
              href="/" 
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Explore Our Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage