"use client"

import { usePathname, useRouter } from "next/navigation"

import Image from 'next/image'

import useSWR from "swr"

import { axiosInstance, fetcher } from "@/service/fetch"
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu"
import { LucideLogOut, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { MouseEvent, useEffect } from "react"
import { Button } from "./ui/button"
import light from "@/assets/unknown-light.png"
import dark from "@/assets/unknown-dark.png"

export default function Header() {
    const globals = ["/login"]

    const { theme, setTheme } = useTheme()

    const { data, mutate, isLoading } = useSWR(
        "/profile",
        fetcher
    )


    const router = useRouter()
    const path = usePathname()

    useEffect(() => {
        if (isLoading === false) {
            if (!data) {
                if (!globals.includes(path)) {
                    handleLogin()
                }
            }
        }
    }, [isLoading])

    const handleLogin = () => {
        router.push("/login")
    }
    const handleLogout = () => {
        localStorage.removeItem("access_token")
        handleLogin()
    }

    const handleTheme = (event: MouseEvent) => {
        event.preventDefault()
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="fixed z-[60] w-screen h-[8vh] flex items-center justify-between px-20 text-sm">
            {data && path !== "/login" ?
                <>
                    <div></div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image
                                className="rounded-full"
                                src={data.image ?? (theme == "dark" ? dark : light)}
                                width={32}
                                height={32}
                                alt={"avatar"}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer gap-7" onClick={(event: any) => handleTheme(event)}>
                                Chế độ
                                <div className="h-[1.2rem] w-[1.2rem] overflow-hidden">
                                    <Sun className="h-[1.2rem] w-[1.2rem] dark:-mt-[1.2rem]" />
                                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                                </div>
                            </DropdownMenuItem>
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