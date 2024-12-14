import { auth as middleware } from "@/auth"

export default middleware((req) => {
    if (!req.auth && req.nextUrl.pathname !== "/login") {
        const newUrl = new URL("/login", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
    if (req.auth && req.nextUrl.pathname === "/login") {
        const newUrl = new URL("/profile", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
})
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}