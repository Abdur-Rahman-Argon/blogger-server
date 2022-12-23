const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MongoDB_User}:${process.env.MongoDB_PASS}@cluster0.ugwei28.mongodb.net/?retryWrites=true&w=majority
`;

/* const uri = `mongodb+srv://my-blogging-database:206YxbGwGa5dtwdV@cluster0.ugwei28.mongodb.net/?retryWrites=true&w=majority`;
 */
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

    app.get("/all-blogs", async (req, res) => {
      const query = {};
      const cursor = await blogsCollections.find(query);
      const blogs = await cursor.toArray();
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
