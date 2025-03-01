export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const data = await req.json();


    const response = await fetch('https://openai.services.dylankainth.com/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ "model": "llama3.1:8b", "prompt": data.message, "stream": false }),
    });

    const json = await response.json();

    return new Response(JSON.stringify({ "message": json.response }), { status: 200, headers: { 'Content-Type': 'application/json' } });

}