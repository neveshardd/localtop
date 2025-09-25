'use client'

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import { Book, CircleUser, Coffee, CreditCard, Dumbbell, Frame, GalleryHorizontal, Heart, Hotel, IceCream, Move, Music, PawPrint, Scissors, Search, Shirt, ShoppingCart, ToolCase, TreeDeciduous, Utensils } from "lucide-react";
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

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
    let [isOpen, setIsOpen] = useState(false)

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
        <>
            <nav className="bg-white border-b-3 border-black/10">
                <div className="flex justify-between items-center p-6 max-w-6xs mx-auto">
                    <Link href="/" className="font-bold text-2xl">Localtop</Link>

                    <div className="flex items-center justify-between space-x-2">
                        <Link href='/' className="hover:bg-black/5 py-2 px-4 rounded-full font-medium hidden md:flex">Cadastre sua Empresa</Link>
                        <div className="bg-black/5 hover:bg-black/10 p-2 rounded-full cursor-pointer transition-all flex space-x-2">
                            <CircleUser size={28} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center max-w-6xl mx-auto space-y-5 px-6">

                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center space-x-2 border rounded-full p-4 w-full max-w-2xl border-black/20 text-black/40 shadow-md"
                    >
                        <Search />
                        <p>Buscar Lanchonete, Hospital, Bar...</p>
                    </button>

                    <div className="w-full max-w-6xl overflow-hidden mb-4" ref={emblaRef}>
                        <div className="flex justify-center" >
                            {categories.map((category, index) => {
                                const Icon = category.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={category.page}
                                        className="flex flex-col items-center min-w-[100px] py-3 mx-2 rounded-2xl hover:bg-black/5 justify-center"
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

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
                        <DialogTitle className="font-bold">Deactivate account</DialogTitle>
                        <Description>This will permanently deactivate your account</Description>
                        <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsOpen(false)}>Cancel</button>
                            <button onClick={() => setIsOpen(false)}>Deactivate</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
