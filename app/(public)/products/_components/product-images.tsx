"use client"

import { ProductImage } from '@/utils/supabase/types'
import React from 'react'

const ProductImages = ({images}:{images:ProductImage[]}) => {

    const [selectedImage, setSelectedImage] = React.useState<ProductImage>(images[0])
    
    if (!images || images.length === 0) {
        return <p>No images available</p>
    }



  return (
    <div className="w-full flex space-x-5">
        <div className=" top-0 left-0 bottom-0 w-2/12 flex flex-col space-y-6 overflow-y-scroll max-h-[calc(100dvh-4rem)] opacity-95">
            {images.map((image) => (
                <div key={image.src} className="w-full h-24 cursor-pointer" onClick={() => setSelectedImage(image)}>
                    <img
                        src={image.src}
                        alt={`Product Image ${image.src}`}
                        width={100}
                        height={150}
                        className={`w-full h-full object-cover ${selectedImage.src === image.src ? 'border-2 border-blue-500' : ''}`}
                    />
                </div>
            ))}
        </div>
        <img
            src={selectedImage.src}
            alt={`Product Image ${selectedImage.src}`}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg mb-4"
        />
    </div>
  )
}

export default ProductImages
