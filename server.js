import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import postgres from "postgres";
dotenv.config();

const app = express();
const sql = postgres(process.env.POSTGRES_URL);

// Use JSON parser for all routes
app.use(bodyParser.json());

app.get("/data", async (req, res) => {
    const authorization = req.headers["authorization"] || req.headers["Authorization"];

    if (!authorization) {
        return res.status(401).json({
            error: {
                status: 401,
                message: "Authorization header must be included"
            }
        });
    }

    const token = authorization.split(" ")[1];

    if (token !== process.env.API_KEY) {
        return res.status(401).json({
            error: {
                status: 401,
                message: "Token invalid"
            }
        });
    }

    try {
        const customers = await sql`SELECT * FROM Customers`;
        return res.status(200).json({
            data: customers
        });
    } catch (error) {
        return res.status(500).json({
            error: {
                status: 500,
                message: "Internal server error"
            }
        });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
