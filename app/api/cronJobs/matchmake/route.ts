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

        // keep going if the opportunity already has an embedding
        if (opportunity.embedding) {
            continue;
        }

        // if there's no embedding, then generate one and stick it on db

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

        // add the embedding to the database
        await opportunities.updateOne({ _id: opportunity._id }, { $set: { embedding: embedding } });

    }

    for (const user of allUsers) {

        if (!user.userInfo) {
            continue;
        }

        if (user.embedding) {
            continue;
        } else {
            // if there's no embedding, then generate one and stick it on db

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

            // add the embedding to the database
            await users.updateOne({ _id: user._id }, {
                $set: {
                    embedding: embedding
                }
            });
        }
    }


    // Close the connection
    await client.close();

    return new Response(JSON.stringify({ "message": "Embeddings added" }), { status: 200, headers: { 'Content-Type': 'application/json' } });

}