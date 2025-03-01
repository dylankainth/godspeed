export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.jpeg|.*\\.jpg).*)"]
    //matcher: ["/dashboard(.*)"]
};

export { auth as middleware } from "@/auth";
