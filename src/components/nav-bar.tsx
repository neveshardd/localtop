'use client'

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import { Book, CircleUser, Coffee, CreditCard, Dumbbell, Frame, GalleryHorizontal, Heart, Hotel, IceCream, Move, Music, PawPrint, Scissors, Search, Shirt, ShoppingCart, ToolCase, TreeDeciduous, Utensils } from "lucide-react";

const categories = [
    { name: 'Cafeterias', icon: Coffee, page: '/cafeterias' },
    { name: 'Estúdios', icon: Dumbbell, page: '/estudios' },
    { name: 'Clínicas', icon: Heart, page: '/clinicas' },
    { name: 'Supermercados', icon: ShoppingCart, page: '/supermercados' },
    { name: 'Teatros', icon: Move, page: '/teatros' },
    { name: 'Parques', icon: TreeDeciduous, page: '/parques' },
    { name: 'Postos de Gasolina', icon: GalleryHorizontal, page: '/postos' },
    { name: 'Pet Shops', icon: PawPrint, page: '/petshops' },
    { name: 'Salões de Beleza', icon: Scissors, page: '/saloes' },
    { name: 'Sorveterias', icon: IceCream, page: '/sorveterias' },
    { name: 'Casas de Show', icon: Music, page: '/casasdeshow' },
    { name: 'Livrarias', icon: Book, page: '/livrarias' },
    { name: 'Academias', icon: Dumbbell, page: '/academias' },
    { name: 'Bancos', icon: CreditCard, page: '/bancos' },
    { name: 'Cabeleireiros', icon: Scissors, page: '/cabeleireiros' },
    { name: 'Cafés', icon: Coffee, page: '/cafes' },
    { name: 'Clínicas Odontológicas', icon: ToolCase, page: '/clinicas-odontologicas' },
    { name: 'Farmácias', icon: Frame, page: '/farmacias' },
    { name: 'Hotéis', icon: Hotel, page: '/hoteis' },
    { name: 'Lojas de Roupas', icon: Shirt, page: '/lojas-de-roupas' },
    { name: 'Restaurantes', icon: Utensils, page: '/restaurantes' },
    { name: 'Supermercados', icon: ShoppingCart, page: '/supermercados' },
]

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
                <div className="hover:bg-black/5 p-2 rounded-full cursor-pointer transition-all">
                    <CircleUser size={28} />
                </div>
            </div>

            <div className="flex flex-col items-center space-y-5 max-w-6xl px-6 mx-auto">
                <div className="relative w-full max-w-3xl">
                    <Search className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="search"
                        placeholder="Buscar lanchonetes, lojas..."
                        className="w-full pl-10 p-3.5 border border-black/15 shadow-xl shadow-black/10 md:py-4.5 md:pl-15 rounded-full focus:outline-black/60"
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
                                    className="flex flex-col items-center min-w-[100px] px-2 py-3 mx-2 mt-4 rounded-2xl hover:bg-black/5 justify-center"
                                >
                                    <Icon size={20} />
                                    <span className="mt-1 text-sm text-center">{category.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
