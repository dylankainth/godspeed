export const dynamic = 'force-dynamic'; // static by default, unless reading the request

// import mongodb
import { MongoClient } from 'mongodb';

export async function GET() {

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

    // Find all opportunities
    const allOpportunities = await opportunities.find({}).toArray();

    // Close the connection
    await client.close();

    return new Response(JSON.stringify(allOpportunities));

}