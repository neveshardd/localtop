'use client'

import { CircleUser, HeartPlus, House, Search, ShoppingBag, Store } from "lucide-react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";

const categories = [
    { name: 'Hospedagem', icon: House, page: '/hospedagens' },
    { name: 'Mercados', icon: Store, page: '/mercados' },
    { name: 'Lojas', icon: ShoppingBag, page: '/lojas' },
    { name: 'Farmácias', icon: HeartPlus, page: '/farmacias' },
    { name: 'Restaurantes', icon: HeartPlus, page: '/restaurantes' },
    { name: 'Cafés', icon: Store, page: '/cafes' },
    { name: 'Academias', icon: CircleUser, page: '/academias' },
    { name: 'Hospitais', icon: HeartPlus, page: '/hospitais' },
    { name: 'Shoppings', icon: ShoppingBag, page: '/shoppings' },
    { name: 'Bares', icon: HeartPlus, page: '/bares' },
    { name: 'Padarias', icon: Store, page: '/padarias' },
    { name: 'Salões', icon: CircleUser, page: '/saloes' },
    { name: 'Pet Shop', icon: HeartPlus, page: '/petshop' },
    { name: 'Cinemas', icon: Store, page: '/cinemas' },
    { name: 'Parques', icon: House, page: '/parques' },
    { name: 'Postos', icon: ShoppingBag, page: '/postos' },
    { name: 'Lavanderias', icon: CircleUser, page: '/lavanderias' },
    { name: 'Farm Shops', icon: HeartPlus, page: '/farmshops' },
];

export default function NavBar() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        dragFree: true,
        align: 'start',
    });

    const autoplayRef = useRef<number | null>(null);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        if (!emblaApi) return;

        const play = () => {
            if (!emblaApi) return;

            const slides = emblaApi.scrollSnapList();
            const current = emblaApi.selectedScrollSnap();

            if (current === slides.length - 1) setDirection(-1);
            if (current === 0) setDirection(1);

            const next = current + direction;
            emblaApi.scrollTo(next);
        };

        autoplayRef.current = window.setInterval(play, 2000);

        const stopAutoplay = () => clearInterval(autoplayRef.current!);
        const startAutoplay = () => {
            stopAutoplay()
            autoplayRef.current = window.setInterval(play, 3000)
        }

        emblaApi.on('pointerDown', stopAutoplay);
        emblaApi.on('pointerUp', startAutoplay);

        return () => {
            stopAutoplay();
            emblaApi.off('pointerDown', stopAutoplay);
            emblaApi.off('pointerUp', startAutoplay);
        };
    }, [emblaApi, direction]);

    return (
        <nav className="bg-white border-b-3 border-black/10">
            <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <Link href="/" className="font-bold text-2xl">Localtop</Link>
                <CircleUser size={28} />
            </div>

            <div className="flex flex-col items-center space-y-5 max-w-6xl px-6 mx-auto">
                <div className="relative w-full max-w-3xl">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="search"
                        placeholder="Buscar lanchonetes, lojas..."
                        className="w-full pl-10 p-3.5 border border-black/30 shadow-xl rounded-full"
                    />
                </div>

                <div className="w-full max-w-6xl overflow-hidden mb-2" ref={emblaRef}>
                    <div className="flex">
                        {categories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <Link
                                    key={index}
                                    href={category.page}
                                    className="flex flex-col items-center min-w-[100px] px-2 py-6 mx-2 rounded-2xl hover:bg-black/5"
                                >
                                    <Icon size={20} />
                                    <span className="mt-1 text-sm">{category.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
