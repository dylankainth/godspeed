import { NextRequest } from "next/server";

// import mongodb
import { MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function POST(req: NextRequest) {

    const data = await req.json();

    const url = process.env.MONGODB_URI;

    if (!url) {
        return new Response('MONGODB_URI is not set', { status: 500 });
    }

    const client = new MongoClient(url);
    await client.connect();

    const db = client.db('test');
    const collection = db.collection('users');

    // only insert if the user does not exist
    const user
        = await collection.findOne({ email: data.email });

    if (user) {
        client.close();
        return new Response('User already exists', { status: 400 });
    }

    await collection.insertOne(data);

    client.close();

    return new Response('User created', { status: 201 });

}