"use client"

import { usePathname, useRouter } from "next/navigation"

import Image from 'next/image'
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { Bell, Globe, HandPlatter, House, LucideLogOut, Moon, PackageSearch, PenSquare, ReceiptText, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { MouseEvent, ReactElement, ReactNode, useEffect } from "react"
import { Button } from "./ui/button"
import light from "@/assets/unknown-light.png"
import dark from "@/assets/unknown-dark.png"
import logo from "@/assets/logo-light.png"
import ThemeButton from "./theme-button"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import autosize from 'autosize'
import { cn } from "@/lib/utils"
import React from "react"

export default function Header() {

    const { theme, setTheme } = useTheme()

    const { data: session } = useSession()

    const path = usePathname()

    const router = useRouter()

    const handleLogout = () => {
        signOut()
    }

    const handleTheme = (event: MouseEvent) => {
        event.preventDefault()
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const LinkButton = ({ href, children }: { href: string, children: ReactNode }) => {
        return <Link
            className="flex items-center h-[50px] md:h-[8vh] hover:bg-amber-900 dark:hover:bg-amber-100 px-3" href={href}>
            {children}
        </Link>
    }
    const ButtonItem = ({ icon, label, link }: { icon: ReactElement, label: string, link: string }) => {
        return (
            <Button className={cn("text-base h-12 justify-start", { "font-semibold": path.includes(link) })} size={"lg"} variant={"ghost"} onClick={() => router.push(link)}>
                <div className="scale-[1.3] mr-1">{path.includes(link) ? React.cloneElement(icon, { strokeWidth: 3 }) : icon}</div>{label}
            </Button>
        )
    }

    useEffect(() => {
        autosize(document.querySelectorAll('textarea'));
    }, [])

    return (
        <>
            <div className="fixed z-[60] h-[50px] w-screen md:h-0 flex items-center justify-between px-6 md:px-20 text-sm">
                {session?.user && path !== "/login" ?
                    <>
                        {/* <ThemeButton /> */}
                        {/* <div className="grow md:flex gap-5 hidden px-10">
                        {(session?.user as any)?.role === 31 &&
                            <>
                                <LinkButton href="/owner/apartments">Danh sách căn hộ</LinkButton>
                                <LinkButton href="/owner/bills">Danh sách hóa đơn</LinkButton>
                                <LinkButton href="/services">Dịch vụ</LinkButton>
                                <LinkButton href="/notifications">Thông báo</LinkButton>
                            </>
                        }
                        {(session?.user as any)?.role === 32 && <LinkButton href="/resident/apartments">Danh sách căn hộ</LinkButton>}
                        {(session?.user as any)?.role === 21 &&
                            <>
                                <LinkButton href="/receptionist/apartments">Danh sách căn hộ</LinkButton>
                                <LinkButton href="/receptionist/residents">Danh sách cư dân</LinkButton>
                                <LinkButton href="/receptionist/notifications">Danh sách thông báo</LinkButton>
                            </>
                        }
                        {(session?.user as any)?.role === 22 && <LinkButton href="/accountant/apartments">Danh sách căn hộ</LinkButton>}
                        {(session?.user as any)?.role === 23 && <LinkButton href="/technician/apartments">Danh sách căn hộ</LinkButton>}
                    </div> */}
                        <div className="grow md:hidden justify-around flex">
                            {(session?.user as any)?.role === 31 &&
                                <>
                                    <LinkButton href="/owner/apartments">
                                        <House />
                                    </LinkButton>
                                    <LinkButton href="/owner/bills">
                                        <ReceiptText />
                                    </LinkButton>
                                    <LinkButton href="/services">
                                        <Globe />
                                    </LinkButton>
                                    <LinkButton href="/notifications">
                                        <Bell />
                                    </LinkButton>
                                </>}
                            {(session?.user as any)?.role === 32 && <LinkButton href="/resident/apartments">Danh sách căn hộ</LinkButton>}
                            {(session?.user as any)?.role === 21 && <LinkButton href="/receptionist/apartments">Danh sách căn hộ</LinkButton>}
                            {(session?.user as any)?.role === 22 && <LinkButton href="/accountant/apartments">Danh sách căn hộ</LinkButton>}
                            {(session?.user as any)?.role === 23 && <LinkButton href="/technician/apartments">Danh sách căn hộ</LinkButton>}
                        </div>
                        {/* <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image
                                className="rounded-full"
                                src={session?.user.image ?? (theme == "dark" ? light : dark)}
                                width={32}
                                height={32}
                                alt={"avatar"}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push("/profile")}>
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
                    </DropdownMenu> */}
                    </>
                    :
                    <>
                        <div className="hidden"></div>
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
            <div className="hidden bg-background fixed md:flex md:flex-col w-[18vw] h-screen border-r border-neutral-300">
                <Image
                    src={logo}
                    alt={"avatar"}
                />
                <div className="grow gap-5 flex flex-col px-2">
                    {(session?.user as any)?.role === 31 &&
                        <>
                            <ButtonItem
                                icon={<House />}
                                label="Căn hộ sở hữu"
                                link={"/owner/apartments"}
                            />
                            <ButtonItem
                                icon={<ReceiptText />}
                                label="Hóa đơn"
                                link={"/owner/bills"}
                            />
                            <ButtonItem
                                icon={<Globe />}
                                label="Dịch vụ"
                                link={"/services"}
                            />
                            <ButtonItem
                                icon={<PenSquare />}
                                label="Đánh giá, góp ý"
                                link={"/evaluate"}
                            />
                            <ButtonItem
                                icon={<PackageSearch />}
                                label="Tìm đồ"
                                link={"/lost"}
                            />
                            <ButtonItem
                                icon={<Bell />}
                                label="Thông báo"
                                link={"/notifications"}
                            />
                        </>
                    }
                    {(session?.user as any)?.role === 32 &&
                        <Button className="text-base h-12 justify-start" size={"lg"} onClick={() => router.push("/resident/apartments")} >
                            <div className="scale-[1.3] mr-1"><House /></div>Danh sách căn hộ
                        </Button>}
                    {(session?.user as any)?.role === 21 &&
                        <>
                            <Button className="text-base h-12 justify-start" size={"lg"} onClick={() => router.push("/receptionist/apartments")} >
                                <div className="scale-[1.3] mr-1"><House /></div>Danh sách căn hộ
                            </Button>
                            <Button className="text-base h-12 justify-start" size={"lg"} onClick={() => router.push("/receptionist/residents")} >
                                <div className="scale-[1.3] mr-1"><House /></div>Danh sách cư dân
                            </Button>
                            <Button className="text-base h-12 justify-start" size={"lg"} onClick={() => router.push("/receptionist/notifications")} >
                                <div className="scale-[1.3] mr-1"><Bell /></div>Danh sách thông báo
                            </Button>
                        </>
                    }
                    {(session?.user as any)?.role === 22 &&
                        <Button className="text-base h-12 justify-start" size={"lg"} onClick={() => router.push("/accountant/apartments")} >
                            <div className="scale-[1.3] mr-1"><House /></div>Danh sách căn hộ
                        </Button>}
                    {(session?.user as any)?.role === 23 &&
                        <Button className="text-base h-12 justify-start" size={"lg"} onClick={() => router.push("/technician/apartments")} >
                            <div className="scale-[1.3] mr-1"><House /></div>Danh sách căn hộ
                        </Button>}
                </div>
            </div>
        </>
    )
}