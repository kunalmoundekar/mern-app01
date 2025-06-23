import jwt from 'jsonwebtoken';

import userModel from '../models/userModel.js'
export const isAuth = async (req, res, next) => {

     const token = req.cookies?.token; // const  {token}  = req.cookies?.token 

    // validation
    if (!token) {
        return res.status(402).send({
                success: false,
                message: "unAuthraised User"
            })
    }   


    const decoded   = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await  userModel.findById(decoded._id)


    next()



}