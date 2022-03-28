import { app } from "..";
import dotenv from 'dotenv'
import connect from '../db/config/config'
dotenv.config()
const port = process.env.PORT = 3000

connect()
    .then(res => {
        console.log('success')
        app.listen(port, _ => {
            console.log(`http://localhost${port}`)
        })
    })
    .catch(e => {
        console.log(e)
    })