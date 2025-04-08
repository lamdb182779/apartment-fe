import { auth as middleware } from "@/auth"

export default middleware((req) => {
    const session = req.auth
    if (!session && (req.nextUrl.pathname !== "/login" && !req.nextUrl.pathname.startsWith("/guest") && req.nextUrl.pathname !== "/")) {
        const newUrl = new URL("/login", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
    if (session && req.nextUrl.pathname === "/login") {
        const newUrl = new URL("/profile", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
    if ((session?.user as any)?.role !== 31 && req.nextUrl.pathname.startsWith("/owner")) {
        if ((session?.user as any).role !== 31 && req.nextUrl.pathname === "/owner/bills") {
            const newUrl = new URL("/resident/bills", req.nextUrl.origin);
            return Response.redirect(newUrl);
        }
        const newUrl = new URL("/profile", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
    if ((session?.user as any)?.role !== 32 && req.nextUrl.pathname.startsWith("/resident")) {
        const newUrl = new URL("/profile", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
    if ((session?.user as any)?.role !== 21 && req.nextUrl.pathname.startsWith("/receptionist")) {
        const newUrl = new URL("/profile", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
    if ((session?.user as any)?.role !== 22 && req.nextUrl.pathname.startsWith("/accountant")) {
        const newUrl = new URL("/profile", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
    if ((session?.user as any)?.role !== 23 && req.nextUrl.pathname.startsWith("/technician")) {
        const newUrl = new URL("/profile", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
})
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}