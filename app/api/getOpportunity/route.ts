export const dynamic = 'force-dynamic'; // static by default, unless reading the request

// import mongodb
import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

    // get query params id
    const idParam = req.nextUrl.searchParams.get("id");
    if (!idParam) {
        return new Response('Missing id query param', { status: 400 });
    }

    const id = new ObjectId(idParam);

    // Connection URI
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
    }

    const client = new MongoClient(uri);

    // Connect to the MongoDB cluster
    await client.connect();

    // Go to the 'test' database and fetch the 'opportunities' collection
    const db = client.db('test');

    const opportunities = db.collection('opportunities');

    // Go to the 'test' database and fetch the 'opportunities' collection
    const allOpportunities = await opportunities.findOne({ _id: id });

    // Close the connection
    await client.close();

    return new Response(JSON.stringify(allOpportunities));

}