// server/mongodb.ts
import { MongoClient } from 'mongodb';
import "dotenv/config"
const uri = process.env.PROD_MONGODB_URI!;
// console.log(uri)
let client: MongoClient | null = null;

async function getClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
  }
  return client;
}

export async function saveApplication(formData: any) {
  try {
    const client = await getClient();
    const db = client.db('dcab');
    const collection = db.collection('applications');

    const application = {
      ...formData,
      status: 'pending',
      createdAt: new Date(),
    };

    const result = await collection.insertOne(application);
    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('MongoDB error:', error);
    return { success: false, error };
  }
}

export async function getApplication(email: string) {
  try {
    const client = await getClient();
    const db = client.db('dcab');
    const collection = db.collection('applications');

    const application = await collection.findOne({ email });
    return application;
  } catch (error) {
    console.error('MongoDB error:', error);
    return null;
  }
}