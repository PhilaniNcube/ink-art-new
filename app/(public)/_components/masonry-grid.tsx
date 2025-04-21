import Image from 'next/image'
import React from 'react'

const images = [
    {
        src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 945,
        width: 630,
        author: 'Minh Pham'
    },   {
        src: 'https://images.unsplash.com/photo-1678062781042-ff679d98f770?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 839,
        width: 1260,
        author: 'stephanie dawn'
    },
    {
        src: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 1377,
        width: 2074,
        author: 'Naomi Hébert'
    },
    {
        src: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 945,
        width: 630,
        author: 'Roberto Nickson',
    },
    {
        src: 'https://images.unsplash.com/photo-1649511134921-67afc567280c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 944,
        width: 630,
        author: 'Afif Ramdhasuma',
    },
    {
        src: 'https://images.unsplash.com/photo-1593959554825-e14b11e69227?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 945,
        width: 630,
        author: 'Klim Musalimov'
    },
    {
        src: 'https://images.unsplash.com/photo-1575823857138-d80155581d8c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 945,
        width: 945,
        author: 'Osarugue Igbinoba'
    },
    {
        src: 'https://images.unsplash.com/photo-1603206820477-d69eed5c47fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 945,
        width: 630,
        author: 'Teo Zac'
    },
    {
        src: 'https://images.unsplash.com/photo-1709389227723-7acbe00ce6e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 945,
        width: 1259,
        author: 'Fons Heijnsbroek'
    },
 
    {
        src: 'https://images.unsplash.com/photo-1614192221729-8b949e274d6d?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 691,
        width: 945,
        author: 'Jon Tyson'
    }

]


const MasonryGrid = () => {

    // create a 5 column masonry grid with the images above using css with only 2 rows
    // use tailwindcss for styling

    return (
        <div className="container mx-auto mt-12 mb-12">
            <h2 className="text-2xl lg:text-4xl mb-4 text-center">Brighten Up Your Awesome Spaces</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
                        <Image width={image.width} height={image.height} src={image.src} alt={image.author} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MasonryGrid