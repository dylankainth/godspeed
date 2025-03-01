import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/signin',
    },
    callbacks: {

        async session({ session, token }) {
            if (session?.user) {
                try {
                    await fetch("/api/auth/newUser", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: session.user.email, name: session.user.name, token: token }),
                    });
                } catch (error) {
                    console.error("Error sending session update:", error);
                }
            }
            return session;
        },

        authorized({ auth, request: { nextUrl } }) {

            const publicPaths = ['/signin'];

            const isLoggedIn = !!auth?.user;

            if (isLoggedIn) {
                if (nextUrl.pathname === "/signin") {
                    // get the callbackurl from the query string
                    const callbackUrl = nextUrl.searchParams.get('callbackUrl');
                    if (callbackUrl) {
                        return Response.redirect(callbackUrl);
                    } else {
                        return Response.redirect(new URL('/', nextUrl.origin));
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
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

