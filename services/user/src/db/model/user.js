import db from '../config/connection'
import { isEmail, statusValidate, validationUser } from '../model/validation/validation'
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

    static async findByID(id){
        const command = `SELECT * FROM users WHERE user_id = ${id}`
        try {
            const data = await db.query(command)
            if(data.rowCount === 0){
                return false
            }else{
                return data
            }
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
            const secretPass = hasPass(password)
            const userStatus = statusValidate(status)
            const created_at = new Date()

            const command = `
                INSERT INTO users(email,password,status,expired,role,created_at)
                VALUES($1,$2,$3,$4,$5,$6)
                RETURNING *
            `

            const data = await db.query(command,
                [emailUser,secretPass,userStatus,expired,role,created_at]
            )

            return data.rows[0]

        } catch (err) {
            const error = validationUser(err)
            throw error
        }

    }

    static async updateStatus(payload,id) {
        const userStatus = statusValidate(payload)
        const command = `
            UPDATE users
            SET status = '${userStatus}'
            WHERE user_id = ${id}
            RETURNING * ;
        `
        try {
            const successUpdated = await db.query(command)
            return successUpdated.rows[0]
        } catch (err) {
            throw err
        }
    }

    static async destroy(id) {
        const command = `
            DELETE FROM users
            WHERE user_id = ${id}
        `
        try {
            const successDelete = await db.query(command)
            console.log(successDelete)
        } catch (err) {
            console.log(err)
        }
    }
}

export default Users