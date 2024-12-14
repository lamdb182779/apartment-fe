"use client"

import { usePathname } from "next/navigation"

import Image from 'next/image'
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { LucideLogOut, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { MouseEvent } from "react"
import { Button } from "./ui/button"
import light from "@/assets/unknown-light.png"
import dark from "@/assets/unknown-dark.png"
import ThemeButton from "./theme-button"
import { signOut, useSession } from "next-auth/react"

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

    return (
        <div className="fixed z-[60] w-screen md:py-0 py-3 md:h-[8vh] flex items-center justify-between px-6 md:px-20 text-sm">
            {session?.user && path !== "/login" ?
                <>
                    <div>
                        <ThemeButton /></div>
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