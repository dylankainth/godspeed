export const dynamic = 'force-dynamic'; // static by default, unless reading the request

// import mongodb
import { MongoClient } from 'mongodb';
import { auth } from "@/auth";

export async function GET() {

    const session = await auth();

    // Connection URI
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
    }

    const client = new MongoClient(uri);

    // Connect to the MongoDB cluster
    await client.connect();

    // Go to the 'test' database
    const db = client.db('test');

    // get the user's description embedding
    const users = db.collection('users');

    if (!session?.user) return null;


    // fetch the user's data
    const user = await users.findOne({ email: session.user.email });

    // if the user doesn't exist, return an error
    if (!user) {

        return new Response('User not found', { status: 404 });

    }


    // fetch the 'opportunities' collection
    const opportunities = db.collection('opportunities');

    // Find all opportunities
    const allOpportunities = await opportunities.find({}).toArray();

    // if the user doesn't have a description, return an error  
    if (!user.userInfo) {

        return new Response(JSON.stringify(allOpportunities));

    }

    // get the embedding
    const userEmbedding = user.embedding;


    for (const opportunity of allOpportunities) {
        // do vector search between userEmbedding and opportunity.embedding
        // add the result to opportunity.score

        // do cosine similarity
        const dotProduct = userEmbedding.reduce((acc: number, cur: number, i: number) => acc + cur * opportunity.embedding[i], 0);

        const userMagnitude = Math.sqrt(userEmbedding.reduce((acc: number, cur: number) => acc + cur * cur, 0));

        const opportunityMagnitude = Math.sqrt(opportunity.embedding.reduce((acc: number, cur: number) => acc + cur * cur, 0));

        const cosineSimilarity = dotProduct / (userMagnitude * opportunityMagnitude);


        opportunity.score = cosineSimilarity;

    }

    // sort the opportunities by score
    allOpportunities.sort((a, b) => b.score - a.score);


    // Close the connection
    await client.close();

    return new Response(JSON.stringify(allOpportunities));

}