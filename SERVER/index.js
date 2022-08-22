import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import formRoute from "./routes/form.js"
import schedule from 'node-schedule';
import userRoute from "./routes/user.js"



const app = express();

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

//running scedule
// schedule.scheduleJob("*/2 * * * * *", ()=> {
//   allForm()
// })


//middleware
app.use(cors({
  origin: "*", 
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));
app.use(express.json());


app.use("/api/form", formRoute);
app.use("/api/users", userRoute);

app.listen(4000, () => {
    connect();
    console.log("Welcome, You are connected with server!!");
  });
