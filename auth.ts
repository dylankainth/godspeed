import NextAuth from 'next-auth';
import Google from "next-auth/providers/google"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth(() => {

    return {
        adapter: MongoDBAdapter(client),
        pages: {
            signIn: '/signin',
        },
        callbacks: {

            authorized({ auth, request: { nextUrl } }) {

                const publicPaths = ['/', '/signin', '/about'];

                const isLoggedIn = !!auth?.user;

                if (isLoggedIn) {
                    if (nextUrl.pathname === "/signin") {
                        // get the callbackurl from the query string
                        const callbackUrl = nextUrl.searchParams.get('callbackUrl');
                        if (callbackUrl) {
                            return Response.redirect(callbackUrl);
                        } else {
                            return Response.redirect(new URL('/board', nextUrl.origin));
                        }
                    }
                    return true;
                }

                if (publicPaths.includes(nextUrl.pathname)) {
                    return true;
                }

                return false;
            },
        },

        providers: [
            Google({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
        ],
    }
});

export const config = {
    runtime: 'nodejs'
};