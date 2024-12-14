"use server"

import { signIn } from "@/auth"

export async function authenticate(username?: string, password?: string, role?: string) {
    try {
        const r = await signIn("credentials", {
            username,
            password,
            role,
            redirect: false
        })
        return r
    } catch (e: any) {
        return { error: e.type }
    }
}