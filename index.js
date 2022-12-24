const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MongoDB_User}:${process.env.MongoDB_PASS}@cluster0.ugwei28.mongodb.net/?retryWrites=true&w=majority
`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    client.connect();

    const blogsCollections = client.db("blogs").collection("blogs-collection");
    console.log("connect");

    // get all blogs
    app.get("/all-blogs", async (req, res) => {
      const query = {};
      const cursor = await blogsCollections.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //  create new blogs
    app.get("/create-blogs", async (req, res) => {
      const blog = req.body;
      const doc = { $set: {} };
      const result = await blogsCollections.insertOne(doc)();
      res.send(blogs);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" Blogging server is Running");
});

app.get("/all-blogs", (req, res) => {
  res.send("product");
});
// app.get("/my-blogs", (req, res) => {
//   res.send("product");
// });
// app.get("/create-new-blogs", (req, res) => {
//   res.send({ status: 200, success: true, insertedId: "id" });
// });
// app.get("/update-blogs", (req, res) => {
//   res.send({ status: 200, success: true, upsert: "", insertedId: "id" });
// });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
