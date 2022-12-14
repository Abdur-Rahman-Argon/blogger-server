const express = require("express");
const cors = require("cors");
const { product } = require("./Products");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(" Blogging server is Running");
});

app.get("/product", (req, res) => {
  res.send(product);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
