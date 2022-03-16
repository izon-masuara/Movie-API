import express from 'express';
import {router} from './routes'
import dotenv from 'dotenv'
dotenv.config()

export const app = express();

app.use(router)

app.get('/', (req,res) => {
    console.log('masuk')
})