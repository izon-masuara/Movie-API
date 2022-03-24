import db from '../config/connection.js'

const migrate = () => {
    const migration1 = `
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            expired DATE NOT NULL,
            role VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL
        );
    `

    const migration2 = `
        CREATE TABLE IF NOT EXISTS login_users (
            login_id SERIAL PRIMARY KEY,
            user_id INT UNIQUE NOT NULL,
            code_device VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            FOREIGN KEY(user_id)
                REFERENCES users (user_id)
        );
    `
    try {
        db.query(migration1)
        db.query(migration2)
        console.log('success')
    } catch (err) {
        console.log(err)
    }
}

export default migrate