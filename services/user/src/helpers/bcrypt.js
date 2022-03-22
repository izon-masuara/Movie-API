import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const salt = process.env.SALT

const hasPass = (pass) => {
    return bcrypt.hashSync(pass,Number(salt))
}

const comparePass = (pass, has) => {
    return bcrypt.compareSync(pass,has)
}

export {
    hasPass,
    comparePass
}