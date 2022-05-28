import express from 'express'
import router from './routers'
import bodyParse from 'body-parser'
import cors from "cors"
export const app = express()
app.use(cors())
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))
app.use(router)