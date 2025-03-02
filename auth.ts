import NextAuth from 'next-auth';
import Google from "next-auth/providers/google"


export const { handlers, auth, signIn, signOut } = NextAuth(() => {

    return {
        pages: {
            signIn: '/signin',
        },
        callbacks: {
            signIn: async ({ user, account, profile }) => {
                const result = await fetch(`${process.env.AUTH_URL}/api/newUser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: user.email,
                        name: user.name,
                        image: user.image
                    }),
                });

                const data = await result.json();

                if (data.status === 1) {
                    // a new user has been created
                    // redirect to /onloading
                    return '/onloading';
                }




                return true;
            },
            session: async ({ session, token }) => {
                // You can add additional session logic here if needed
                return session;
            },
            authorized({ auth, request: { nextUrl } }) {
                const publicPaths = ['/', '/signin'];
                const isLoggedIn = !!auth?.user;

                if (isLoggedIn) {
                    if (nextUrl.pathname === "/signin") {
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