import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { CustomAuthError } from "./service/auth-error";
import { axiosInstance } from "./service/fetch";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: {},
                password: {},
                role: {}
            },
            authorize: async (credentials) => {
                const user = await axiosInstance.post("/auth/login", credentials, {
                    withCredentials: true
                })
                    .then(res => res?.data)
                    .catch(error => {
                        throw new CustomAuthError(error?.response?.data?.message)
                    }
                    )
                return user
            },
        }),
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.user = user
            }
            return token
        },
        session({ session, token }: { session: any, token: any }) {
            session.user = token.user
            return session
        },
        authorized: async ({ auth }) => {
            return !!auth
        }
    },
})