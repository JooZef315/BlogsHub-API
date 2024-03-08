import express from "express";

export const userRouter = express.Router()

userRouter.get('/users', (req, res) => {
    console.log(req.originalUrl)    
    res.send('users route')
})