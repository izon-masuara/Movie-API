import express from 'express';
import {router} from './routes'
import dotenv from 'dotenv'
dotenv.config()
export const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)