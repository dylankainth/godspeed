import NextAuth from 'next-auth';
import Google from "next-auth/providers/google"


export const { handlers, auth, signIn, signOut } = NextAuth(() => {

    return {

        pages: {
            signIn: '/signin',
        },
        callbacks: {

            session: async ({ session, token }) => {


                const result = await fetch(`${process.env.AUTH_URL}/api/newUser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: session.user.email,
                        name: session.user.name,
                        image: session.user.image,
                        token: token.accessToken,
                    }),
                })

                return session;
            },




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
                            return Response.redirect(new URL('/dashboard', nextUrl.origin));
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