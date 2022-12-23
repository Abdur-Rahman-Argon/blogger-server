const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
