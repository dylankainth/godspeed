export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
    runtime: 'nodejs'
};

export { auth as middleware } from "@/auth";
