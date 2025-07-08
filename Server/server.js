import express from 'express'
import dotenv from "dotenv"
import cors from "cors";


dotenv.config();
import conntectDB from './config/db.js';

import cookieParser from 'cookie-parser';








const app = express()

app.use(cookieParser()); 
app.use(express.json());


conntectDB()






app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));


// import route
import testRoute from './routes/testRoute.js'
import userRoute from './routes/userRoute.js'


// route
app.use(testRoute)

app.use(userRoute)






app.get("/", (req,res)=>{

    return res.status(200).send("welcome to new Server ....")

})



const PORT = process.env.PORT || 6000

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})



