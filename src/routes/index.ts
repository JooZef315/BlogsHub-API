import express from "express";
import { userRouter } from "./usersRoute";

export const rootRouter = express.Router()

rootRouter.get('/', (req, res) => {
    console.log(req.originalUrl)
    res.send('ok!!')
})

rootRouter.route('/users').get(userRouter)