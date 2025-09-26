'use client'

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CircleUser, Heart, Search, ShoppingCart, Utensils } from "lucide-react";
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

const categories = [
    { name: 'Restaurantes', icon: Utensils, page: '/' },
    { name: 'Cuidados', icon: Heart, page: '/care' },
    { name: 'Mercados', icon: ShoppingCart, page: '/markets' },
]

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname();

    return (
        <>
            <nav className="bg-white border-b-3 border-black/10">
                <div className="flex justify-between items-center p-6 max-w-6xs mx-auto">
                    <Link href="/" className="font-bold text-2xl">Localtop</Link>

                    <div className="max-w-6xl hidden md:flex justify-center items-center">
                        <div className="flex justify-center space-x-8 ml-28">
                            {categories.map((category, index) => {
                                const isActive = pathname === category.page;
                                return (
                                    <Link
                                        key={index}
                                        href={category.page}
                                    >
                                        <span className="mt-1 text-sm text-center font-medium relative">
                                            {category.name}
                                            {isActive && (
                                                <span className="absolute -bottom-2.5 left-0 w-full h-0.5 bg-black transition-all" />
                                            )}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

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
                        className="flex items-center space-x-2 border rounded-full p-4 w-full max-w-2xl border-black/20 text-black/40 shadow-md cursor-pointer transition-all"
                    >
                        <Search />
                        <p>Buscar Lanchonete, Hospital, Bar...</p>
                    </button>

                    <div className="w-full max-w-6xl overflow-hidden mb-4 md:hidden">
                        <div className="flex justify-center space-x-2">
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
