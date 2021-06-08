import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function ImageCarrousel({ images, color }) {
    const [renderImages, setrenderImages] = useState([])
    useEffect(() => {
        if (images) {
            const aux = Object.values(images).filter((image) => (image !== null && typeof image === "string") ? true : false).reverse();
            setrenderImages(aux)
        }
    }, [images])

    return (
        <>
            {images ?
                <Carousel showStatus={false} showIndicators={false} showThumbs={false} showArrows={false} axis='vertical'
                 autoFocus swipeable emulateTouch autoPlay infiniteLoop interval={2000} 
                 className={`h-40 w-40 md:h-52 md:w-52 ${color} border-4 border-gray-300 rounded-full z-50`}>
                    {renderImages.map((image, index) => (
                        (image !== null) ?
                            <div key={index}>
                                <img src={image} alt="pokemon" />
                            </div>
                            :
                            null
                    ))}
                </Carousel>
                :
                <p>Loading...</p>
            }
        </>
    );
}