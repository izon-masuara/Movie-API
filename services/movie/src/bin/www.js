import { app } from "..";
import {connect} from "../db/config";
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT = 3000

connect()
app.listen(port, _ => {
    console.log(`http://localhost${port}`)
})