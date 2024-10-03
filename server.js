import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import postgres from "postgres";
dotenv.config();

const app = express();


// Use JSON parser for all routes
app.use(bodyParser.json());





app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
