import dotenv from "dotenv";
import postgres from "postgres";
import express from "express"

const customersRouter = express.Router();
const sql = postgres(process.env.POSTGRES_URL);

