import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CTASecion = () => {
    return (
        <section className="bg-black text-white mt-6 md:mt-24">
            <div className="container mx-auto py-8 ">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex justify-center flex-col mb-8 md:mb-0">
                        <h2 className="text-2xl lg:text-4xl mb-4 text-center md:text-left">Art That Feels Like Home</h2>
                        <p className="text-lg mb-4 text-balance text-left">
                            Tired of bare walls? Our premium canvas posters offer an effortless way to infuse your space with color, character, and sophistication. Explore diverse styles perfect for your living room, bedroom, office, and more.
                        </p>
                        <div className='flex'>
                            <Link href="/products" className="mr-4">
                                <Button  className="bg-white text-black hover:bg-gray-200 mr-4">
                                    Shop Now
                                    <ArrowRight className="ml-2" size={16} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image width={1260} height={839} src="https://images.unsplash.com/photo-1721523239302-6d1280c65bc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="CTA Image" className="w-full h-auto md:-translate-y-24" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASecion