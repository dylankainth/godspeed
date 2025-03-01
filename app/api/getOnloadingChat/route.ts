export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const data = await req.json();


    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
        },
        body: JSON.stringify({
            'model': 'gpt-4o-mini',
            'messages': [
                {
                    'role': 'user',
                    'content': data.message
                }
            ],
            'temperature': 0.7
        })
    });

    const json = await response.json();

    const message = json.choices[0].message.content;

    // const response = await fetch('https://openai.services.dylankainth.com/api/generate', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',

    //     },
    //     body: JSON.stringify({ "model": "llama3.1:8b", "prompt": data.message, "stream": false }),
    // });
    // const json = await response.json();
    // const message = json.response;



    return new Response(JSON.stringify({ "message": message }), { status: 200, headers: { 'Content-Type': 'application/json' } });

}