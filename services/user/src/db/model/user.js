import db from '../config/connection'
import { isEmail, statusValidate, validationUser } from '../model/validation/validation'
import { hasPass } from '../../helpers/bcrypt'

class Users {
    static async findAll() {
        const command = `
        SELECT *
        FROM users
        `
        try {
            const data = await db.query(command)
            return data
        } catch (err) {
            throw err
        }
    }

    static async findByID(id) {
        const command = `
        SELECT *
        FROM users 
        WHERE user_id = ${id}`
        try {
            const data = await db.query(command)
            if (data.rowCount === 0) {
                return false
            } else {
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
                [emailUser, secretPass, userStatus, expired, role, created_at]
            )

            return data.rows[0]

        } catch (err) {
            const error = validationUser(err)
            throw error
        }

    }

    static async updateStatus(payload, id) {
        if (payload === 'active') {
            const command = `
            UPDATE users
            SET status = '${payload}'
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
    }

    static async destroy(id) {
        const command = `
            DELETE FROM users
            WHERE user_id = ${id}
        `
        try {
            await db.query(command)
        } catch (err) {
            throw err
        }
    }

    static async findOne(coulmn,search){
        const command = `
            SELECT user_id, email, status, password, role
            FROM users
            WHERE ${coulmn} = '${search}'
        `
        try {
            const found = await db.query(command)
            return found.rows.length === 0 ? false : found.rows
        } catch (err) {
            throw err
        }
    }
}

export default Users