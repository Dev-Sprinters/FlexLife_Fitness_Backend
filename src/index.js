import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { configDotenv } from "dotenv";

configDotenv();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT;

app.listen(()=>{
    console.log(`Backend is Running on Port : ${port}`);
});