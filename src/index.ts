import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { rootRouter } from './routes';

const PORT = process.env.PORT || 3001

dotenv.config();
const app = express()

app.use(cors({
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use('/api/v1', rootRouter)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})