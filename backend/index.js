const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const authRouter = require ("./Router/AuthRouter.js")
const ProductRouter = require ("./Router/ProductRouter.js")

const app = express();
require("dotenv").config();
require("./Models/db.js");

const PORT = process.env.PORT || 8080;

// get api for server

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(bodyParser.json());
app.use(cors());

app.use("/auth" , authRouter)
app.use("/api" , ProductRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port again pls ${PORT}`);
});

// end