import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import formRoute from "./routes/form.js";
import schedule from "node-schedule";
import userRoute from "./routes/user.js";
import https from "https";
import fs from "fs";


const app = express();

const sslServer = https.createServer(
  {
    key: fs.readFileSync("./cert/key.pem"),
    cert: fs.readFileSync("./cert/cert.pem"),
  },
  app
);

dotenv.config();

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB);
    console.log("connected MONGO DB");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!!");
});

//middleware
app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());
app.use("/api/form", formRoute);
app.use("/api/users", userRoute);

// sslServer.listen(4000, () => {
//   connect();
//   console.log("Welcome, You are connected with server!!");
// });

app.listen(4000, () => {
    connect();
    console.log("Welcome, You are connected with server!!");
});
