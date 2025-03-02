export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { MongoClient } from 'mongodb';

export async function POST(req: NextRequest) {

    const session = await auth()

    if (!session?.user) return null

    const data = await req.json();

    const userCumData = data.message;

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
                    'role': 'system',
                    'content': 'You are a volunteer recruiter, asking questions to the user'
                },
                {
                    'role': 'system',
                    'content': 'Take in and write a description about the user; just clean it up, do not add any new information or remove existing information.'
                },
                {
                    'role': 'user',
                    'content': userCumData
                }
            ],
            'temperature': 0.7
        })
    });

    const json = await response.json();

    const message = json.choices[0].message.content;

    // run the embedding on the user's response
    const embeddingData = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
        },
        body: JSON.stringify({
            'model': 'text-embedding-3-small',
            'input': message
        })
    })

    const jsonEmbedding = await embeddingData.json();

    const embedding = jsonEmbedding.data[0].embedding;

    const url = process.env.MONGODB_URI;

    if (!url) {
        return new Response('MONGODB_URI is not set', { status: 500 });
    }

    const client = new MongoClient(url);
    await client.connect();

    const db = client.db('test');
    const collection = db.collection('users');

    // add the user's response to the database on the record with the user's email
    await collection
        .updateOne({ email: session?.user.email }, { $set: { userInfo: message, embedding: embedding } });




    return new Response(JSON.stringify({ "message": "complete" }), { status: 200, headers: { 'Content-Type': 'application/json' } });

}