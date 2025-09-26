'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Blocks, CircleUser, Heart, History, LogOut, Search, Settings, Star, Store, UserCircle } from "lucide-react";
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { getCategories } from "@/libs/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const pathname = usePathname()

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    return (
        <>
            <nav className="bg-white border-b border-black/10">
                <div className="flex justify-between items-center p-6 max-w-6xl mx-auto">
                    <Link href="/" className="font-bold text-2xl">Localtop</Link>

                    <div className="hidden md:flex justify-center items-center space-x-8 ml-28">
                        {categories.map((cat) => {
                            const isActive = pathname.startsWith(`/categories/${cat.slug}`)
                            return (
                                <Link
                                    key={cat.slug}
                                    href={`/categories/${cat.slug}`}
                                    className="relative flex flex-col items-center"
                                >
                                    <span className="text-sm font-medium">{cat.name}</span>
                                    {isActive && (
                                        <span className="absolute -bottom-2 h-0.5 bg-black w-full rounded transition-all" />
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Link
                            href="/"
                            className="hover:bg-black/5 py-2 px-4 rounded-full font-medium hidden md:flex"
                        >
                            Cadastrar Negócio
                        </Link>
                        <div className="bg-black/5 hover:bg-black/10 p-2 rounded-full cursor-pointer transition-all">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <CircleUser size={28} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <div className="flex justify-center items-center space-x-3 p-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>JS</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col items-start">
                                            <h1 className="font-bold">João Silva</h1>
                                            <span>joao.silva@email.com</span>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator></DropdownMenuSeparator>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <UserCircle />
                                            Ver Perfil
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings />
                                            Configurações
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="md:hidden">
                                            <Store />
                                            Cadastrar Negócio
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Heart />
                                            Favoritos
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Star />
                                            Minhas Avaliações
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <History />
                                            Histórico
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator></DropdownMenuSeparator>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="text-red-500">
                                        <LogOut className="text-red-500"/>
                                        Sair da Conta
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center max-w-6xl mx-auto space-y-5 px-6">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center space-x-2 border rounded-full p-4 w-full max-w-2xl border-black/20 text-black/40 shadow-md"
                    >
                        <Search />
                        <p>Busque Lanchonetes, Lojas...</p>
                    </button>

                    <div className="w-full max-w-6xl overflow-hidden mb-4 md:hidden">
                        <div className="flex justify-center space-x-2">
                            {categories.map((cat) => {
                                const isActive = pathname.startsWith(`/categories/${cat.slug}`)
                                return (
                                    <Link
                                        key={cat.slug}
                                        href={`/categories/${cat.slug}`}
                                        className="relative flex flex-col items-center min-w-[90px] py-3 mx-2 rounded-2xl hover:bg-black/5 justify-center"
                                    >
                                        {cat.icon ? (
                                            <img
                                                src={cat.icon}
                                                alt={cat.name}
                                                className="w-6 h-6 object-contain"
                                            />
                                        ) : (
                                            <Blocks size={20} />
                                        )}
                                        <span className="mt-1 text-sm text-center font-medium">
                                            {cat.name}
                                        </span>
                                        {isActive && (
                                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-black w-[60%] rounded transition-all" />
                                        )}
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
                        <DialogTitle className="font-bold">Buscar</DialogTitle>
                        <Description>Digite para encontrar lugares</Description>
                        <div className="flex gap-4">
                            <button onClick={() => setIsOpen(false)}>Fechar</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
