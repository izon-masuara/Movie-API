import express from 'express'
import router from './routers'
import bodyParse from 'body-parser'
export const app = express()

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))
app.use(router)