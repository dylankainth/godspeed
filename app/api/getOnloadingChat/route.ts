export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET() {


    return new Response(JSON.stringify({ message: 'GET /api/getOnloadingChat' }));

}