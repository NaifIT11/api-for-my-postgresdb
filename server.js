import dotenv from "dotenv";
import express from "express"
import bodyParser from "body-parser";
import postgres from "postgres";
dotenv.config()

const app = express();

const sql = postgres(process.env.POSTGRES_URL)

//use json parser for all routes
app.use(bodyParser.json());

