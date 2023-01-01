import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
import { transfer } from "./transfer.js";
import { setupCollectionAndDocs } from "./setup.js";

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }

  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    await setupCollectionAndDocs(client);

    await transfer(client, 101, 102, 1000, "Transaction from 101 to 102");
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
