import db from '../config/connection'

class Login {
    static async login(id, code) {
        const created_at = new Date()
        const command = `
            INSERT INTO login_users(user_id,code_device,created_at)
            VALUES($1,$2,$3)
            RETURNING *
        `
        try {
            const data = await db.query(command, [id, code, created_at])
            return data.rows[0]
        } catch (err) {
            throw err
        }
    }
}

export default Login