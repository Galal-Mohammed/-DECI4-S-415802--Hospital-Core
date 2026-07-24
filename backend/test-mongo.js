const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://galalmohammed771177_db_user:JLNi5z1hR3Z3uUDI@healthcare-cluster.fr4flx2.mongodb.net/healthcare?retryWrites=true&w=majority";

async function test() {
  try {
    const client = new MongoClient(uri);

    await client.connect();

    console.log("✅ Connected!");

    await client.close();
  } catch (err) {
    console.error(err);
  }
}

test();