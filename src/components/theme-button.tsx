"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { MouseEvent, useEffect, useState } from 'react'

export default function ThemeButton({ border = true }: { border?: boolean }) {
    const { setTheme, theme } = useTheme()
    const [sun, setSun] = useState("")
    const [moon, setMoon] = useState("")

    useEffect(() => {
        if (theme === "dark") {
            setSun("translate-x-9 translate-y-5")
            setTimeout(() => setSun("-translate-x-9 translate-y-5 transition-none"), 350)
            setMoon("translate-x-0 translate-y-0")
        } else {
            setMoon("translate-x-9 translate-y-5")
            setTimeout(() => setMoon("-translate-x-9 translate-y-5 transition-none"), 350)
            setSun("translate-x-0 translate-y-0")
        }
    }, [theme])

    const handleTheme = (event: MouseEvent) => {
        event.preventDefault()
        setTimeout(() => setTheme(theme === 'light' ? 'dark' : 'light'), 250)
    }
    return (
        <div className={`w-[2.375rem] h-[2.375rem] cursor-pointer ${border && "border"} rounded-full relative overflow-hidden`} onClick={(event) => handleTheme(event)}>
            <div className={`transform absolute h-9 w-9 flex justify-center items-center transition-all duration-1000 ${sun}`}>
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </div>
            <div className={`transform absolute h-9 w-9 flex justify-center items-center transition-all duration-1000 ${moon}`}>
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            </div>
        </div>
    )
}