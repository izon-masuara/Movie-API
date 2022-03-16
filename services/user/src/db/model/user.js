import db from '../config/connection'
import { isEmail, statusValidate } from '../../helpers/validation'
import { hasPass } from '../../helpers/bcrypt'

class Users {
    static async findAll() {
        const command = `SELECT * FROM users`
        try {
            const data = await db.query(command)
            return data
        } catch (err) {
            throw err
        }
    }

    static async createUser(payload) {

        const {
            email,
            password,
            status,
            expired,
            role
        } = payload

        try {
            const emailUser = isEmail(email)

            if (!emailUser) {
                throw {
                    err: `Validation error email must be email`
                }
            }

            const secretPass = hasPass(password)
            const userStatus = statusValidate(status)
            const created_at = new Date()

            const command = `
                INSERT INTO users(email,password,status,expired,role,created_at)
                VALUES($1,$2,$3,$4,$5,$6)
                RETURNING *
            `

            const data = await db.query(command,
                [email,secretPass,userStatus,expired,role,created_at]
            )

            return data

        } catch (err) {
            throw err
        }

    }
}

export default Users