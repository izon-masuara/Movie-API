import db from '../config/connection'

class Users {
    static async findAll(){
        const command = `SELECT * FROM users`
        try {
            const data = await db.query(command)
            return data
        } catch (err) {
            throw err
        }
    }
}

export default Users