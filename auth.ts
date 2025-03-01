import NextAuth from 'next-auth';
import Google from "next-auth/providers/google"


export const { handlers, auth, signIn, signOut } = NextAuth(() => {

    return {

        pages: {
            signIn: '/signin',
        },
        callbacks: {

            authorized({ auth, request: { nextUrl } }) {

                const publicPaths = ['/', '/signin'];

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

        providers: [
            Google({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
        ],
    }
});