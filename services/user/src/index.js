import express from 'express';
import {router} from './routes'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
export const app = express();

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)