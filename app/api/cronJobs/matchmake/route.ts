export const dynamic = 'force-dynamic'; // static by default, unless reading the request

// import mongodb
import { MongoClient } from 'mongodb'

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

    const users = db.collection('users');

    // Go to the 'test' database and fetch the 'opportunities' collection
    const allOpportunities = await opportunities.find({}).toArray();

    const allUsers = await users.find({}).toArray();


    for (const opportunity of allOpportunities) {
        console.log(opportunity.description);

        // use openapi text-embedding-3-small on the description of the opportunity

        const embeddingData = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
            },
            body: JSON.stringify({
                'model': 'text-embedding-3-small',
                'input': opportunity.description
            })
        })

        const json = await embeddingData.json();

        const embedding = json.data[0].embedding;

        opportunity.embedding = embedding;

    }

    for (const user of allUsers) {
        console.log(user.description);

        if (!user.userInfo) {
            continue;
        }
        // use openapi text-embedding-3-small on the description of the opportunity

        const embeddingData = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
            },
            body: JSON.stringify({
                'model': 'text-embedding-3-small',
                'input': user.userInfo
            })
        })

        const json = await embeddingData.json();

        const embedding = json.data[0].embedding;

        user.embedding = embedding;

    }

    // find cosine similarity between all opportunities and all users
    for (const opportunity of allOpportunities) {
        for (const user of allUsers) {
            if (!opportunity.embedding || !user.embedding) {
                continue;
            }
            const dotProduct = opportunity.embedding.reduce((acc: number, cur: number, i: number) => acc + cur * user.embedding[i], 0);
            const magnitudeOpportunity = Math.sqrt(opportunity.embedding.reduce((acc: number, cur: number) => acc + cur * cur, 0));
            const magnitudeUser = Math.sqrt(user.embedding.reduce((acc: number, cur: number) => acc + cur * cur, 0));
            const cosineSimilarity = dotProduct / (magnitudeOpportunity * magnitudeUser);
            console.log(cosineSimilarity, opportunity.opportunity_name, user.name);
        }
    }


    // Close the connection
    await client.close();

    return new Response(JSON.stringify(allOpportunities));

}