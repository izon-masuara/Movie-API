import express from 'express'
import router from './routers'
export const app = express()

app.use(router)