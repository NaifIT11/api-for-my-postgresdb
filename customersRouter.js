import dotenv from "dotenv";
import postgres from "postgres";
import express from "express"

const customersRouter = express.Router();
const sql = postgres(process.env.POSTGRES_URL);


//middleware for all route
app.use((req , res , next) => {
    const authorization = req.headers["authorization"] || req.headers["Authorization"];

    if(!authorization){
        res.status(401).json({
            error:{
                status: 401,
                message: "Authorization header must be defined"
            }
        });
    if (!authorization) {
        return res.status(401).json({
            error: {
                status: 401,
                msessage: "Authorization header must be included"
            }
        })
        };
    }

    const token = authorization.split(" ")[1];

    if(token !== process.env.API_KEY){
        res.status(401).json({
            error: {
                status: 401,
                message: "Token is invalid"
            }
        })
    }
    if (token !== process.env.API_KEY) {
        return res.status(401).json({
            error: {
                status: 401,
                message: "Token invalid"
            }
        })
    }

    next();
})

app.get("/", async (req, res) => {
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


app.post("/customers" , (req  ,res) => {

})



export default customersRouter;

