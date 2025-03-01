import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async session({ session, token }) {
            // @ts-expect-error ignore that
            session.accessToken = token.accessToken; // Pass token to client
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

