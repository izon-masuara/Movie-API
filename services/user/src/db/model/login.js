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
            console.log(err)
            throw err
        }
    }

    static async getAll() {
        const command = `
            SELECT * 
            FROM login_users as a
            FULL JOIN users as b 
            ON a.user_id = b.user_id
        `
        try {
            const data = await db.query(command)
            return data.rows
        } catch (err) {
            throw {
                code : `996`,
                message : `Error get login_users`
            }
        }
    }

    static async findById(id){
        const command = `
            SELECT *
            FROM login_users
            WHERE user_id = ${id}
        `
        try {
            const data = await db.query(command)
            if(data.rows.length === 0){
                throw {
                    code : '404',
                    message : 'Data not Found'
                }
            }
            return data.rows[0]
        } catch (err) {
            throw {
                code : '500',
                message : "Internal server error"
            }
        }
    }

    static async logOut(user_id) {
        const command = `
            DELETE FROM login_users
            WHERE user_id = ${user_id} 
        `
        try {
            await db.query(command)
        } catch (err) {
            throw {
                code : '500',
                message : 'Internal server error'
            }          
        }
    }
}

export default Login