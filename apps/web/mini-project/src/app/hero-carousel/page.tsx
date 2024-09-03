"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

const heroSlides = [
    {
        title: "",
        description: "",
        backgroundImage: "url(https://asset.kompas.com/crops/g6ujpuQPPgqVuezzhOAaKtZhbDM=/0x59:1920x1019/780x390/data/photo/2024/06/21/66753b5f9ba79.jpg)"
    },
    {
        title: "",
        description: "",
        backgroundImage: "url(https://cdn.rri.co.id/berita/Wamena/o/1717025491512-34a92551a18688ca7461b32bf01a7b9a58109472583102903763704300/kx9eprqa16igut1.jpeg)"
    },
    {
        title: "",
        description: "",
        backgroundImage: "url(https://www.seketika.com/wp-content/uploads/2024/05/LANY-Perpanjang-Tur-Dunia-dengan-Tambahan-Konser-di-Jakarta.jpeg)"
    }
];

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? heroSlides.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    };

    return (
        <div className="relative h-96 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: heroSlides[currentIndex].backgroundImage }}>
            <div className="absolute inset-0 bg-black bg-opacity-25"></div>
            <div className="relative z-10 text-center text-white p-6 pt-12">
                <div className="max-w-md mx-auto">
                    <h1 className="mb-5 pt-12 text-5xl font-extrabold text-white">{heroSlides[currentIndex].title}</h1>
                    <p className="mb-5 text-lg text-white">{heroSlides[currentIndex].description}</p>
                    {/* <button className="btn btn-light py-2 px-4 rounded">
                        <Link href="/about-us">About Us</Link>
                    </button> */}
                </div>
            </div>
            {/* Navigation buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-5"
            >
                &lt;
            </button>
            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-5"
            >
                &gt;
            </button>
        </div>
    );
};

export default HeroCarousel;