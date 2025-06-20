import express from 'express'
import dotenv from "dotenv"


import conntectDB from './config/db.js';



dotenv.config();



const app = express()

app.use(express.json());

conntectDB()


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



