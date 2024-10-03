import dotenv from "dotenv";
import express from "express"
import bodyParser from "body-parser";
import postgres from "postgres";
dotenv.config()

const app = express();

const sql = postgres(process.env.POSTGRES_URL)



app.get("/data" , async(req , res) => {
    const authorization  = req.headers["authorization"] || req.headers["Authorization"];

    if(!authorization){
        res.status(401).json({
            error:{
                status: 401,
                msessage: "Authorization header must be included"
            }
        })
    }

    const token = authorization.split(" ")[1];

    if(token !== process.env.API_KEY){
        res.status(401).json({
            error: {
                status: 401,
                message: "Token invalid"
            }
        })
    }


    const customers = await sql`SELECT * FROM Customers`;

    res.status(200).json({
        data: customers
    })

})


//use json parser for all routes
app.use(bodyParser.json());




app.listen(5000 , () => {
    console.log("Server is running on port 5000")
})