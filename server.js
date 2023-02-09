const server = require("express");
const app = server();
const dataBase = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const router = require("./router/router");
const { PORT, DB } = process.env;

dataBase
  .connect(DB)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch(() => {
    console.log("DB not connected");
  });
  app.use(server.json());
app.use(cors());
app.use('/api',router)
app.listen(PORT, () => {
  console.log("server running port at:", PORT);
});
