"use client"

import { usePathname } from "next/navigation"

import Image from 'next/image'
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { Bell, HandPlatter, House, LucideLogOut, Moon, ReceiptText, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { MouseEvent, ReactNode } from "react"
import { Button } from "./ui/button"
import light from "@/assets/unknown-light.png"
import dark from "@/assets/unknown-dark.png"
import ThemeButton from "./theme-button"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Header() {

    const { theme, setTheme } = useTheme()

    const { data: session } = useSession()

    const path = usePathname()

    const handleLogout = () => {
        signOut()
    }

    const handleTheme = (event: MouseEvent) => {
        event.preventDefault()
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const LinkButton = ({ href, children }: { href: string, children: ReactNode }) => {
        return <Link
            className="flex items-center md:h-[8vh] dark:hover:bg-neutral-900 hover:bg-neutral-100 px-3" href={href}>
            {children}
        </Link>
    }

    return (
        <div className="fixed z-[60] w-screen bg-foreground md:py-0 py-3 md:h-[8vh] flex items-center justify-between px-6 md:px-20 text-sm">
            {session?.user && path !== "/login" ?
                <>
                    <ThemeButton />
                    <div className="grow md:flex gap-5 hidden px-10">
                        {(session?.user as any)?.role === 31 && <LinkButton href="/owner/apartments">Danh sách căn hộ</LinkButton>}
                        {(session?.user as any)?.role === 32 && <LinkButton href="/tentant/apartments">Danh sách căn hộ</LinkButton>}
                        {(session?.user as any)?.role === 21 && <LinkButton href="/receptionist/apartments">Danh sách căn hộ</LinkButton>}
                        {(session?.user as any)?.role === 22 && <LinkButton href="/accountant/apartments">Danh sách căn hộ</LinkButton>}
                        {(session?.user as any)?.role === 23 && <LinkButton href="/technician/apartments">Danh sách căn hộ</LinkButton>}
                    </div>
                    <div className="grow md:hidden justify-around flex">
                        {(session?.user as any)?.role === 31 &&
                            <>
                                <LinkButton href="/owner/apartments">
                                    <House />
                                </LinkButton>
                                <LinkButton href="/owner/bills">
                                    <ReceiptText />
                                </LinkButton>
                                <LinkButton href="/owner/services">
                                    <HandPlatter />
                                </LinkButton>
                                <LinkButton href="/owner/notifications">
                                    <Bell />
                                </LinkButton>
                            </>}
                        {(session?.user as any)?.role === 32 && <LinkButton href="/tentant/apartments">Danh sách căn hộ</LinkButton>}
                        {(session?.user as any)?.role === 21 && <LinkButton href="/receptionist/apartments">Danh sách căn hộ</LinkButton>}
                        {(session?.user as any)?.role === 22 && <LinkButton href="/accountant/apartments">Danh sách căn hộ</LinkButton>}
                        {(session?.user as any)?.role === 23 && <LinkButton href="/technician/apartments">Danh sách căn hộ</LinkButton>}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image
                                className="rounded-full"
                                src={session?.user.image ?? (theme == "dark" ? dark : light)}
                                width={32}
                                height={32}
                                alt={"avatar"}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Image
                                    className="rounded-full"
                                    src={session?.user.image ?? (theme == "dark" ? dark : light)}
                                    width={32}
                                    height={32}
                                    alt={"avatar"}
                                />{session?.user.name}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer !text-red-600" onClick={() => handleLogout()}>
                                <LucideLogOut />
                                Đăng xuất
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
                :
                <>
                    <div></div>
                    <div className="flex items-center gap-3">
                        <Button className="rounded-full border-0" variant="outline" size="icon" onClick={(event => handleTheme(event))}>
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </div>
                </>
            }
        </div>
    )
}