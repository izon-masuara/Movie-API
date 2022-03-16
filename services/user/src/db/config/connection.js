import pkg from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const { Client } = pkg

const config = {
    user: process.env.USER_DB,
    host: process.env.HOT_DB,
    database: process.env.DATABASE_DB,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
}

const client = new Client(config)

client.connect()

export default client